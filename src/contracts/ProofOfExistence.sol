pragma solidity 0.6.0;

// Libraries
import "@openzeppelin/contracts/access/Ownable.sol"; // Using proven code from Open Zeppelin to handle contract destructibility  
import "@openzeppelin/contracts/math/SafeMath.sol"; // Using SafeMath code from Open Zeppelin to avoid integer overflow

/**
 * Proof of Existence Contract
 */

contract ProofOfExistence is Ownable {

    /// Need to declare use of SafeMath to prevent integer overflow
    using SafeMath for uint256;

    /// State variables
    address contractOwner;
    // 
    uint proofCount;
    bool public stopped = false;
    mapping (uint => proofObject) public proofs; // This maps an integer index to proof objects that have been created. This means we can easily store multiple proofs from the same address
    
    /// Enums and struct declarations
    /// New struct proofObject which allows us to create an array of proof objects
    struct proofObject {
        address userAddress;
        string ipfsHash;
        string fileTitle;
        string fileDescription;
        uint fileTimestamp;
        uint proofIndex;
    }

    /// Events
    event proofCreated(address indexed userAddress, string ipfsHash, string fileTitle, 
                        string fileDescription, uint fileTimestamp, uint proofCount); // We make the address indexed so we can use it as a search filter later on

    /// Modifiers
    modifier contractActive { require(!stopped); _; }
    modifier contractInactive { require(stopped); _; }

    /// Functions

    /**
     First we require the length of user descriptive inputs to be limited in length, to prevent poisoned data being sent in transactions. 
     We then iterate the proof count before we make any state changes, in order to prevent vulnerabilities such as reentrancy. 
     We then add a new proof object to our mapping object and emit an event to record the creation of the proof.
     */ 
    function createProof(string memory _ipfsHash, string memory _title, string memory _description) contractActive public {
        require(bytes(_title).length <= 20 && bytes(_description).length <= 40, "Title or description too long."); 
        proofCount = proofCount.add(1); 
        uint _timeStamp = block.timestamp;
        proofs[proofCount] = proofObject(msg.sender, _ipfsHash, _title, _description, _timeStamp, proofCount); 
        emit proofCreated(msg.sender, _ipfsHash,_title, _description, _timeStamp, proofCount);
    }

  /// Getter functions for viewing proof objects
    function getIpfsHash(uint _proofIndex) public view returns (string memory x) {
        return proofs[_proofIndex].ipfsHash;
    }

    function getUserAddress(uint _proofIndex) public view returns (address x) {
        return proofs[_proofIndex].userAddress;
    }

    function getTitle(uint _proofIndex) public view returns (string memory x) {
        return proofs[_proofIndex].fileTitle;
    }   

    function getDescription(uint _proofIndex) public view returns (string memory x) {
        return proofs[_proofIndex].fileDescription;
    }

    function getTimeStamp(uint _proofIndex) public view returns (uint x) {
        return proofs[_proofIndex].fileTimestamp;
    }

    function getCurrentIndex() public view returns (uint x) {
        return proofCount;
    }

  /// Owner only functions 
    function destroy() public onlyOwner {
        selfdestruct(msg.sender);
    }  
    function stopContract() public onlyOwner {
    stopped = true;
    }
    function resumeContract() public onlyOwner {
        stopped = false;
    }
}
