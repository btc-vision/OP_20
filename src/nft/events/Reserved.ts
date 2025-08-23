import { u256 } from '@btc-vision/as-bignum/assembly';
import {
    Address,
    ADDRESS_BYTE_LENGTH,
    BytesWriter,
    NetEvent,
    U256_BYTE_LENGTH,
    U64_BYTE_LENGTH,
} from '@btc-vision/btc-runtime/runtime';

@final
export class ReservationCreatedEvent extends NetEvent {
    constructor(user: Address, amount: u256, block: u64, feePaid: u64) {
        const data: BytesWriter = new BytesWriter(
            ADDRESS_BYTE_LENGTH + U256_BYTE_LENGTH + U64_BYTE_LENGTH * 2,
        );
        data.writeAddress(user);
        data.writeU256(amount);
        data.writeU64(block);
        data.writeU64(feePaid);

        super('ReservationCreated', data);
    }
}

@final
export class ReservationClaimedEvent extends NetEvent {
    constructor(user: Address, amount: u256, firstTokenId: u256) {
        const data: BytesWriter = new BytesWriter(ADDRESS_BYTE_LENGTH + U256_BYTE_LENGTH * 2);
        data.writeAddress(user);
        data.writeU256(amount);
        data.writeU256(firstTokenId);

        super('ReservationClaimed', data);
    }
}

@final
export class ReservationExpiredEvent extends NetEvent {
    constructor(block: u64, amountRecovered: u256) {
        const data: BytesWriter = new BytesWriter(U64_BYTE_LENGTH + U256_BYTE_LENGTH);
        data.writeU64(block);
        data.writeU256(amountRecovered);

        super('ReservationExpired', data);
    }
}

@final
export class MintStatusChangedEvent extends NetEvent {
    constructor(enabled: boolean) {
        const writer = new BytesWriter(1);
        writer.writeBoolean(enabled);

        super('MintStatusChanged', writer);
    }
}
