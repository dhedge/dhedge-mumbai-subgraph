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
import { ERC20 } from "../generated/UniswapV2RouterGuard/ERC20";
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
  PoolBalanceSnapshot,
  Token,
} from '../generated/schema';
import { createToken, convertTokenToDecimal, fetchTokenDecimals } from "./helpers";
import { dataSource, log, Address } from '@graphprotocol/graph-ts';

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
  let contract = PoolLogic.bind(event.address);

  let id = dataSource.address().toHexString();
  let pool = Pool.load(id);

  // Grab the Asset investor Deposited
  // take the deposited asset and save it
  let erc20Contract = ERC20.bind(event.params.assetDeposited);
  let token = createToken(event.params.assetDeposited, event.params.fundAddress);
  
  // let fundAddress = Address.fromString(event.params.fundAddress.toHexString());
  // let assetBalance = erc20Contract.balanceOf(fundAddress);
  let decimals = fetchTokenDecimals(event.params.assetDeposited);
  // let quantity = convertTokenToDecimal(assetBalance, decimals);
  let poolAddress = Address.fromString(event.params.fundAddress.toHexString());
  let balance = erc20Contract.balanceOf(poolAddress);
  let quantity = convertTokenToDecimal(balance, decimals);
  

  if (!pool) {
    pool = new Pool(id);
    pool.fundAddress = event.params.fundAddress;
  }
  pool.name = contract.name();
  pool.managerName = contract.managerName();
  pool.totalSupply = contract.totalSupply();
  
  // on Deposit event we want to get the current balance of the fundAddress
  let poolBalanceSnapshot = PoolBalanceSnapshot.load(id);
  if (poolBalanceSnapshot === null) {
    poolBalanceSnapshot = new PoolBalanceSnapshot(id);
  }
  poolBalanceSnapshot.testValue = quantity // should fetch the difference in balance
  poolBalanceSnapshot.currentBalance = token.amount // should fetch the difference in balance
  poolBalanceSnapshot.pool = pool.id;
  poolBalanceSnapshot.asset = token.id;
  poolBalanceSnapshot.token = token.id;
  poolBalanceSnapshot.currentBalance = token.amount;
  poolBalanceSnapshot.save();

  pool.save();

  entity.pool = pool.id;
  entity.fundAddress = event.params.fundAddress;
  entity.totalSupply = contract.totalSupply();
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
