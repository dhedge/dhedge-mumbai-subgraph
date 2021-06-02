// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Exchange extends ethereum.Event {
  get params(): Exchange__Params {
    return new Exchange__Params(this);
  }
}

export class Exchange__Params {
  _event: Exchange;

  constructor(event: Exchange) {
    this._event = event;
  }

  get fundAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get sourceAsset(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get sourceAmount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get destinationAddress(): Address {
    return this._event.parameters[3].value.toAddress();
  }

  get time(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class UniswapV2Guard extends ethereum.SmartContract {
  static bind(address: Address): UniswapV2Guard {
    return new UniswapV2Guard("UniswapV2Guard", address);
  }

  convert32toAddress(data: Bytes): Address {
    let result = super.call(
      "convert32toAddress",
      "convert32toAddress(bytes32):(address)",
      [ethereum.Value.fromFixedBytes(data)]
    );

    return result[0].toAddress();
  }

  try_convert32toAddress(data: Bytes): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "convert32toAddress",
      "convert32toAddress(bytes32):(address)",
      [ethereum.Value.fromFixedBytes(data)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getArrayIndex(data: Bytes, inputNum: i32, arrayIndex: i32): Bytes {
    let result = super.call(
      "getArrayIndex",
      "getArrayIndex(bytes,uint8,uint8):(bytes32)",
      [
        ethereum.Value.fromBytes(data),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(inputNum)),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(arrayIndex))
      ]
    );

    return result[0].toBytes();
  }

  try_getArrayIndex(
    data: Bytes,
    inputNum: i32,
    arrayIndex: i32
  ): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "getArrayIndex",
      "getArrayIndex(bytes,uint8,uint8):(bytes32)",
      [
        ethereum.Value.fromBytes(data),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(inputNum)),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(arrayIndex))
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  getArrayLast(data: Bytes, inputNum: i32): Bytes {
    let result = super.call(
      "getArrayLast",
      "getArrayLast(bytes,uint8):(bytes32)",
      [
        ethereum.Value.fromBytes(data),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(inputNum))
      ]
    );

    return result[0].toBytes();
  }

  try_getArrayLast(data: Bytes, inputNum: i32): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "getArrayLast",
      "getArrayLast(bytes,uint8):(bytes32)",
      [
        ethereum.Value.fromBytes(data),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(inputNum))
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  getArrayLength(data: Bytes, inputNum: i32): BigInt {
    let result = super.call(
      "getArrayLength",
      "getArrayLength(bytes,uint8):(uint256)",
      [
        ethereum.Value.fromBytes(data),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(inputNum))
      ]
    );

    return result[0].toBigInt();
  }

  try_getArrayLength(data: Bytes, inputNum: i32): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getArrayLength",
      "getArrayLength(bytes,uint8):(uint256)",
      [
        ethereum.Value.fromBytes(data),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(inputNum))
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getBytes(data: Bytes, inputNum: i32, offset: BigInt): Bytes {
    let result = super.call(
      "getBytes",
      "getBytes(bytes,uint8,uint256):(bytes)",
      [
        ethereum.Value.fromBytes(data),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(inputNum)),
        ethereum.Value.fromUnsignedBigInt(offset)
      ]
    );

    return result[0].toBytes();
  }

  try_getBytes(
    data: Bytes,
    inputNum: i32,
    offset: BigInt
  ): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "getBytes",
      "getBytes(bytes,uint8,uint256):(bytes)",
      [
        ethereum.Value.fromBytes(data),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(inputNum)),
        ethereum.Value.fromUnsignedBigInt(offset)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  getInput(data: Bytes, inputNum: i32): Bytes {
    let result = super.call("getInput", "getInput(bytes,uint8):(bytes32)", [
      ethereum.Value.fromBytes(data),
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(inputNum))
    ]);

    return result[0].toBytes();
  }

  try_getInput(data: Bytes, inputNum: i32): ethereum.CallResult<Bytes> {
    let result = super.tryCall("getInput", "getInput(bytes,uint8):(bytes32)", [
      ethereum.Value.fromBytes(data),
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(inputNum))
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  getMethod(data: Bytes): Bytes {
    let result = super.call("getMethod", "getMethod(bytes):(bytes4)", [
      ethereum.Value.fromBytes(data)
    ]);

    return result[0].toBytes();
  }

  try_getMethod(data: Bytes): ethereum.CallResult<Bytes> {
    let result = super.tryCall("getMethod", "getMethod(bytes):(bytes4)", [
      ethereum.Value.fromBytes(data)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  getParams(data: Bytes): Bytes {
    let result = super.call("getParams", "getParams(bytes):(bytes)", [
      ethereum.Value.fromBytes(data)
    ]);

    return result[0].toBytes();
  }

  try_getParams(data: Bytes): ethereum.CallResult<Bytes> {
    let result = super.tryCall("getParams", "getParams(bytes):(bytes)", [
      ethereum.Value.fromBytes(data)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  read32(data: Bytes, offset: BigInt, length: BigInt): Bytes {
    let result = super.call(
      "read32",
      "read32(bytes,uint256,uint256):(bytes32)",
      [
        ethereum.Value.fromBytes(data),
        ethereum.Value.fromUnsignedBigInt(offset),
        ethereum.Value.fromUnsignedBigInt(length)
      ]
    );

    return result[0].toBytes();
  }

  try_read32(
    data: Bytes,
    offset: BigInt,
    length: BigInt
  ): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "read32",
      "read32(bytes,uint256,uint256):(bytes32)",
      [
        ethereum.Value.fromBytes(data),
        ethereum.Value.fromUnsignedBigInt(offset),
        ethereum.Value.fromUnsignedBigInt(length)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  read4left(data: Bytes, offset: BigInt): Bytes {
    let result = super.call("read4left", "read4left(bytes,uint256):(bytes4)", [
      ethereum.Value.fromBytes(data),
      ethereum.Value.fromUnsignedBigInt(offset)
    ]);

    return result[0].toBytes();
  }

  try_read4left(data: Bytes, offset: BigInt): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "read4left",
      "read4left(bytes,uint256):(bytes4)",
      [
        ethereum.Value.fromBytes(data),
        ethereum.Value.fromUnsignedBigInt(offset)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  txGuard(pool: Address, data: Bytes): i32 {
    let result = super.call("txGuard", "txGuard(address,bytes):(uint8)", [
      ethereum.Value.fromAddress(pool),
      ethereum.Value.fromBytes(data)
    ]);

    return result[0].toI32();
  }

  try_txGuard(pool: Address, data: Bytes): ethereum.CallResult<i32> {
    let result = super.tryCall("txGuard", "txGuard(address,bytes):(uint8)", [
      ethereum.Value.fromAddress(pool),
      ethereum.Value.fromBytes(data)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }
}

export class TxGuardCall extends ethereum.Call {
  get inputs(): TxGuardCall__Inputs {
    return new TxGuardCall__Inputs(this);
  }

  get outputs(): TxGuardCall__Outputs {
    return new TxGuardCall__Outputs(this);
  }
}

export class TxGuardCall__Inputs {
  _call: TxGuardCall;

  constructor(call: TxGuardCall) {
    this._call = call;
  }

  get pool(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get data(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class TxGuardCall__Outputs {
  _call: TxGuardCall;

  constructor(call: TxGuardCall) {
    this._call = call;
  }

  get txType(): i32 {
    return this._call.outputValues[0].value.toI32();
  }
}
