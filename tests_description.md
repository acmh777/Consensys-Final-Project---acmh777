Tests used on the contract:

1) Can the contract be successfully deployed: This simple test is basically for convention and to make sure the contract as written can always be successfully deployed - whether it is to a development chain, testnet ot mainnet. We test this in the standard way, making sure that the deployed contract instance is not undefined.

2) Can new proofs be created with state variables being correctly updated: This tests the basic functionality of the contract, checking whether proofs are created correctly, and our proof counter is updated accordingly. We test this by calling the "createProof" contract with dummy inputs, and then checking that counter has updated and the "proofs" mapping object contains our new proof. 

3) Are new proofs associated with the correct address: This test is again to test the basic functionality of the contract and make sure new proofs are associated with the correct address. If this is not the case then the contract is fatally defective. We test this by checking whether a created proof is associated with the account that made it by using a getter function to get the creator address and checking the equivalency between   

4) The contract cannot be destroyed by anyone but the contract owner: We want to make sure that the contract can only be destroyed by the owner, otherwise the contract is at risk of unexpectedly being destroyed. We do this by attempting to destroy the contract with a non-owner address.

5) The contract can be successfully destroyed by the contract owner: In addition to making sure non-owners cant destroy the contract, we need to make sure that when the owner does actually destroy the contract, the operation is successful. 

6) Ether cannot be accidently sent to the contract: This is just for good measure to make sure the fallback is working correctly, and that users cannot accidently send ETH to the contract resulting in loss of funds. If for some reason the fallback did not work and users could accidently send funds to the contract, alteration to the code would have to be made to prevent this. We test this by attempting to send ETH to the contract and then checking the balance of the contract aferwards. 

7) The contract owner can activate the circuit breaker: We want to make sure the owner is actually able to activate the circuit breaker by making the boolean "stopped" true. If the owner cannot do this then the circuit breaker does not work as intended. We test this by simply having the owner call the "stopContract()" function and checking if the "stopped" variable is actually set to true.

8) The contract owner can de-activate the circuit breaker: Conversely, we want to make sure the owner can turn the circuit breaker off. We test this by turning it on, then off again and checking to make sure "stopped" is set to false.

9) New proofs cannot be created while the circuit breaker is active: When the circuit breaker is active, we want to make sure that new proofs cannot be created and that the contract really has been stopped. We test this by activating the circuit breaker, attempting to make a new proof then checking whether it was created.

10) The circuit breaker can only be altered by the owner: Finally, we want to make sure that non-owners cannot tamper with the circuit breaker and interfere with the contract. We test this by attempting to alter the circuit breaker with a non-owner address and checking to see if the "stopped" variable changed. 
