import { BigInt, BigDecimal, Address, ethereum } from "@graphprotocol/graph-ts"
import { Asset, FundCreated } from "../../generated/schema"

import {
  ERC20
} from "../../generated/PoolFactory/ERC20"

import {
  PoolFactory
} from "../../generated/PoolFactory/PoolFactory"

export let ZERO_BI = BigInt.fromI32(0)
export let ONE_BI = BigInt.fromI32(1)
export let ZERO_BD = BigDecimal.fromString('0')


// TODO
// add handler for addAsset and removeAsset

// createAsset
// this will be called in the AddAssetEvent

// createFund
// this will be called in the FundCreated event (from Factory)

// export function createAsset(address: Address): void {
//   let asset = Asset.load(address.toHexString())
//   // Entities only exist after they have been saved to the store;
//   // `null` checks allow to create entities on demand
//   if (asset === null) {
//     asset = new Asset(address.toHexString())
//     // Entity fields can be set using simple assignments

//     // asset.currentBalance = tokenContract.balanceOf() later
//     asset.save()
//   }
// }

// // Fund
// export function createFund(address: Address, event: ethereum.Event): void {
//   let pair = FundCreated.load(address.toHexString())
//   // Entities only exist after they have been saved to the store;
//   // `null` checks allow to create entities on demand
//   if (pair === null) {
//     pair = new Pair(address.toHexString())
//     // Entity fields can be set using simple assignments
//     let contract = Contract.bind(event.address)
//     let baseTokenAddress = contract._BASE_TOKEN_()
//     let quoteTokenAddress = contract._QUOTE_TOKEN_()
//     createToken(baseTokenAddress)
//     createToken(quoteTokenAddress)

//     pair.baseToken = baseTokenAddress.toHexString()

//     pair.save()
//   }
// }

