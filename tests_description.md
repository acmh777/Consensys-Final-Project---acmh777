Tests used on the contract are written in javascript using the chai assertion library. Here is a list of tests and their purpose:

###### 1) Can the contract be successfully deployed: 
This simple test is basically for convention and to make sure the contract as written can always be successfully deployed - whether it is to a development chain, testnet or mainnet. We test this in the standard way, making sure that the deployed contract instance is not undefined.

###### 2) Contract can not take larger title and description inputs than expected: 
This test is to make sure the "createProof()" function cannot take larger than expected inputs. We want to verify this to ensure that users cannot create proofs with overly long inputs. This is tested by simply trying to call the function with failing inputs and making sure our proof counter has not been iterated.

###### 3) Can new proofs be created with state variables being correctly updated: 
This tests the basic functionality of the contract, checking whether proofs are created correctly as well as whether our proof counter is updated accordingly. We test this by calling the "createProof" contract with dummy inputs, and then checking that the "proofCount" variable has updated and the "proofs" mapping object contains our new proof. 

###### 4) Are new proofs associated with the correct address: 
This test is again to test the basic functionality of the contract and make sure new proofs are associated with the correct address. If this is not the case then the contract is fatally defective. We test this by checking whether the address that called the "createProof()" function newly created proof is associated with the account that made it by using a getter function to get the creator address and checking the equivalency between   

###### 5) The contract cannot be destroyed by anyone but the contract owner: 
We want to make sure that the contract can only be destroyed by the owner, otherwise the contract is at risk of unexpectedly being destroyed. We do this by attempting to destroy the contract with the "destroy()" function as a non-owner address, and verifying that the revert error has occured due to the "onlyOwner" modifier.  

###### 6) The contract can be successfully destroyed by the contract owner: 
In addition to making sure non-owners cant destroy the contract, we need to make sure that if the owner does actually destroy the contract, the operation will be successful. We test this by calling the "destroy()" function as the owner, and verifying that the address before and after destruction are different.  

###### 7) The contract owner can activate the circuit breaker: 
We want to make sure the owner is actually able to activate the circuit breaker by making the boolean "stopped" true. If the owner cannot do this then the circuit breaker does not work as intended. We test this by simply having the owner call the "stopContract()" function and checking if the "stopped" variable has been set to true.

###### 8) The contract owner can de-activate the circuit breaker: 
Conversely, we want to make sure the owner can turn the circuit breaker off. We test this by turning it on with "stopContract()", then off again with "resumeContract()" and checking to make sure the "stopped" state variable is set to false.

###### 9) New proofs cannot be created while the circuit breaker is active: 
When the circuit breaker is active, we want to make sure that new proofs cannot be created and that the contract really has been stopped. We test this by activating the circuit breaker, attempting to create a new proof and then checking whether we have caught a revert error.

###### 10) The circuit breaker cannot be activated by non-owners: 
We want to make sure that non-owners cannot tamper with the contract by activating the circuit breaker. We test this by attempting to activate the circuit breaker with a non-owner address calling "stopcontract()" and checking to see if the "stopped" variable was changed.

###### 11) The circuit breaker cannot be de-activated by non-owners after having been activated: 
Likewise we want to make sure that non-owners cannot de-activate the circuit breaker if the owner does decide to activate it. We test this by first activating the circuit breaker with the owner address, and then with a non-owner address calling "resumecontract()" and making sure the error was caught.

