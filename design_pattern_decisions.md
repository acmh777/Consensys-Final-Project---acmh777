Design patterns used:

1) Circuit breaker: A circuit breaker has been implemented to allow the contract owner to stop and start proof creations if need be.

2) Mortality: The contract is mortal, allowing the contract owner to destroy it if need be.


Unused patterns and why:
The withdrawal pattern has not been used as the contract does not have any monetary aspects such as user balances, making it superfluous to implement. There was also the possibility of using a speed bump pattern in order to limit the amount of proof creation from users, as some malicious users may spam proof creations without cessation. However, because there is no economic motivation for users to do so, it is highly unlikely that a speed bump would be necessary and it would probably detract from useability for normal users. The restrict access design pattern could also be used to only allow legitimate users to create proofs by making them send a transaction to become designated user addresses. Again however, like a speed bump this would likely hamper useability to a much larger degree than it would protect malicious users, so it has not been used. 
