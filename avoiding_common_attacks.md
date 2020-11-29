Some vulnerabilities:

#### 1) Integer overflow:
Given that we index proofs using a simple integer counter state variable, there is a chance that we will have a positive integer overflow at some point in the future which would compromise the record of every created proof. To avoid this the safe math contract from the open zepellin library has been used to ensure our counter cannot have a positive overflow. 

#### 2) Re-entracy Attacks:
Re-entrancy is not too much of a concern for this contract as there are no monetary aspects to the contract - i.e. balances cannot be sent to or from the contract.

#### 3) Denial of Service with Block Gas Limit:
Because we do have a mapping object to store proofs caution has been taken to make sure no operations are performed which could cause problems down the line such as for loops. For instance, if contract functionality involved iterating over this mapping object there could be a problem when it holds many proofs and iteration becomes expensive enough to render the proof creation process unusable.

#### 4) Denial of Service with Failed Call:
Because the contract makes no external calls in any user function this isnt so much of a concern.

#### 5) Transaction Ordering and Timestamp Dependence: 
This may be seen as a problem for this contract as it does use the block timestamp as the time for proof creation - not a blockchian independent time gathered from an oracle for example. I made the decision here to forego granular time accuracy for code simplicity and cost. The history of block mining times shows that at worst a proof will be stamped with a time +30 seconds worse than expected, which does not seem too egregious. If block timestamp manipulation could change monetary outcomes associated with the contract this decision would not have been made but the contract does not have any monetary aspects to it other than gas fees for deployment and proof creation. Additionally none of the contract logic depends on accurate time keeping to function properly. The drawback of this decision however is that users who need granular accuracy are unable to use the contract.

#### 6) Unprotected SELFDESTRUCT Instruction:
Open Zepellin's Ownable contract has been used to control access to the self destruct function. Only the owner is able to successfully call this function.


