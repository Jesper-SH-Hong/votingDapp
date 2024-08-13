# Voting Dapp

## What is the Voting Dapp?

The Voting Dapp is a decentralized application built on the Ethereum blockchain that allows users to:

- **Vote for Candidates**: Users can cast their votes for various candidates in a secure and transparent manner.
- **View Real-Time Vote Counts**: The Dapp provides real-time access to the current vote counts, ensuring transparency and immediacy.

By leveraging blockchain technology, the Dapp ensures the integrity and immutability of the voting process, making it tamper-proof and transparent.

## Dependencies

To ensure everything runs smoothly, make sure you have the following dependencies installed:

- **Ganache**: `^7.9.2` - A personal blockchain for Ethereum development that you can use to deploy contracts, develop your applications, and run tests.
- **Solc**: `^0.8.26` - Solidity compiler, which compiles your Solidity smart contracts into bytecode and ABI.
- **Web3**: `^4.11.1` - A library that allows you to interact with the Ethereum blockchain and your smart contracts from JavaScript.

## 1st: Compile

**Objective**: Compile your smart contract to generate the ABI (Application Binary Interface) and BIN (bytecode) files required for deployment and interaction. You can do either

- **Using Terminal**:
  - Run the following command in your terminal to compile the `Voting.sol` smart contract:
    ```bash
    node_modules/.bin/solcjs --bin --abi Voting.sol
    ```
  - This command uses `solcjs`, the JavaScript version of the Solidity compiler, to generate both the ABI and BIN files from your Solidity contract.

- **Using `compile.js` Script**:
  - For a more automated approach, you can use the `compile.js` script in your project. This script is designed to handle the compilation process and is recommended for the latest versions of the Solidity compiler.

## 2nd: Deploy

**Objective**: Deploy the compiled smart contract to your local blockchain or a test network.

- **Note**:
  - When you print out the compiled contract to check the `_jsonInterface`, you'll see that inputs are represented as nested arrays.
  - To ensure proper communication with the frontend and avoid errors such as `'e.match is not a function'`, make sure to include all necessary details in the frontend integration.

## 3rd: index.js

**Objective**: Interact with your deployed smart contract using JavaScript.

- **Checklist**:
  - **Verify Contract Address**: Ensure that the address used in your frontend code is the latest one from the most recent deployment. If you've redeployed the contract or made changes, the address might have changed.
  - **Check Input Types**: Confirm that the types of inputs expected by your smart contract match those being sent from your frontend. Refer to the Solidity file to verify the input types required by your contract functions.
