# Deploying an OP_20 Token on OP_NET

![Bitcoin](https://img.shields.io/badge/Bitcoin-000?style=for-the-badge&logo=bitcoin&logoColor=white)
![AssemblyScript](https://img.shields.io/badge/assembly%20script-%23000000.svg?style=for-the-badge&logo=assemblyscript&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![WebAssembly](https://img.shields.io/badge/WebAssembly-654FF0?style=for-the-badge&logo=webassembly&logoColor=white)
![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Prerequisites

- Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your computer.

## Step-by-Step Guide

### 1. Install OP_WALLET Chrome Extension

- Download and install the [OP_WALLET Chrome Extension](#).
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
- Navigate to `src/contracts/MyToken.ts` and find line 15:
  ```typescript
  super(u128.fromString('100000000000000000000000000').toU256(), 18, 'MyToken', 'TOKEN');
  ```
- Modify the number for the total supply and the amount of decimals (e.g., for 18 decimals, add 18 zeros).
- Change the name and ticker of the token as desired.

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

### 7 (optional). Retrieve Contract Address Manually

- After the deploy transaction has confirmed, go to:
  ```
  https://testnet.opnet.org/api/v1/transaction/by-hash?hash=[the_tx_hash_of_your_deploy]
  ```
- Click "pretty print" and search for `contractAddress` near the top.
- Copy the contract address and go to "Import Tokens" in the OP_WALLET.
- Paste the contract address to see the tokens in your wallet.

## Congrats!

You have successfully deployed a token contract on the Bitcoin blockchain using OP_NET. You can now go to Motoswap.org in order to add liquidity and begin swapping your OP_20 token on Bitcoin!
