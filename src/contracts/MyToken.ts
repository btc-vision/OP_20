import { u256 } from '@btc-vision/as-bignum/assembly';
import {
    Address,
    AddressMap,
    Blockchain,
    BOOLEAN_BYTE_LENGTH,
    BytesWriter,
    Calldata,
    DeployableOP_20,
    OP20InitParameters,
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
        const name: string = 'RELEASE'; // Your token name.
        const symbol: string = 'WEN'; // Your token symbol.

        this.instantiate(new OP20InitParameters(maxSupply, decimals, name, symbol));

        // Add your logic here. Eg, minting the initial supply:
        // this._mint(Blockchain.tx.origin, maxSupply);
    }

    /**
     * Mints tokens to the specified address.
     *
     * @param calldata Calldata containing an `Address` and a `u256` to mint to.
     */
    private _optimizedMint(address: Address, amount: u256): void {
        this.balanceOfMap.set(address, amount);
        this._totalSupply.addNoCommit(amount);

        this.createMintEvent(address, amount);
    }

    @method(
        {
            name: 'address',
            type: ABIDataTypes.ADDRESS,
        },
        {
            name: 'amount',
            type: ABIDataTypes.UINT256,
        },
    )
    @returns({
        name: 'success',
        type: ABIDataTypes.BOOL,
    })
    @emit('Mint')
    public mint(calldata: Calldata): BytesWriter {
        this.onlyDeployer(Blockchain.tx.sender);

        const response = new BytesWriter(BOOLEAN_BYTE_LENGTH);
        const resp = this._mint(calldata.readAddress(), calldata.readU256());

        response.writeBoolean(resp);

        return response;
    }

    /**
     * Mints tokens to the specified addresses.
     *
     * @param calldata Calldata containing an `AddressMap<Address, u256>` to mint to.
     */
    @method({
        name: 'addressAndAmount',
        type: ABIDataTypes.ADDRESS_UINT256_TUPLE,
    })
    @returns({
        name: 'success',
        type: ABIDataTypes.BOOL,
    })
    @emit('Mint')
    public airdrop(calldata: Calldata): BytesWriter {
        this.onlyDeployer(Blockchain.tx.sender);

        const addressAndAmount: AddressMap<u256> = calldata.readAddressMapU256();

        const addresses: Address[] = addressAndAmount.keys();
        for (let i: i32 = 0; i < addresses.length; i++) {
            const address = addresses[i];
            const amount = addressAndAmount.get(address);

            this._optimizedMint(address, amount);
        }

        this._totalSupply.commit();

        const writer: BytesWriter = new BytesWriter(BOOLEAN_BYTE_LENGTH);
        writer.writeBoolean(true);

        return writer;
    }
}
