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
  convertTokenToDecimal,
  fetchTokenDecimals
} from "./helpers";
import { dataSource, log, BigDecimal, BigInt, Address } from '@graphprotocol/graph-ts';

export function handleExchange(event: ExchangeEvent): void {
  let entity = new Exchange(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );

  let poolLogicContract = PoolLogic.bind(event.params.fundAddress);
  let pool = Pool.load(event.params.fundAddress.toHexString());
  let poolBalanceSnapshot = PoolBalanceSnapshot.load(event.params.fundAddress.toHexString());
 
  // create the tokens
  let token = createToken(event.params.dstAsset, event.params.fundAddress);
  // if token is not null, return token and update its balanceOf
  // we want to be updating token.balanceOf as the latest most up to date snapshot
  let decimals = fetchTokenDecimals(event.params.dstAsset);
  

  if (poolBalanceSnapshot === null) {
    poolBalanceSnapshot = new PoolBalanceSnapshot(event.params.fundAddress.toHexString());
  } 
  // we need the difference of the balance from last snapshot
  // do the calculation of the difference in here

  let erc20Contract = ERC20.bind(event.params.dstAsset);
  let testContractBalance = Address.fromString(event.params.fundAddress.toHexString());
  // let newBalanceDecimal = convertTokenToDecimal(testDstAsset.balanceOf(testContractBalance), BI_18);
  let currentFormattedBalance = convertTokenToDecimal(erc20Contract.balanceOf(testContractBalance), decimals);
  
  // we're saving the token.amount to exchange.amount
  // wait which one do i save - its the same thing
  // entity.dstAmount = token.amount; // (unsure what this is) this didnt work
  entity.dstAmount = currentFormattedBalance; // this just sets current balance

  // Currently testing:
  poolBalanceSnapshot.testValue = currentFormattedBalance // should fetch the difference in balance
  poolBalanceSnapshot.currentBalance = token.amount // should fetch the difference in balance


  poolBalanceSnapshot.pool = pool.id;
  poolBalanceSnapshot.asset = token.id;
  poolBalanceSnapshot.token = token.id;
  // poolBalanceSnapshot.currentBalance = currentFormattedBalance; // update this with difference
  poolBalanceSnapshot.currentBalance = token.amount; // update this with difference
  poolBalanceSnapshot.save();
  // END EXCHANGE COMPLETE
  
  if (!pool) {
    pool = new Pool(event.params.fundAddress.toHexString());
    pool.fundAddress = event.params.fundAddress;
  }
  let tryPoolName = poolLogicContract.try_name()

  if (tryPoolName.reverted) {
    log.info(
      'pool name was reverted in tx hash: {} at blockNumber: {}', 
      [event.transaction.hash.toHex(), event.block.number.toString()]
    );
    return;
  };


  let poolName = tryPoolName.value;
  pool.name = poolName;

  pool.managerName = poolLogicContract.managerName();
  pool.totalSupply = poolLogicContract.totalSupply();
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
