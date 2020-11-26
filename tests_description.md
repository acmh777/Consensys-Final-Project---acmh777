Tests used on the contract:

1) Can the contract be successfully deployed: This simple test is basically for convention and to make sure the contract as written can always be successfully deployed - whether it is to a development chain, testnet ot mainnet.

2) Can new proofs be created with state variables being correctly updated: This tests the basic functionality of the contract, checking whether proofs are created correctly, and our proof counter is updated accordingly. We test this by calling the "createProof" contract with dummy inputs, and then checking that counter has updated and the "proofs" contains our new proof.

3) Are new proofs associated with the correct address: This test is again to test the basic functionality of the contract and make sure new proofs are associated with the correct address. If this is not the case then the contract is fatally defective. We test this by 

4) The contract cannot be destroyed by anyone but the contract owner: We want to make sure that the contract can only be destroyed by the owner, otherwise the contract is at risk of unexpectedly being destroyed. We do this by attempting to destroy the contract with a non-owner address.

5) The contract can be successfully destroyed by the contract owner: In addition to making sure non-owners cant destroy the contract, we need to make sure that when the owner does actually destroy the contract, the operation is successful. 

6) Ether cannot be accidently sent to the contract: This is just for good measure to make sure the fallback is working correctly. 

7) The contract owner can activate the circuit breaker: 

8) The contract owner can de-activate the circuit breaker:

9) New proofs cannot be created while the circuit breaker is active:

10) The circuit breaker can only be altered by the owner: Finally, we want to make sure that non-owners cannot tamper with the circuit breaker
