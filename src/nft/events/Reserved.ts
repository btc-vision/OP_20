import { u256 } from '@btc-vision/as-bignum/assembly';
import {
    Address,
    ADDRESS_BYTE_LENGTH,
    BOOLEAN_BYTE_LENGTH,
    BytesWriter,
    NetEvent,
    U256_BYTE_LENGTH,
    U64_BYTE_LENGTH,
} from '@btc-vision/btc-runtime/runtime';

@final
export class ReservationCreatedEvent extends NetEvent {
    constructor(user: Address, amount: u256, block: u64, feePaid: u64) {
        const eventData: BytesWriter = new BytesWriter(
            ADDRESS_BYTE_LENGTH + U256_BYTE_LENGTH + U64_BYTE_LENGTH * 2,
        );
        eventData.writeAddress(user);
        eventData.writeU256(amount);
        eventData.writeU64(block);
        eventData.writeU64(feePaid);

        super('ReservationCreated', eventData);
    }
}

@final
export class ReservationClaimedEvent extends NetEvent {
    constructor(user: Address, amount: u256, firstTokenId: u256) {
        const eventData: BytesWriter = new BytesWriter(ADDRESS_BYTE_LENGTH + U256_BYTE_LENGTH * 2);
        eventData.writeAddress(user);
        eventData.writeU256(amount);
        eventData.writeU256(firstTokenId);

        super('ReservationClaimed', eventData);
    }
}

@final
export class ReservationExpiredEvent extends NetEvent {
    constructor(block: u64, amountRecovered: u256) {
        const eventData: BytesWriter = new BytesWriter(U64_BYTE_LENGTH + U256_BYTE_LENGTH);
        eventData.writeU64(block);
        eventData.writeU256(amountRecovered);

        super('ReservationExpired', eventData);
    }
}

@final
export class MintStatusChangedEvent extends NetEvent {
    constructor(enabled: boolean) {
        const eventData = new BytesWriter(BOOLEAN_BYTE_LENGTH);
        eventData.writeBoolean(enabled);

        super('MintStatusChanged', eventData);
    }
}
