import {
  Exchange as ExchangeEvent,
} from '../generated/templates/UniswapV2Guard/UniswapV2Guard';
import {
  Exchange,
} from '../generated/schema';
import { dataSource, log } from '@graphprotocol/graph-ts';

export function handleExchange(event: ExchangeEvent): void {
  let entity = new Exchange(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.fundAddress = event.params.fundAddress;
  entity.sourceAsset = event.params.sourceAsset;
  entity.sourceAmount = event.params.sourceAmount;
  entity.destinationAddress = event.params.destinationAddress;
  entity.time = event.params.time;
  entity.save();
}

