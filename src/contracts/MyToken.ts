import { u128, u256 } from 'as-bignum/assembly';
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
export class MyToken extends OP_20 {
    constructor() {
        const maxSupply: u256 = u128.fromString('100000000000000000000000000').toU256();
        const decimals: u8 = 18;
        const name: string = 'MyToken';
        const symbol: string = 'TOKEN';

        super(maxSupply, decimals, name, symbol);
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
