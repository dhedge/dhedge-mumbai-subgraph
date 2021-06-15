import {
  PoolLogic
} from '../generated/templates/PoolLogic/PoolLogic';
import {
  Exchange as ExchangeEvent,
} from '../generated/UniswapV2RouterGuard/UniswapV2RouterGuard';
import {
  Exchange,
  Pool
} from '../generated/schema';
import { dataSource, log } from '@graphprotocol/graph-ts';

export function handleExchange(event: ExchangeEvent): void {
  let entity = new Exchange(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );

  // log.info(
  //   'exchange entity in tx hash: {} at blockNumber: {}', 
  //   [event.transaction.hash.toHex(), event.block.number.toString()]
  // );

  // let contract = PoolLogic.bind(event.address);
  let contract = PoolLogic.bind(event.params.fundAddress);

  // dataSource.address() will give you the address of the contract that datasource is listening to.
  // try with: event.params.fundAddress
  // let id = dataSource.address().toHexString();
  // log.info(
  //   'exchange entity logging dataSource.address from dataSource: {}',
  //   [id]
  // );

  // let pool = Pool.load(id);
  let pool = Pool.load(event.params.fundAddress.toHexString());

  // log.info(
  //   'logging pool entity id: {}',
  //   [pool.id]
  // )

  if (!pool) {
    // pool = new Pool(id);
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
  }

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
