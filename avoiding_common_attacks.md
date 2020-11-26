Some vulnerabilities the contract may have:


1) Integer overflow:
Given that we index proofs using a simple integer counter state variable, there is a chance that we will have a positive integer overflow at some point in the future, which would compromise the record of every created proof. To avoid this the safe math contract from the open zepellin library has been used to ensure our counter cannot overflow. 

2) Re-entracy Attacks:
Re-entrancy is not too much of a concern for this contract as 

3) Denial of Service with Block Gas Limit:
Because differing sizes of inputs to our createProof function will consume different amounts of gas, it is conceivable that 
