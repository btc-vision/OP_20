import {
    Address,
    Blockchain,
    BytesWriter,
    Calldata,
    encodeSelector,
    Map,
    OP_20,
    Selector,
} from '@btc-vision/btc-runtime/runtime';
import { u128, u256 } from 'as-bignum/assembly';

@final
export class MyToken extends OP_20 {
    // Could be DeployableOP_20 (if in 1.1.0, enabled on 2024-08-28)
    constructor() {
        const maxSupply: u256 = u128.fromString('100000000000000000000000000').toU256(); // Your max supply.
        const decimals: u8 = 18; // Your decimals.
        const name: string = 'MyToken'; // Your token name.
        const symbol: string = 'TOKEN'; // Your token symbol.

        Blockchain.log(`Deploying ${name} with max supply ${maxSupply.toString()}`); // Example log.
        super(maxSupply, decimals, name, symbol);

        // DO NOT USE TO DEFINE VARIABLE THAT ARE NOT CONSTANT. SEE "solidityLikeConstructor" BELOW.
    }

    // "solidityLikeConstructor" This is a solidity-like constructor. This method will only run once. (if in 1.1.0, enabled on 2024-08-28)
    public onInstantiated(): void {
        if (!this.isInstantiated) {
            super.onInstantiated(); // IMPORTANT.

            //const maxSupply: u256 = u128.fromString('100000000000000000000000000').toU256(); // Your max supply.
            //const decimals: u8 = 18; // Your decimals.
            //const name: string = 'MyToken'; // Your token name.
            //const symbol: string = 'TOKEN'; // Your token symbol.

            //this.instantiate(new OP20InitParameters(maxSupply, decimals, name, symbol));

            // Add your logic here. Eg, minting the initial supply:
            // this._mint(Blockchain.origin, maxSupply);
        }
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

            Blockchain.log(`Airdropping to ${address}`); // Example log.
            this._mint(address, amount);
        }

        const writer: BytesWriter = new BytesWriter(1);
        writer.writeBoolean(true);

        return writer;
    }
}
