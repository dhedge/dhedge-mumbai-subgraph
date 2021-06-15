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
  ExchangeComplete
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
  let pool = Pool.load(event.params.fundAddress.toHexString());
  

  // SAVE TOKEN (MOVE TO HELPERS)
  let destinationTokenAddress = event.params.dstAsset.toHexString();

  let token = Token.load(destinationTokenAddress);

  if (token === null) {
    token = new Token(destinationTokenAddress);
    let erc20Contract = ERC20.bind(event.params.dstAsset);
    let tokenContractBalance = Address.fromString(event.params.fundAddress.toHexString());

    token.name = erc20Contract.name();
    token.symbol = erc20Contract.symbol();
    token.balanceOf = convertTokenToDecimal(erc20Contract.balanceOf(tokenContractBalance), BI_18);
    token.save();
  }


  // HANDLE EXCHANGE COMPLETE
  let exchangeComplete = ExchangeComplete.load(event.params.fundAddress.toHexString());
  if (exchangeComplete === null) {
    exchangeComplete = new ExchangeComplete(event.transaction.hash.toHex() + "-" + event.params.dstAsset.toHexString());
  } else {
    // we need the difference of the balance from last snapshot
    // do the calculation of the difference in here

    // GET CURRENT BALANCE
    // load the balance of fundAddress: event.params.fundAddress.toHexString()
    let testDstAsset = ERC20.bind(event.params.dstAsset);
    let testContractBalance = Address.fromString(event.params.fundAddress.toHexString());

    let newBalanceDecimal = convertTokenToDecimal(testDstAsset.balanceOf(testContractBalance), BI_18);
    let oldBalanceDecimal = exchangeComplete.balance;
    // newBalanceDecimal - oldBalanceDecimal 

    entity.dstAmount = token.balanceOf;
    // let result = newBalanceDecimal - oldBalanceDecimal;

    // exchangeComplete.balance = result // should fetch the difference in balance
    exchangeComplete.balance = newBalanceDecimal // should fetch the difference in balance
  }

  let testDstAsset = ERC20.bind(event.params.dstAsset);
  let testContractBalance = Address.fromString(event.params.fundAddress.toHexString());

  let newBalanceDecimal = convertTokenToDecimal(testDstAsset.balanceOf(testContractBalance), BI_18);

  entity.dstAmount = token.balanceOf;

  exchangeComplete.pool = pool.id;
  exchangeComplete.asset = token.id;
  // exchangeComplete.balance = token.balanceOf; // update this with difference
  exchangeComplete.balance = newBalanceDecimal; // update this with difference
  exchangeComplete.save();
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
