import {
  Approval as ApprovalEvent,
  Deposit as DepositEvent,
  ManagerFeeMinted as ManagerFeeMintedEvent,
  PoolManagerLogicSet as PoolManagerLogicSetEvent,
  PoolPrivacyUpdated as PoolPrivacyUpdatedEvent,
  TransactionExecuted as TransactionExecutedEvent,
  Transfer as TransferEvent,
  Withdrawal as WithdrawalEvent,
  PoolLogic
} from '../generated/templates/PoolLogic/PoolLogic';
import { 
  fetchTokenDecimals,
  convertTokenToDecimal,
  fetchTokenName
} from "./helpers";
import {
  PoolManagerLogic
} from '../generated/templates/PoolLogic/PoolManagerLogic';
import {
  Approval,
  Deposit,
  ManagerFeeMinted,
  PoolManagerLogicSet,
  PoolPrivacyUpdated,
  TransactionExecuted,
  Transfer,
  Withdrawal,
  Pool,
  Asset
} from '../generated/schema';
import { dataSource, log } from '@graphprotocol/graph-ts';

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.owner = event.params.owner;
  entity.spender = event.params.spender;
  entity.value = event.params.value;
  entity.save();
}

export function handleDeposit(event: DepositEvent): void {
  let entity = new Deposit(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );

  // PoolLogic data source
  let id = dataSource.address().toHexString();
  let pool = Pool.load(id);
  if (!pool) {
    pool = new Pool(id);
    pool.fundAddress = event.params.fundAddress;
  }

  let poolContract = PoolLogic.bind(event.address);
    
  // maybe bind this to PoolManagerLogic contract to get FundComposition function
  let managerAddress = poolContract.poolManagerLogic();
  // dunno if i need to pass in fundAddress or managerAddress
  // let managerContract = PoolManagerLogic.bind(event.address);
  let managerContract = PoolManagerLogic.bind(managerAddress);
  
  let tryAssetBalance = managerContract.try_assetBalance(event.params.assetDeposited);
  if (tryAssetBalance.reverted) {
    log.info(
      'assetBalance was reverted in tx hash {} at block number: {}',
      [event.transaction.hash.toHex(), event.block.number.toString()]
    );
    return;
  }
  let assetValue = managerContract.assetValue(event.params.assetDeposited, event.params.valueDeposited);
  
  // Create or Load Asset entity
    // this links the (fundAddress + assetDeposited), making it easy to 
    // Fund A deposits -> 13.233 wETH
    // Fund B deposits -> 0.05324 wETH
    // Every Fund will have their own -wETH id
    // that Asset instance will be the source of truth 
  let asset = Asset.load(event.address.toHexString() + "-" + event.params.assetDeposited.toHexString());
  if (!asset) {
    asset = new Asset(event.address.toHexString() + "-" + event.params.assetDeposited.toHexString());
    asset.pool = pool.id
  }
  let decimals = fetchTokenDecimals(event.params.assetDeposited)
  let balanceTest = convertTokenToDecimal(tryAssetBalance.value, decimals)

  let timestamp = event.block.timestamp.toI32()
  asset.timestamp = timestamp
  asset.block = event.block.number.toI32()
  // snapshot.timestamp = timestamp
  // snapshot.block = event.block.number.toI32()
  asset.name = fetchTokenName(event.params.assetDeposited)
  asset.balance = balanceTest; // correct conversion
  asset.value = assetValue;
  asset.save();


  // Pool Entity
  pool.manager = managerAddress
  pool.name = poolContract.name();
  pool.managerName = poolContract.managerName();
  pool.totalSupply = poolContract.totalSupply();
  pool.save();

  // Exchange Entity
  entity.pool = pool.id;
  entity.fundAddress = event.params.fundAddress;
  entity.totalSupply = poolContract.totalSupply();
  entity.investor = event.params.investor;
  entity.assetDeposited = event.params.assetDeposited;
  entity.valueDeposited = event.params.valueDeposited;
  entity.fundTokensReceived = event.params.fundTokensReceived;
  entity.totalInvestorFundTokens = event.params.totalInvestorFundTokens;
  entity.fundValue = event.params.fundValue;
  entity.time = event.params.time;
  entity.save();
}

export function handleManagerFeeMinted(event: ManagerFeeMintedEvent): void {
  let entity = new ManagerFeeMinted(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  
  entity.pool = event.params.pool;
  entity.manager = event.params.manager;
  entity.available = event.params.available;
  entity.daoFee = event.params.daoFee;
  entity.managerFee = event.params.managerFee;
  entity.tokenPriceAtLastFeeMint = event.params.tokenPriceAtLastFeeMint;
  entity.save();
}

export function handlePoolManagerLogicSet(event: PoolManagerLogicSetEvent): void {
  let entity = new PoolManagerLogicSet(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  
  entity.poolManagerLogic = event.params.poolManagerLogic;
  entity.from = event.params.from;
  entity.save();
}

export function handlePoolPrivacyUpdated(event: PoolPrivacyUpdatedEvent): void {
  let entity = new PoolPrivacyUpdated(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  
  entity.isPoolPrivate = event.params.isPoolPrivate;
  entity.save();
}

export function handleTransactionExecuted(event: TransactionExecutedEvent): void {
  let entity = new TransactionExecuted(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  
  entity.pool = event.params.pool;
  entity.manager = event.params.manager;
  entity.transactionType = event.params.transactionType;
  entity.time = event.params.time;
  entity.save();
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.value = event.params.value;
  entity.save();
}

export function handleWithdrawal(event: WithdrawalEvent): void {
  let entity = new Withdrawal(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  let contract = PoolLogic.bind(event.address);

  let id = dataSource.address().toHexString();
  let pool = Pool.load(id);
  if (!pool) {
    pool = new Pool(id);
    pool.fundAddress = event.params.fundAddress;
  }
  pool.name = contract.name();
  pool.managerName = contract.managerName();
  pool.totalSupply = contract.totalSupply();
  pool.save();

  entity.pool = pool.id;
  entity.fundAddress = event.params.fundAddress;
  entity.totalSupply = contract.totalSupply();
  entity.investor = event.params.investor;
  entity.valueWithdrawn = event.params.valueWithdrawn;
  entity.fundTokensWithdrawn = event.params.fundTokensWithdrawn;
  entity.totalInvestorFundTokens = event.params.totalInvestorFundTokens;
  entity.fundValue = event.params.fundValue;
  entity.time = event.params.time;
  entity.save();
}
