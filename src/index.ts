import { ABIRegistry, Blockchain } from '@btc-vision/btc-runtime/runtime';
import { MyToken } from './contracts/MyToken';

export function defineSelectors(): void {
    /** OP_NET */
    ABIRegistry.defineMethodSelector('isAddressOwner');

    /** OP_20 */
    ABIRegistry.defineMethodSelector('allowance');
    ABIRegistry.defineMethodSelector('approve');
    ABIRegistry.defineMethodSelector('balanceOf');
    ABIRegistry.defineMethodSelector('burn');
    ABIRegistry.defineMethodSelector('mint');
    ABIRegistry.defineMethodSelector('transfer');
    ABIRegistry.defineMethodSelector('transferFrom');

    /** Optional */
    ABIRegistry.defineMethodSelector('airdrop');

    // Define your selectors here.
}

// DO NOT TOUCH TO THIS.
Blockchain.contract = () => {
    // ONLY CHANGE THE CONTRACT CLASS NAME.
    const contract = new MyToken();
    contract.onInstantiated();

    // DO NOT ADD CUSTOM LOGIC HERE.

    return contract;
};

// VERY IMPORTANT
export * from '@btc-vision/btc-runtime/runtime/exports';
