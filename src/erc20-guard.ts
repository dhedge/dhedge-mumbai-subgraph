import {
  Approve as ApproveEvent,
  Exchange as ExchangeEvent,
} from '../generated/templates/ERC20Guard/ERC20Guard';
import {
  Approve,
  Exchange,
} from '../generated/schema';
import { dataSource, log } from '@graphprotocol/graph-ts';

export function handleApprove(event: ApproveEvent): void {
  let entity = new Approve(
    event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  );
  entity.fundAddress = event.params.fundAddress;
  entity.manager = event.params.manager;
  entity.amount = event.params.amount;
  entity.time = event.params.time;
  entity.save();
}

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