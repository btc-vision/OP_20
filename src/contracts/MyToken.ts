import { u256 } from '@btc-vision/as-bignum/assembly';
import {
    Address,
    Blockchain,
    BOOLEAN_BYTE_LENGTH,
    BytesWriter,
    Calldata,
    DeployableOP_20,
    encodeSelector,
    Map,
    OP20InitParameters,
    Selector,
} from '@btc-vision/btc-runtime/runtime';

@final
export class MyToken extends DeployableOP_20 {
    public constructor() {
        super();

        // IMPORTANT. THIS WILL RUN EVERYTIME THE CONTRACT IS INTERACTED WITH. FOR SPECIFIC INITIALIZATION, USE "onDeployment" METHOD.
    }

    // "solidityLikeConstructor" This is a solidity-like constructor. This method will only run once when the contract is deployed.
    public override onDeployment(_calldata: Calldata): void {
        const maxSupply: u256 = u256.fromString('100000000000000000000000000000000000'); // Your max supply.
        const decimals: u8 = 18; // Your decimals.
        const name: string = 'BobTheNoob'; // Your token name.
        const symbol: string = 'BOB'; // Your token symbol.

        this.instantiate(new OP20InitParameters(maxSupply, decimals, name, symbol));

        // Add your logic here. Eg, minting the initial supply:
        //this._mint(Blockchain.tx.origin, maxSupply);
    }

    public override execute(method: Selector, calldata: Calldata): BytesWriter {
        switch (method) {
            case encodeSelector('airdrop(tuple(address,uint256))'):
                return this.airdrop(calldata);
            case encodeSelector('mint(address,uint256)'):
                return this.mint(calldata);
            case encodeSelector('airdropWithAmount(uint256,address[])'):
                return this.airdropWithAmount(calldata);
            default:
                return super.execute(method, calldata);
        }
    }

    private mint(calldata: Calldata): BytesWriter {
        this.onlyDeployer(Blockchain.tx.sender);

        const response = new BytesWriter(BOOLEAN_BYTE_LENGTH);
        const resp = this._mint(calldata.readAddress(), calldata.readU256());

        response.writeBoolean(resp);

        return response;
    }

    private airdrop(calldata: Calldata): BytesWriter {
        this.onlyDeployer(Blockchain.tx.sender);

        const drops: Map<Address, u256> = calldata.readAddressValueTuple();

        const addresses: Address[] = drops.keys();
        for (let i: i32 = 0; i < addresses.length; i++) {
            const address = addresses[i];
            const amount = drops.get(address);

            this._mint(address, amount, false);
        }

        const writer: BytesWriter = new BytesWriter(BOOLEAN_BYTE_LENGTH);
        writer.writeBoolean(true);

        return writer;
    }

    private _optimizedMint(address: Address, amount: u256): void {
        this.balanceOfMap.set(address, amount);
        this._totalSupply.addNoCommit(amount);

        this.createMintEvent(address, amount);
    }

    private airdropWithAmount(calldata: Calldata): BytesWriter {
        this.onlyDeployer(Blockchain.tx.sender);

        const amount: u256 = calldata.readU256();
        const addresses: Address[] = calldata.readAddressArray();

        for (let i: i32 = 0; i < addresses.length; i++) {
            this._optimizedMint(addresses[i], amount);
        }

        this._totalSupply.commit();

        const writer: BytesWriter = new BytesWriter(BOOLEAN_BYTE_LENGTH);
        writer.writeBoolean(true);

        return writer;
    }
}
