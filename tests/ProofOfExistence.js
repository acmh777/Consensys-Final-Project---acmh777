
var ProofOfExistence = artifacts.require("ProofOfExistence");

contract('ProofOfExistence_tests', function(accounts){

    it("Can be deployed.", async () => {
        let proofContractInstance = await ProofOfExistence.deployed();
        return assert.notEqual(proofContractInstance, undefined, "ProofOfExistence contract has been successfully deployed.");
    });

    it("Contract can not take larger title and description inputs than expected.", async () => {
        let proofContractInstance = await ProofOfExistence.deployed();
        try { 
            await proofContractInstance.createProof("IPFS Hash", "Title is too long...............", "Description is too long........................");
            } catch(error) {
                return assert.equal(await proofContractInstance.getCurrentIndex.call(), 0, "Function successfully rejected inputs for being too long.");
            }
        return assert.equal(await proofContractInstance.getCurrentIndex.call(), 1, "Function has unsuccessfully rejected inputs for being too long.");
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

    it("New proofs cannot be created while circuit breaker is active.", async () => {
        let proofContractInstance = await ProofOfExistence.deployed();
        await proofContractInstance.stopContract();
        try {
            await proofContractInstance.createProof("IPFS_Hash", "file_title", "file_description");
        } catch(error) {
            return assert.equal(await proofContractInstance.getCurrentIndex.call(), 0, "New proofs cannot be created while circuit breaker active."); 
        }
        return assert.equal(await proofContractInstance.getCurrentIndex.call(), 1, "New proofs can be created while circuit breaker active.");        
    });

    it("Non-contract owner cannot activate circuit breaker.", async () => {
        let proofContractInstance = await ProofOfExistence.deployed();
        try {
            await proofContractInstance.stopContract({from: accounts[3]});
        } catch(error) {
            return assert.isFalse(false, await proofContractInstance.stopped.call(), "Non-contract owners cannot activate circuit breaker.");
        }
        return assert.isFalse(false, await proofContractInstance.stopped.call(), "Non-contract owners can activate circuit breaker.");                
    });

    it("Can upload new piece of proof and update total proof count", async () => {
        let proofContractInstance = await ProofOfExistence.deployed();
        await proofContractInstance.resumeContract();
        await proofContractInstance.createProof("IPFS_Hash", "Title", "Description");
        let proofCount = await proofContractInstance.getCurrentIndex.call();       
        return assert.equal(proofCount, 1, "Public proofs mapping contains 1 proof as expected.");
    });

    it("New proofs are associated with the correct owners", async () => {
        let proofContractInstance = await ProofOfExistence.deployed();
        await proofContractInstance.resumeContract();
        await proofContractInstance.createProof("IPFS_Hash", "Title", "Description", {from:accounts[0]});
        return assert.equal(await proofContractInstance.getUserAddress(1), accounts[0], "Owner of the first proof is the correct account."); 
    });

    it("Contract cannot be destroyed by addresses other than the owner.", async () => {
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
        let addressBefore = await web3.eth.getCode(proofContractInstance.address);
        await proofContractInstance.destroy({ from: accounts[0] });
        return assert.notEqual(addressBefore, await web3.eth.getCode(proofContractInstance.address), "ProofOfExistence contract has been destroyed by the owner.");
    });

});
