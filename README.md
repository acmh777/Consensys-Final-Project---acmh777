# Consensys-Final-Project---acmh777

Overview of the project:

This dApp simply allows users to prove the existence of any piece of data at a specific point in time by combining decentralised file storage on IPFS and record keeping on the Ethereum blockchain. A user will store files on IPFS and have the Ethereum blockchain record the IPFS file hash, file title, file description, time of storage and the address of the user who created it. Below is a visual flow of how it works: 


Directory structure:



How to build and run locally:

1) Clone the repository to a directory of your choosing
2) Start your command line and set your current directory to the project directory
3) Install dependencies with the command: "npm install"
4) We then want to compile and migrate our contracts to be used on a local development blockchain such as ganache-gui
5) In the command line execute: "truffle compile", and then "truffle migrate"
6) In your console execute the command: "npm run start"
7) A local test server will now be running to allow you to interact with the contract
8) Make sure you run the local test server in a browser with metamask installed

How to use:
