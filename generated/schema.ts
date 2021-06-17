// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class DaoAddressSet extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save DaoAddressSet entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save DaoAddressSet entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("DaoAddressSet", id.toString(), this);
  }

  static load(id: string): DaoAddressSet | null {
    return store.get("DaoAddressSet", id) as DaoAddressSet | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get dao(): Bytes {
    let value = this.get("dao");
    return value.toBytes();
  }

  set dao(value: Bytes) {
    this.set("dao", Value.fromBytes(value));
  }
}

export class DaoFeeSet extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save DaoFeeSet entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save DaoFeeSet entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("DaoFeeSet", id.toString(), this);
  }

  static load(id: string): DaoFeeSet | null {
    return store.get("DaoFeeSet", id) as DaoFeeSet | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get numerator(): BigInt {
    let value = this.get("numerator");
    return value.toBigInt();
  }

  set numerator(value: BigInt) {
    this.set("numerator", Value.fromBigInt(value));
  }

  get denominator(): BigInt {
    let value = this.get("denominator");
    return value.toBigInt();
  }

  set denominator(value: BigInt) {
    this.set("denominator", Value.fromBigInt(value));
  }
}

export class ExitCooldownSet extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save ExitCooldownSet entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save ExitCooldownSet entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("ExitCooldownSet", id.toString(), this);
  }

  static load(id: string): ExitCooldownSet | null {
    return store.get("ExitCooldownSet", id) as ExitCooldownSet | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get cooldown(): BigInt {
    let value = this.get("cooldown");
    return value.toBigInt();
  }

  set cooldown(value: BigInt) {
    this.set("cooldown", Value.fromBigInt(value));
  }
}

export class ExitFeeSet extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save ExitFeeSet entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save ExitFeeSet entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("ExitFeeSet", id.toString(), this);
  }

  static load(id: string): ExitFeeSet | null {
    return store.get("ExitFeeSet", id) as ExitFeeSet | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get numerator(): BigInt {
    let value = this.get("numerator");
    return value.toBigInt();
  }

  set numerator(value: BigInt) {
    this.set("numerator", Value.fromBigInt(value));
  }

  get denominator(): BigInt {
    let value = this.get("denominator");
    return value.toBigInt();
  }

  set denominator(value: BigInt) {
    this.set("denominator", Value.fromBigInt(value));
  }
}

export class FundCreated extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save FundCreated entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save FundCreated entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("FundCreated", id.toString(), this);
  }

  static load(id: string): FundCreated | null {
    return store.get("FundCreated", id) as FundCreated | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get fundAddress(): Bytes {
    let value = this.get("fundAddress");
    return value.toBytes();
  }

  set fundAddress(value: Bytes) {
    this.set("fundAddress", Value.fromBytes(value));
  }

  get isPoolPrivate(): boolean {
    let value = this.get("isPoolPrivate");
    return value.toBoolean();
  }

  set isPoolPrivate(value: boolean) {
    this.set("isPoolPrivate", Value.fromBoolean(value));
  }

  get fundName(): string {
    let value = this.get("fundName");
    return value.toString();
  }

  set fundName(value: string) {
    this.set("fundName", Value.fromString(value));
  }

  get managerName(): string {
    let value = this.get("managerName");
    return value.toString();
  }

  set managerName(value: string) {
    this.set("managerName", Value.fromString(value));
  }

  get manager(): Bytes {
    let value = this.get("manager");
    return value.toBytes();
  }

  set manager(value: Bytes) {
    this.set("manager", Value.fromBytes(value));
  }

  get time(): BigInt {
    let value = this.get("time");
    return value.toBigInt();
  }

  set time(value: BigInt) {
    this.set("time", Value.fromBigInt(value));
  }

  get managerFeeNumerator(): BigInt {
    let value = this.get("managerFeeNumerator");
    return value.toBigInt();
  }

  set managerFeeNumerator(value: BigInt) {
    this.set("managerFeeNumerator", Value.fromBigInt(value));
  }

  get managerFeeDenominator(): BigInt {
    let value = this.get("managerFeeDenominator");
    return value.toBigInt();
  }

  set managerFeeDenominator(value: BigInt) {
    this.set("managerFeeDenominator", Value.fromBigInt(value));
  }
}

export class LogUpgrade extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save LogUpgrade entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save LogUpgrade entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("LogUpgrade", id.toString(), this);
  }

  static load(id: string): LogUpgrade | null {
    return store.get("LogUpgrade", id) as LogUpgrade | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get manager(): Bytes {
    let value = this.get("manager");
    return value.toBytes();
  }

  set manager(value: Bytes) {
    this.set("manager", Value.fromBytes(value));
  }

  get pool(): Bytes {
    let value = this.get("pool");
    return value.toBytes();
  }

  set pool(value: Bytes) {
    this.set("pool", Value.fromBytes(value));
  }
}

export class MaximumSupportedAssetCountSet extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id !== null,
      "Cannot save MaximumSupportedAssetCountSet entity without an ID"
    );
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save MaximumSupportedAssetCountSet entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("MaximumSupportedAssetCountSet", id.toString(), this);
  }

  static load(id: string): MaximumSupportedAssetCountSet | null {
    return store.get(
      "MaximumSupportedAssetCountSet",
      id
    ) as MaximumSupportedAssetCountSet | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get count(): BigInt {
    let value = this.get("count");
    return value.toBigInt();
  }

  set count(value: BigInt) {
    this.set("count", Value.fromBigInt(value));
  }
}

export class OwnershipTransferred extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id !== null,
      "Cannot save OwnershipTransferred entity without an ID"
    );
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save OwnershipTransferred entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("OwnershipTransferred", id.toString(), this);
  }

  static load(id: string): OwnershipTransferred | null {
    return store.get("OwnershipTransferred", id) as OwnershipTransferred | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get previousOwner(): Bytes {
    let value = this.get("previousOwner");
    return value.toBytes();
  }

  set previousOwner(value: Bytes) {
    this.set("previousOwner", Value.fromBytes(value));
  }

  get newOwner(): Bytes {
    let value = this.get("newOwner");
    return value.toBytes();
  }

  set newOwner(value: Bytes) {
    this.set("newOwner", Value.fromBytes(value));
  }
}

export class Paused extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Paused entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Paused entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Paused", id.toString(), this);
  }

  static load(id: string): Paused | null {
    return store.get("Paused", id) as Paused | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get account(): Bytes {
    let value = this.get("account");
    return value.toBytes();
  }

  set account(value: Bytes) {
    this.set("account", Value.fromBytes(value));
  }
}

export class ProxyCreated extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save ProxyCreated entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save ProxyCreated entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("ProxyCreated", id.toString(), this);
  }

  static load(id: string): ProxyCreated | null {
    return store.get("ProxyCreated", id) as ProxyCreated | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get proxy(): Bytes {
    let value = this.get("proxy");
    return value.toBytes();
  }

  set proxy(value: Bytes) {
    this.set("proxy", Value.fromBytes(value));
  }
}

export class Unpaused extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Unpaused entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Unpaused entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Unpaused", id.toString(), this);
  }

  static load(id: string): Unpaused | null {
    return store.get("Unpaused", id) as Unpaused | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get account(): Bytes {
    let value = this.get("account");
    return value.toBytes();
  }

  set account(value: Bytes) {
    this.set("account", Value.fromBytes(value));
  }
}

export class Approval extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Approval entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Approval entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Approval", id.toString(), this);
  }

  static load(id: string): Approval | null {
    return store.get("Approval", id) as Approval | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get owner(): Bytes {
    let value = this.get("owner");
    return value.toBytes();
  }

  set owner(value: Bytes) {
    this.set("owner", Value.fromBytes(value));
  }

  get spender(): Bytes {
    let value = this.get("spender");
    return value.toBytes();
  }

  set spender(value: Bytes) {
    this.set("spender", Value.fromBytes(value));
  }

  get value(): BigInt {
    let value = this.get("value");
    return value.toBigInt();
  }

  set value(value: BigInt) {
    this.set("value", Value.fromBigInt(value));
  }
}

export class Deposit extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Deposit entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Deposit entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Deposit", id.toString(), this);
  }

  static load(id: string): Deposit | null {
    return store.get("Deposit", id) as Deposit | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get fundAddress(): Bytes {
    let value = this.get("fundAddress");
    return value.toBytes();
  }

  set fundAddress(value: Bytes) {
    this.set("fundAddress", Value.fromBytes(value));
  }

  get investor(): Bytes {
    let value = this.get("investor");
    return value.toBytes();
  }

  set investor(value: Bytes) {
    this.set("investor", Value.fromBytes(value));
  }

  get assetDeposited(): Bytes {
    let value = this.get("assetDeposited");
    return value.toBytes();
  }

  set assetDeposited(value: Bytes) {
    this.set("assetDeposited", Value.fromBytes(value));
  }

  get valueDeposited(): BigInt {
    let value = this.get("valueDeposited");
    return value.toBigInt();
  }

  set valueDeposited(value: BigInt) {
    this.set("valueDeposited", Value.fromBigInt(value));
  }

  get fundTokensReceived(): BigInt {
    let value = this.get("fundTokensReceived");
    return value.toBigInt();
  }

  set fundTokensReceived(value: BigInt) {
    this.set("fundTokensReceived", Value.fromBigInt(value));
  }

  get totalInvestorFundTokens(): BigInt {
    let value = this.get("totalInvestorFundTokens");
    return value.toBigInt();
  }

  set totalInvestorFundTokens(value: BigInt) {
    this.set("totalInvestorFundTokens", Value.fromBigInt(value));
  }

  get fundValue(): BigInt {
    let value = this.get("fundValue");
    return value.toBigInt();
  }

  set fundValue(value: BigInt) {
    this.set("fundValue", Value.fromBigInt(value));
  }

  get totalSupply(): BigInt {
    let value = this.get("totalSupply");
    return value.toBigInt();
  }

  set totalSupply(value: BigInt) {
    this.set("totalSupply", Value.fromBigInt(value));
  }

  get time(): BigInt {
    let value = this.get("time");
    return value.toBigInt();
  }

  set time(value: BigInt) {
    this.set("time", Value.fromBigInt(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }
}

export class ManagerFeeMinted extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save ManagerFeeMinted entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save ManagerFeeMinted entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("ManagerFeeMinted", id.toString(), this);
  }

  static load(id: string): ManagerFeeMinted | null {
    return store.get("ManagerFeeMinted", id) as ManagerFeeMinted | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pool(): Bytes {
    let value = this.get("pool");
    return value.toBytes();
  }

  set pool(value: Bytes) {
    this.set("pool", Value.fromBytes(value));
  }

  get manager(): Bytes {
    let value = this.get("manager");
    return value.toBytes();
  }

  set manager(value: Bytes) {
    this.set("manager", Value.fromBytes(value));
  }

  get available(): BigInt {
    let value = this.get("available");
    return value.toBigInt();
  }

  set available(value: BigInt) {
    this.set("available", Value.fromBigInt(value));
  }

  get daoFee(): BigInt {
    let value = this.get("daoFee");
    return value.toBigInt();
  }

  set daoFee(value: BigInt) {
    this.set("daoFee", Value.fromBigInt(value));
  }

  get managerFee(): BigInt {
    let value = this.get("managerFee");
    return value.toBigInt();
  }

  set managerFee(value: BigInt) {
    this.set("managerFee", Value.fromBigInt(value));
  }

  get tokenPriceAtLastFeeMint(): BigInt {
    let value = this.get("tokenPriceAtLastFeeMint");
    return value.toBigInt();
  }

  set tokenPriceAtLastFeeMint(value: BigInt) {
    this.set("tokenPriceAtLastFeeMint", Value.fromBigInt(value));
  }
}

export class PoolManagerLogicSet extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save PoolManagerLogicSet entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save PoolManagerLogicSet entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("PoolManagerLogicSet", id.toString(), this);
  }

  static load(id: string): PoolManagerLogicSet | null {
    return store.get("PoolManagerLogicSet", id) as PoolManagerLogicSet | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get poolManagerLogic(): Bytes {
    let value = this.get("poolManagerLogic");
    return value.toBytes();
  }

  set poolManagerLogic(value: Bytes) {
    this.set("poolManagerLogic", Value.fromBytes(value));
  }

  get from(): Bytes {
    let value = this.get("from");
    return value.toBytes();
  }

  set from(value: Bytes) {
    this.set("from", Value.fromBytes(value));
  }
}

export class PoolPrivacyUpdated extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save PoolPrivacyUpdated entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save PoolPrivacyUpdated entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("PoolPrivacyUpdated", id.toString(), this);
  }

  static load(id: string): PoolPrivacyUpdated | null {
    return store.get("PoolPrivacyUpdated", id) as PoolPrivacyUpdated | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get isPoolPrivate(): boolean {
    let value = this.get("isPoolPrivate");
    return value.toBoolean();
  }

  set isPoolPrivate(value: boolean) {
    this.set("isPoolPrivate", Value.fromBoolean(value));
  }
}

export class TransactionExecuted extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save TransactionExecuted entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save TransactionExecuted entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("TransactionExecuted", id.toString(), this);
  }

  static load(id: string): TransactionExecuted | null {
    return store.get("TransactionExecuted", id) as TransactionExecuted | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pool(): Bytes {
    let value = this.get("pool");
    return value.toBytes();
  }

  set pool(value: Bytes) {
    this.set("pool", Value.fromBytes(value));
  }

  get manager(): Bytes {
    let value = this.get("manager");
    return value.toBytes();
  }

  set manager(value: Bytes) {
    this.set("manager", Value.fromBytes(value));
  }

  get transactionType(): i32 {
    let value = this.get("transactionType");
    return value.toI32();
  }

  set transactionType(value: i32) {
    this.set("transactionType", Value.fromI32(value));
  }

  get time(): BigInt {
    let value = this.get("time");
    return value.toBigInt();
  }

  set time(value: BigInt) {
    this.set("time", Value.fromBigInt(value));
  }
}

export class Transfer extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Transfer entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Transfer entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Transfer", id.toString(), this);
  }

  static load(id: string): Transfer | null {
    return store.get("Transfer", id) as Transfer | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get from(): Bytes {
    let value = this.get("from");
    return value.toBytes();
  }

  set from(value: Bytes) {
    this.set("from", Value.fromBytes(value));
  }

  get to(): Bytes {
    let value = this.get("to");
    return value.toBytes();
  }

  set to(value: Bytes) {
    this.set("to", Value.fromBytes(value));
  }

  get value(): BigInt {
    let value = this.get("value");
    return value.toBigInt();
  }

  set value(value: BigInt) {
    this.set("value", Value.fromBigInt(value));
  }
}

export class Withdrawal extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Withdrawal entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Withdrawal entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Withdrawal", id.toString(), this);
  }

  static load(id: string): Withdrawal | null {
    return store.get("Withdrawal", id) as Withdrawal | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get fundAddress(): Bytes {
    let value = this.get("fundAddress");
    return value.toBytes();
  }

  set fundAddress(value: Bytes) {
    this.set("fundAddress", Value.fromBytes(value));
  }

  get investor(): Bytes {
    let value = this.get("investor");
    return value.toBytes();
  }

  set investor(value: Bytes) {
    this.set("investor", Value.fromBytes(value));
  }

  get valueWithdrawn(): BigInt {
    let value = this.get("valueWithdrawn");
    return value.toBigInt();
  }

  set valueWithdrawn(value: BigInt) {
    this.set("valueWithdrawn", Value.fromBigInt(value));
  }

  get fundTokensWithdrawn(): BigInt {
    let value = this.get("fundTokensWithdrawn");
    return value.toBigInt();
  }

  set fundTokensWithdrawn(value: BigInt) {
    this.set("fundTokensWithdrawn", Value.fromBigInt(value));
  }

  get totalInvestorFundTokens(): BigInt {
    let value = this.get("totalInvestorFundTokens");
    return value.toBigInt();
  }

  set totalInvestorFundTokens(value: BigInt) {
    this.set("totalInvestorFundTokens", Value.fromBigInt(value));
  }

  get fundValue(): BigInt {
    let value = this.get("fundValue");
    return value.toBigInt();
  }

  set fundValue(value: BigInt) {
    this.set("fundValue", Value.fromBigInt(value));
  }

  get totalSupply(): BigInt {
    let value = this.get("totalSupply");
    return value.toBigInt();
  }

  set totalSupply(value: BigInt) {
    this.set("totalSupply", Value.fromBigInt(value));
  }

  get time(): BigInt {
    let value = this.get("time");
    return value.toBigInt();
  }

  set time(value: BigInt) {
    this.set("time", Value.fromBigInt(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }
}

export class Exchange extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Exchange entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Exchange entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Exchange", id.toString(), this);
  }

  static load(id: string): Exchange | null {
    return store.get("Exchange", id) as Exchange | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get fundAddress(): Bytes {
    let value = this.get("fundAddress");
    return value.toBytes();
  }

  set fundAddress(value: Bytes) {
    this.set("fundAddress", Value.fromBytes(value));
  }

  get sourceAsset(): Bytes {
    let value = this.get("sourceAsset");
    return value.toBytes();
  }

  set sourceAsset(value: Bytes) {
    this.set("sourceAsset", Value.fromBytes(value));
  }

  get sourceAmount(): BigInt {
    let value = this.get("sourceAmount");
    return value.toBigInt();
  }

  set sourceAmount(value: BigInt) {
    this.set("sourceAmount", Value.fromBigInt(value));
  }

  get dstAsset(): Bytes {
    let value = this.get("dstAsset");
    return value.toBytes();
  }

  set dstAsset(value: Bytes) {
    this.set("dstAsset", Value.fromBytes(value));
  }

  get time(): BigInt {
    let value = this.get("time");
    return value.toBigInt();
  }

  set time(value: BigInt) {
    this.set("time", Value.fromBigInt(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }
}

export class Pool extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Pool entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Pool entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Pool", id.toString(), this);
  }

  static load(id: string): Pool | null {
    return store.get("Pool", id) as Pool | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get fundAddress(): Bytes {
    let value = this.get("fundAddress");
    return value.toBytes();
  }

  set fundAddress(value: Bytes) {
    this.set("fundAddress", Value.fromBytes(value));
  }

  get name(): string {
    let value = this.get("name");
    return value.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get manager(): Bytes | null {
    let value = this.get("manager");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set manager(value: Bytes | null) {
    if (value === null) {
      this.unset("manager");
    } else {
      this.set("manager", Value.fromBytes(value as Bytes));
    }
  }

  get managerName(): string {
    let value = this.get("managerName");
    return value.toString();
  }

  set managerName(value: string) {
    this.set("managerName", Value.fromString(value));
  }

  get totalSupply(): BigInt {
    let value = this.get("totalSupply");
    return value.toBigInt();
  }

  set totalSupply(value: BigInt) {
    this.set("totalSupply", Value.fromBigInt(value));
  }

  get deposits(): Array<string> {
    let value = this.get("deposits");
    return value.toStringArray();
  }

  set deposits(value: Array<string>) {
    this.set("deposits", Value.fromStringArray(value));
  }

  get withdrawals(): Array<string> {
    let value = this.get("withdrawals");
    return value.toStringArray();
  }

  set withdrawals(value: Array<string>) {
    this.set("withdrawals", Value.fromStringArray(value));
  }

  get exchanges(): Array<string> {
    let value = this.get("exchanges");
    return value.toStringArray();
  }

  set exchanges(value: Array<string>) {
    this.set("exchanges", Value.fromStringArray(value));
  }

  get assets(): Array<string> {
    let value = this.get("assets");
    return value.toStringArray();
  }

  set assets(value: Array<string>) {
    this.set("assets", Value.fromStringArray(value));
  }
}

export class Asset extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Asset entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Asset entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Asset", id.toString(), this);
  }

  static load(id: string): Asset | null {
    return store.get("Asset", id) as Asset | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }

  get balance(): BigInt {
    let value = this.get("balance");
    return value.toBigInt();
  }

  set balance(value: BigInt) {
    this.set("balance", Value.fromBigInt(value));
  }

  get value(): BigInt {
    let value = this.get("value");
    return value.toBigInt();
  }

  set value(value: BigInt) {
    this.set("value", Value.fromBigInt(value));
  }
}
