var ProofOfExistence = artifacts.require(".src/contracts/ProofOfExistence.sol");

contract('ProofOfExistence_tests', function(accounts){

    it("Can be deployed.", async () => {
        let proofContractInstance = await ProofOfExistence.deployed();
        // Can also do something like this: assert.equal(web3.eth.getCode(proofContractInstance.address), "0x0", "Proof contract has been destroyed.");
        return assert.notEqual(proofContractInstance, undefined, "ProofOfExistence contract has been successfully deployed.");
    });


    it("Contract can not take larger title and description inputs than expected.", async () => {
        let proofContractInstance = await ProofOfExistence.deployed();
        await proofContractInstance.createProof("IPFS Hash", "Title is too long...............", "Description is too long........................");
        let proofCount = await proofContractInstance.getCurrentIndex.call();       
        return assert.equal(proofCount, 0, "Function successfully rejected inputs for being too long");
    });

    it("Contract owner can activate circuit breaker.", async () => {
        let proofContractInstance = await ProofOfExistence.deployed();
        await proofContractInstance.stopContract();
        let stopped = proofContractInstance.stopped.call();
        return assert.isTrue(true, stopped, "Owner can successfully activated circuit breaker.");
    });

    it("Contract owner can de-activate circuit breaker.", async () => {
        let proofContractInstance = await ProofOfExistence.deployed();
        await proofContractInstance.stopContract();
        await proofContractInstance.resumeContract();
        let stopped = proofContractInstance.stopped.call();
        return assert.isFalse(false, stopped, "Owner can successfully de-activate circuit breaker.");        
    });

    it("New proofs cannot be created while circuit breaker active.", async () => {
        let proofContractInstance = await ProofOfExistence.deployed();
        await proofContractInstance.stopContract();
        await proofContractInstance.createProof("IPFS_Hash", "file_title", "file_description");
        let proofCount = await proofContractInstance.getCurrentIndex.call();         
        return assert.equal(proofCount, 0, "New proofs cannot be created while circuit breaker active.");        
    });

    it("Non-contract owner cannot activate circuit breaker.", async () => {
        let proofContractInstance = await ProofOfExistence.deployed();
        await proofContractInstance.stopContract({from: accounts[3]});
        let stopped = proofContractInstance.stopped.call();
        return assert.isFalse(stopped, false, "Non-contract owners cannot activate circuit breaker.");                
    });

    it("Can upload new piece of proof and update total proof count", async () => {
        let proofContractInstance = await ProofOfExistence.deployed();
        await proofContractInstance.createProof("IPFS Hash", "Title", "Description");
        let proofCount = await proofContractInstance.getCurrentIndex.call();       
        return assert.equal(proofCount, 1, "Public proofs mapping contains 1 proof as expected.");
    });

    it("New proofs are associated with the correct owners", async () => {
        let proofContractInstance = await ProofOfExistence.deployed();
        await proofContractInstance.createProof("IPFS Hash2", "Title2", "Description2");
        let proofOwner = await ProofOfExistence.getUserAddress(1);
        return assert.equal(proofOwner, accounts[0], "Owner of the first proof is the correct account.");
    });


    it("Contract can not be destroyed by addresses other than the owner.", async () => {
        let proofContractInstance = await ProofOfExistence.deployed();
        try {
            await proofContractInstance.destroy({from: accounts[1]}); // If this does not throw an error, there is a problem
        } catch(error) {
            // console.log('This is the error returned by trying to destroy a contract as a non-owner: ', error);
            return assert.isTrue(true, "ProofOfExistence contract has not been destroyed by non-owner.");
        }
        return assert.isTrue(false, "ProofOfExistence contract has been destroyed by non-owner.");
    });
        
    it("Contract can be successfully destroyed by the owner.", async () => {
        let proofContractInstance = await ProofOfExistence.deployed();
        await proofContractInstance.destroy();
        return assert.equal(web3.eth.getCode(proofContractInstance.address), "0x0", "ProofOfExistence contract has been destroyed.");
    });

});
