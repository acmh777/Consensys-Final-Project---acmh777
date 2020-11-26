Some vulnerabilities the contract may have:


1) Integer overflow:
Given that we index proofs using a simple integer counter state variable, there is a chance that we will have a positive integer overflow at some point in the future which would compromise the record of every created proof. To avoid this the safe math contract from the open zepellin library has been used to ensure our counter cannot have a positive overflow. 

2) Re-entracy Attacks:
Re-entrancy is not too much of a concern for this contract as there are no monetary aspects to the contract - i.e. balances cannot be 

3) Denial of Service with Block Gas Limit:
Because differing sizes of inputs to our createProof function will consume different amounts of gas, it is conceivable that someone could call . This is incredibly unlikely, but it will also protect users from accidently creating costly proofs with larger than intended inputs.

4) Transaction Ordering and Timestamp Dependence: This may be seen as a problem for this contract as it does use the block timestamp as the time for proof creation - not a blockchian independent time gathered from an oracle. I made the decision here to forego granular time accuracy for code simplicity and cost. The history of block mining times shows that at worst a proof will be stamped with a time +30 seconds worse than expected, which does not seem too egregious. If block timestamp manipulation could change monetary outcomes associated with the contract this decision would not have been made but the contract does not have any monetary aspects to it other than gas fees for deployment and proof creation.
