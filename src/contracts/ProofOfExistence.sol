// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.6.0;

/// Imports
import "@openzeppelin/contracts/access/Ownable.sol"; // Using proven code from Open Zeppelin to handle contract destructibility  
import "@openzeppelin/contracts/math/SafeMath.sol"; // Using SafeMath code from Open Zeppelin to avoid integer overflow

/// @title A proof of existence contract to record data related to user uploaded files stored on IPFS
/// @author acmh777
/// @notice This contract 
/// @dev All function calls are currently implemented without side effects

contract ProofOfExistence is Ownable {

    /// @notice Need to declare use of SafeMath to prevent integer overflow
    using SafeMath for uint256;

    /// State variables
   /// @notice An integer variable which acts as an index for our proof objects. Is iterated by 1 everytime a new proof created. 
    uint proofCount;
    /// @notice A boolean variable for the circuit breaker.
    bool public stopped = false;
    /// @notice A mapping type of an integer to our enum "proofObject". This object will store all proofs that are created.
    mapping (uint => proofObject) public proofs; 
    
    /// Enums and struct declarations
    /// @notice New struct proofObject which allows us to create an array of proof objects
    struct proofObject {
        address userAddress;
        string ipfsHash;
        string fileTitle;
        string fileDescription;
        uint fileTimestamp;
        uint proofIndex;
    }

    /// Events
    /// @notice An event for logging proof creations. The address indexed so we can use it as a search filter later on.
    event proofCreated(address indexed userAddress, string ipfsHash, string fileTitle, 
                        string fileDescription, uint fileTimestamp, uint proofCount);

   /// Modifiers
   /// @notice This modifier checks to see if the circuit breaker is off by checking if "stopped" is not true.
    modifier contractActive { require(!stopped); _; }
    /// @notice This modifier checks to see if the circuit breaker is on by checking if "stopped" is true.
    modifier contractInactive { require(stopped); _; }

    /// Functions
    /// @notice Limited length user inputs are used to create a proof of existence record for a given piece of data. The record is indexed with our proofCount variable and block timestamp.
    /// @param _ipfshash is the hash that can be used to access the file on IPFS, _title and _description are recorded to describe the file. 
    /// @return No return, variables are merely stored to the proofs mapping object and an event is emitted.
    function createProof(string memory _ipfsHash, string memory _title, string memory _description) contractActive public {
        require(bytes(_title).length <= 20 && bytes(_description).length <= 40, "Title or description too long."); 
        proofCount = proofCount.add(1); 
        uint _timeStamp = block.timestamp;
        proofs[proofCount] = proofObject(msg.sender, _ipfsHash, _title, _description, _timeStamp, proofCount); 
        emit proofCreated(msg.sender, _ipfsHash,_title, _description, _timeStamp, proofCount);
    }

   /// @notice Getter function to retreive the IPFS hash of any proof mapped to a chosen integer index
   /// @param proofCount
    function getIpfsHash(uint _proofIndex) public view returns (string memory x) {
        return proofs[_proofIndex].ipfsHash;
    }

   /// @notice Getter function to retreive the user address of any proof mapped to a chosen integer index
   /// @param proofCount
     function getUserAddress(uint _proofIndex) public view returns (address x) {
        return proofs[_proofIndex].userAddress;
    }
    
   /// @notice Getter function to retreive the title of any proof mapped to a chosen integer index
   /// @param proofCount
    function getTitle(uint _proofIndex) public view returns (string memory x) {
        return proofs[_proofIndex].fileTitle;
    }   

   /// @notice Getter function to retreive the description of any proof mapped to a chosen integer index
   /// @param proofCount
    function getDescription(uint _proofIndex) public view returns (string memory x) {
        return proofs[_proofIndex].fileDescription;
    }

   /// @notice Getter function to retreive the timestamp of any proof mapped to a chosen integer index
   /// @param proofCount
    function getTimeStamp(uint _proofIndex) public view returns (uint x) {
        return proofs[_proofIndex].fileTimestamp;
    }

   /// @notice Getter function to retreive the current proof count
    function getCurrentIndex() public view returns (uint x) {
        return proofCount;
    }

    /// Owner only functions 
    /// @notice function to destroy the contract - only callable by the owner.
    function destroy() public onlyOwner {
        selfdestruct(msg.sender);
    }  
    
    /// @notice stop contract function for turning on circuit breaker.
    function stopContract() public onlyOwner {
    stopped = true;
    }
    
    /// @notice resume contract function for turning off circuit breaker.
    function resumeContract() public onlyOwner {
        stopped = false;
    }
}
