# Deploying an OP_20 Token on OP_NET

![Bitcoin](https://img.shields.io/badge/Bitcoin-000?style=for-the-badge&logo=bitcoin&logoColor=white)
![AssemblyScript](https://img.shields.io/badge/assembly%20script-%23000000.svg?style=for-the-badge&logo=assemblyscript&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![WebAssembly](https://img.shields.io/badge/WebAssembly-654FF0?style=for-the-badge&logo=webassembly&logoColor=white)
![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Prerequisites

- Ensure you have [Node.js](https://nodejs.org/en/download/prebuilt-installer) and [npm](https://www.npmjs.com/) installed on your computer.

## Step-by-Step Guide

### 1. Install OP_WALLET Chrome Extension

- Download and install the [OP_WALLET Chrome Extension](https://github.com/btc-vision/opwallet/blob/master/README.md).
- Set up the wallet and switch the network to Testnet.

### 2. Obtain Testnet Bitcoin

- If you don't have any Testnet3 Bitcoin, get some from [this faucet](https://bitcoinfaucet.uo1.net/).

### 3. Download OP_20 Template Contract

- Clone the [OP_20 template contract](https://github.com/btc-vision/OP_20) repository:
  ```sh
  git clone https://github.com/btc-vision/OP_20.git
  ```

### 4. Edit Token Details

- Open the `OP_20` template repository in your IDE or text editor.
- Navigate to `src/contracts/MyToken.ts` and find lines 15-18:
  ```typescript
        const maxSupply: u256 = u128.fromString('100000000000000000000000000').toU256();
        const decimals: u8 = 18;
        const name: string = 'Testnet';
        const symbol: string = 'TEST';
  ```
- Modify the number for the total supply and the amount of decimals (e.g., for 18 decimals, add 18 zeros).
- Change the name and symbol of the token as desired.

### 5. Install Dependencies and Build

- Open your terminal and navigate to the location of the downloaded OP_20 template folder.
- Run the following commands:
  ```sh
  npm install
  npm run build
  ```
- After building, a `build` folder will be created in the root of the `OP_20` folder. Look for `[nameoftoken].wasm` for the compiled contract.

### 6. Deploy the Token Contract

- Open the OP_WALLET extension and select the "deploy" option.
- Drag your `.wasm` file or click to choose it.
- Send your transaction to deploy the token contract onto Bitcoin with OP_NET.

### 7. Mint Token Supply

- After deploying the token, you will need to mint the supply you wish to have.
- Open your OP_WALLET, click the token in your balance that you just deployed, and select the "mint" option.
- Click "max" or type in the amount of tokens you wish to mint, and then send the transaction.

### 8. Add Liquidity on Motoswap

- Copy the token address from your OP_WALLET.
- Go to [Motoswap](https://motoswap.org/pool) and paste your token address into the top or bottom box.
- Enter the amount of tokens you wish to add to the liquidity pool.
- Select the other side of the liquidity pair (e.g., WBTC) and enter the amount of tokens you wish to add.
- Click "Add Liquidity".

Your token is now tradeable on Motoswap!

## Congrats!

You have successfully deployed and minted your OP_20 token on the Bitcoin blockchain using OP_NET, and added liquidity to make it tradeable on Motoswap.
