import { log, BigInt, BigDecimal, Address, ethereum, Bytes } from "@graphprotocol/graph-ts"
import { Token, Pool, PoolBalanceSnapshot } from "../generated/schema"

import {
  ERC20
} from "../generated/PoolFactory/ERC20"

import {
  PoolLogic
} from "../generated/templates/PoolLogic/PoolLogic"

export let ZERO_BI = BigInt.fromI32(0)
export let ONE_BI = BigInt.fromI32(1)
export let ZERO_BD = BigDecimal.fromString('0')
export let BI_18 = BigInt.fromI32(18)


// TODO
// add handler for addAsset and removeAsset

// createAsset
// this will be called in the AddAssetEvent


// lets just try and save the token balance to Pool
// export function createToken(address: Address, fundAddress: Bytes): void {
//   let token = Token.load(address.toHexString());

//   if (token === null) {
//     token = new Token(address.toHexString());
//     let tokenContract = ERC20.bind(address);
//     let tokenContractBalance = Address.fromString(fundAddress.toHexString());

//     token.name = tokenContract.name();
//     token.symbol = tokenContract.symbol();
//     token.balanceOf = convertTokenToDecimal(tokenContract.balanceOf(tokenContractBalance), BI_18);
//     token.save();
//   }
// }

export function fetchTokenDecimals(tokenAddress: Address): BigInt {
  let contract = ERC20.bind(tokenAddress);
  // try types uint8 for decimals
  let decimalValue = null
  let decimalResult = contract.try_decimals();
  if (!decimalResult.reverted) {
    decimalValue = decimalResult.value;
  }
  return BigInt.fromI32(decimalValue as i32);
}

export function createToken(tokenAddress: Address, fundAddress: Address): Token | null {
  let token = Token.load(tokenAddress.toHexString() + "-" + fundAddress.toHexString());

  if (token === null) {
    token = new Token(tokenAddress.toHexString() + "-" + fundAddress.toHexString());
    let tokenContract = ERC20.bind(tokenAddress);
    let pool = Address.fromString(fundAddress.toHexString());
    let decimals = fetchTokenDecimals(tokenAddress);

    // bail if we couldn't figure out the decimals
    if (decimals === null) {
      log.debug('mybug the decimal on token was null', []);
      // return;
    }

    token.name = tokenContract.name();
    token.symbol = tokenContract.symbol();
    token.decimals = decimals;
    token.amount = convertTokenToDecimal(tokenContract.balanceOf(pool), decimals);

    token.save();

    return token;
  }
  return token;
}

export function exponentToBigDecimal(decimals: BigInt): BigDecimal {
  let bd = BigDecimal.fromString('1')
  for (let i = ZERO_BI; i.lt(decimals as BigInt); i = i.plus(ONE_BI)) {
    bd = bd.times(BigDecimal.fromString('10'))
  }
  return bd
}

export function convertTokenToDecimal(tokenAmount: BigInt, exchangeDecimals: BigInt): BigDecimal {
  if (exchangeDecimals == ZERO_BI) {
    return tokenAmount.toBigDecimal()
  }
  return tokenAmount.toBigDecimal().div(exponentToBigDecimal(exchangeDecimals))
}

