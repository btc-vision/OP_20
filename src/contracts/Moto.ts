import { u256 } from 'as-bignum/assembly';
import {
    Address,
    BytesWriter,
    Calldata,
    encodeSelector,
    Map,
    OP_20,
    Selector,
} from '@btc-vision/btc-runtime/runtime';

@final
export class Moto extends OP_20 {
    constructor() {
        super(u256.fromU64(2100000000000000), 8, 'Moto', 'MOTO');
    }

    public override callMethod(method: Selector, calldata: Calldata): BytesWriter {
        switch (method) {
            case encodeSelector('airdrop'):
                return this.airdrop(calldata);
            default:
                return super.callMethod(method, calldata);
        }
    }

    private airdrop(calldata: Calldata): BytesWriter {
        const drops: Map<Address, u256> = calldata.readAddressValueTuple();

        const addresses: Address[] = drops.keys();
        for (let i: i32 = 0; i < addresses.length; i++) {
            const address = addresses[i];
            const amount = drops.get(address);

            this._mint(address, amount);
        }

        const writer: BytesWriter = new BytesWriter();
        writer.writeBoolean(true);

        return writer;
    }
}
