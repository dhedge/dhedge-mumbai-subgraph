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
  Approval,
  Deposit,
  ManagerFeeMinted,
  PoolManagerLogicSet,
  PoolPrivacyUpdated,
  TransactionExecuted,
  Transfer,
  Withdrawal,
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
  let contract = PoolLogic.bind(event.address);  

  entity.fundAddress = event.params.fundAddress;
  entity.totalSupply = contract.totalSupply();
  entity.investor = event.params.investor;
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