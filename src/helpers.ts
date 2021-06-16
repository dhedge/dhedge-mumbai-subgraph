import { BigInt, BigDecimal, Address, ethereum, Bytes } from "@graphprotocol/graph-ts"
import { Token, Pool } from "../generated/schema"

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

// NEW
export function createToken(address: Address, fundAddress: Bytes): Token | null {
  let token = Token.load(address.toHexString());

  if (token === null) {
    token = new Token(address.toHexString());
    let erc20Contract = ERC20.bind(address);
    let tokenContractBalance = Address.fromString(fundAddress.toHexString());

    token.name = erc20Contract.name();
    token.symbol = erc20Contract.symbol();
    // if token is wETH, do this conversion
    // if not..
    token.balanceOf = convertTokenToDecimal(erc20Contract.balanceOf(tokenContractBalance), BI_18);
    token.save();
    return token;
  }
  return token;
}

// we could have an Entity called PoolBalance (portfolio)
// any time there is a Deposit, Withdraw or Exchange event, we need to update PoolBalance entity
// export function createBalance(tokenAddress: Address, fundAddress: Bytes, event: ethereum.Event): void {  
//   // load the Token Balance for a fundAddress (ID)
//   let tokenBalance = TokenBalance.load(fundAddress.toHexString());
//   if (tokenBalance === null) {
//     tokenBalance = new TokenBalance(fundAddress.toHexString());
//     // what contract to bind with?
//     // this will be called in Exchange, Deposit, Withdrawal events
//     let contract = PoolLogic.bind(event.address);
//     // let tokenAddress = contract.dstAsset
//     createToken(tokenAddress, fundAddress);    

//     tokenBalance.save();
//   }
// }

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


