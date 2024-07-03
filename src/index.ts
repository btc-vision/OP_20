import { ABIRegistry, Blockchain } from '@btc-vision/btc-runtime/runtime';
import { MyToken } from './contracts/MyToken';

export function defineSelectors(): void {
    /** OP_NET */
    ABIRegistry.defineGetterSelector('address', false);
    ABIRegistry.defineGetterSelector('owner', false);
    ABIRegistry.defineMethodSelector('isAddressOwner', false);

    /** OP_20 */
    ABIRegistry.defineMethodSelector('allowance', false);
    ABIRegistry.defineMethodSelector('approve', true);
    ABIRegistry.defineMethodSelector('balanceOf', false);
    ABIRegistry.defineMethodSelector('burn', true);
    ABIRegistry.defineMethodSelector('mint', true);
    ABIRegistry.defineMethodSelector('transfer', true);
    ABIRegistry.defineMethodSelector('transferFrom', true);

    ABIRegistry.defineGetterSelector('decimals', false);
    ABIRegistry.defineGetterSelector('name', false);
    ABIRegistry.defineGetterSelector('symbol', false);
    ABIRegistry.defineGetterSelector('totalSupply', false);
    ABIRegistry.defineGetterSelector('maxSupply', false);

    /** Optional */
    ABIRegistry.defineMethodSelector('airdrop', true);
}

Blockchain.contract = () => new MyToken();

// VERY IMPORTANT
export * from '@btc-vision/btc-runtime/runtime/exports';
