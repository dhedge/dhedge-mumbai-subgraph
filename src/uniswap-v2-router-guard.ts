import {
  PoolLogic
} from '../generated/templates/PoolLogic/PoolLogic';
import {
  Exchange as ExchangeEvent,
} from '../generated/UniswapV2RouterGuard/UniswapV2RouterGuard';
import { ERC20 } from "../generated/UniswapV2RouterGuard/ERC20";
import {
  Exchange,
  Pool,
  Token,
  PoolBalanceSnapshot
} from '../generated/schema';
import { 
  createToken,
  BI_18,
  convertTokenToDecimal
} from "./helpers";
import { dataSource, log, BigDecimal, BigInt, Address } from '@graphprotocol/graph-ts';

export function handleExchange(event: ExchangeEvent): void {
  let entity = new Exchange(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );

  let contract = PoolLogic.bind(event.params.fundAddress);
  let fundAddress = event.params.fundAddress.toHexString();
  let pool = Pool.load(fundAddress);
  // let destinationTokenAddress = event.params.dstAsset.toHexString();

  // pass destinationTokenAddress to createToken()
  let token = createToken(event.params.dstAsset, event.params.fundAddress);
  // if token is not null, return token and update its balanceOf
  // we want to be updating token.balanceOf as the latest most up to date snapshot
  


  // HANDLE EXCHANGE COMPLETE
  let poolBalanceSnapshot = PoolBalanceSnapshot.load(event.params.fundAddress.toHexString());
  if (poolBalanceSnapshot === null) {
    poolBalanceSnapshot = new PoolBalanceSnapshot(event.transaction.hash.toHex() + "-" + event.params.dstAsset.toHexString());
  } else {
    // we need the difference of the balance from last snapshot
    // do the calculation of the difference in here

    // GET CURRENT BALANCE
    // load the balance of fundAddress: event.params.fundAddress.toHexString()
    let testDstAsset = ERC20.bind(event.params.dstAsset);
    let testContractBalance = Address.fromString(event.params.fundAddress.toHexString());

    let newBalanceDecimal = convertTokenToDecimal(testDstAsset.balanceOf(testContractBalance), BI_18);
    let oldBalanceDecimal = poolBalanceSnapshot.balance;
    // newBalanceDecimal - oldBalanceDecimal 

    entity.dstAmount = token.balanceOf;
    // let result = newBalanceDecimal - oldBalanceDecimal;

    // exchangeComplete.balance = result // should fetch the difference in balance
    poolBalanceSnapshot.balance = newBalanceDecimal // should fetch the difference in balance
  }

  let testDstAsset = ERC20.bind(event.params.dstAsset);
  let testContractBalance = Address.fromString(event.params.fundAddress.toHexString());

  let newBalanceDecimal = convertTokenToDecimal(testDstAsset.balanceOf(testContractBalance), BI_18);

  // wrong
  // entity.dstAmount = token.balanceOf;

  entity.dstAmount = newBalanceDecimal;

  poolBalanceSnapshot.pool = pool.id;
  poolBalanceSnapshot.asset = token.id;
  // exchangeComplete.balance = token.balanceOf; // update this with difference
  poolBalanceSnapshot.balance = newBalanceDecimal; // update this with difference
  poolBalanceSnapshot.save();
  // END EXCHANGE COMPLETE


  if (!pool) {
    pool = new Pool(event.params.fundAddress.toHexString());
    pool.fundAddress = event.params.fundAddress;
  }
  let tryPoolName = contract.try_name()

  if (tryPoolName.reverted) {
    log.info(
      'pool name was reverted in tx hash: {} at blockNumber: {}', 
      [event.transaction.hash.toHex(), event.block.number.toString()]
    );
    return;
  };


  let poolName = tryPoolName.value;
  pool.name = poolName;

  pool.managerName = contract.managerName();
  pool.totalSupply = contract.totalSupply();
  // will maybe need to add pool.balanceSnapshot
  pool.save();

  entity.pool = pool.id;
  entity.fundAddress = event.params.fundAddress;
  entity.sourceAsset = event.params.sourceAsset;
  entity.sourceAmount = event.params.sourceAmount;
  entity.dstAsset = event.params.dstAsset;
  entity.time = event.params.time;
  entity.save();
}
