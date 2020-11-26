Tests used on the contract:

1) Can the contract be successfully deployed: This simple test is basically for convention and to make sure the contract as written can always be successfully deployed - whether it is to a development chain, testnet ot mainnet.

2) Can new proofs be created with state variables being correctly updated: This tests the basic functionality of the contract, checking whether proofs are created correctly, and our proof counter is updated accordingly.

3) Are new proofs associated with the correct address: This test is again to test the basic functionality of the contract and make sure new proofs are associated with the correct address. If this is not the case then the contract is fatally defective.

4) The contract cannot be destroyed by anyone but the contract owner:

5) The contract can be successfully destroyed by the contract owner:

6) Ether cannot be accidently sent to the contract:

7) The contract owner can activate the circuit breaker

8) The contract owner can de-activate the circuit breaker

9) New proofs cannot be created while the circuit breaker is active

10) The circuit breaker can only be altered by the owner:
