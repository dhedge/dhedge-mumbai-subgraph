import {
  Exchange as ExchangeEvent,
} from '../generated/UniswapV2RouterGuard/UniswapV2RouterGuard';
import {
  Transfer as TransferEvent,
  PoolLogic
} from '../generated/templates/PoolLogic/PoolLogic';
import {
  Transfer,
  Exchange,
  Asset,
  ExchangeComplete
} from '../generated/schema';
import {
  ERC20
} from "../generated/PoolFactory/ERC20"

import { dataSource, log, BigInt } from '@graphprotocol/graph-ts';

export function handleExchange(event: ExchangeEvent): void {
  let entity = new Exchange(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );

  // TODO:
  // load the Asset entity 
  // load the FundCreated? entity 

  let erc20 = ERC20.bind(event.params.dstAsset)
  let balance = erc20.balanceOf(event.params.fundAddress);

  // TODO: change to assetFund
  // exchange (2 assets), 
  // withdraw (all assets)
  // deposits (only the single deposit asset)

  let assetFund = ExchangeComplete.load(event.params.dstAsset + "-" + event.params.fundAddress);
  if (assetFund === null) {
    assetFund = new ExchangeComplete(event.params.dstAsset + "-" + event.params.fundAddress);
  } else {
    // we need the difference of the balance from last snapshot
    // do the calculation of the difference in here
    let oldBalance = exchangeComplete.balance
    // this should be dstAmount
    entity.dstAmount = balance - oldBalance
    // save it to entity.
  }
  assetFund.balance = balance;
  assetFund.save();



  let contract = PoolLogic.bind(event.address);
  // contract.transfer(recipient: Address, amount: BigInt) .. => returns boolean


  // call balanceOf (pass in pool address)
  // snapshot of balance
  // when querying can get difference in balance


  // log.info("Message to be displayed!!!!!: {}", [entity.dstAmount.toString()])

  entity.fundAddress = event.params.fundAddress;
  entity.sourceAsset = event.params.sourceAsset;
  entity.sourceAmount = event.params.sourceAmount;
  entity.dstAsset = event.params.dstAsset;
  entity.time = event.params.time;
  
  entity.save();
}