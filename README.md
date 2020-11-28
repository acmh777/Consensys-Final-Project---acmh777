# Consensys-Final-Project---acmh777

## Overview of the project:

This dApp simply allows users to prove the existence of any piece of data at a specific point in time by combining decentralised file storage on IPFS and record keeping on the Ethereum blockchain. A user will store files on IPFS and have the Ethereum blockchain record the IPFS file hash, file title, file description, time of storage and the address of the user who created it. Below is a visual flow of how it works: 


## Directory structure:



## How to build and run locally:

1) Clone the repository to a directory of your choosing.
2) Start your command line and set your current directory to the project directory.
3) Install dependencies with the command: "npm install".
4) We then want to compile and migrate our contracts to be used on a local development blockchain such as ganache-gui. Open ganache-gui and create a new workspace, adding the project truffle-config to the wrokspace. 
5) In the command line execute: "truffle compile", and then "truffle migrate".
6) In your console execute the command: "npm run start".
7) A local test server and development blockchain will now be running to allow you to interact with the contract (make sure you run the local test server in a browser with metamask installed).

## How to test:
In your command prompt simply set your current directory to the project directory and run the command: "truffle test ./tests/ProofOfExistence.js" 
After running this command you should get the following result:
![passed_tests](https://github.com/acmh777/Consensys-Final-Project---acmh777/blob/main/readme_images/passed_tests.PNG =250x)


## How to use:
