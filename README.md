# Consensys-Final-Project---acmh777

Overview of your project:

This Dapp simply allows users to prove the existence of any piece of data at a specific point in time by combining decentralised file storage on IPFS and record keeping on the Ethereum blockchain. A user will store files on IPFS and have the Ethereum blockchain record the IPFS file hash, file title, file description and time of storage. Below is a visual flow of how it works: 


Directory structure:



How to build and run locally:

- Clone the repository to a directory of your choosing
- Start your command line and set your current directory to the project directory
- Install dependencies with the command: "npm install"
- We then want to compile and migrate our contracts to be used on a local development blockchain such as ganache-gui
- In the command line execute: "truffle compile", and then "truffle migrate"
- In your console execute the command: "npm run start"
- A local test server will now be running to allow you to interact with the contract
