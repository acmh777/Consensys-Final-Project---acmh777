import React, { Component } from 'react';
import ETH from '../ETH.png';
import './App.css';
import Web3 from 'web3';
import ProofOfExistence from '../abis/ProofOfExistence.json'

// IPFS public client from Infura, we will need this to store files on IPFS and get file hashes
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({host: 'ipfs.infura.io', port: 5001, protocol: 'https'} ) // (the default in Node.js)

class App extends Component {

  // Also create state variables for user inputs for creating proofs - ipfs hash, a title, a description, contract and account addresses, etc.  
  constructor(props) {
    super(props);
    this.state = {
      ipfsHash: "",
      buffer: null,
      fileTitle: "",
      fileDescription: "",
      web3: null,
      account: null,
      contract: null,
      contractAddress: null,
      userProofs: null,
    };
    //this.onChange = this.onChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this); 
    this.handleDescChange = this.handleDescChange.bind(this); 
  }
  
  // 
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  // This is where we will interact with our smart contract and the ETH blockchain
  async loadBlockchainData() {
    const web3 = window.web3
    // Load currently selected metamask account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    console.log("Detected account:")
    console.log(this.state.account)
    // Load current network ID 
    const networkId = await web3.eth.net.getId()
    console.log("Detected Network ID:")
    console.log(networkId)
    const networkData = ProofOfExistence.networks[networkId]
    console.log(networkData)
    // If network ID found, then we can find the contract and set it as the current contract state 
    if (networkData) {
      const abi = ProofOfExistence.abi
      const address = networkData.address
      this.setState({contractAddress: address})
      var contract = new web3.eth.Contract(abi, address)
      this.setState({contract})
      console.log("Contract:")
      console.log(contract.address)
    } else {
      window.alert("Smart contract not deployed to selected network!")
    }
  }

  // function to connect web3
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert('Please connect to Metamask')
    }
  }

  // function to process file so it can be stored on IPFS
  captureFile = (event) => {
    event.preventDefault() 
    console.log('file captured')
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file) 
    reader.onloadend = () => {
      this.setState({buffer: Buffer(reader.result)})
    }
  }

  // Funtion to submit file to IPFS and create proof on blockchain
  onSubmit = (event) => {
    event.preventDefault() 
    console.log('submitting form')
    ipfs.add(this.state.buffer, (error, result) => {
      console.log("IPFS result", result)
      const fileHash = result[0].hash
      this.setState({ipfsHash: fileHash})
      if(error){
        console.error(error)
        return
      }
    })
    // store file on blockchain, we will use our constructor states to input data into the createProof function.
    console.log(this.state.ipfsHash)
    console.log(this.state.fileTitle)
    console.log(this.state.fileDescription)
    // Here we call the actual smart contract function "createProof" using our input data on our frontend
    this.state.contract.methods.createProof(this.state.ipfsHash, this.state.fileTitle, this.state.fileDescription).send({from: this.state.account}).on('error', console.error);
    var accountProofs = this.state.contract.getPastEvents("proofCreated",
    {          
        filter: {userAddress: this.state.account},                     
        fromBlock: 0,     
        toBlock: 'latest'          
    }).then((response) => {
      this.setState({
        userProofs: response})
        });
    
    //.then(events => console.log(events)).catch((err) => console.error(err));

    this.setState({userProofs:accountProofs})
    console.log("account proofs:")
    console.log(accountProofs)
    console.log("user proofs:")
    console.log(this.state.userProofs)
  }

  handleTitleChange = (e) => {
    this.setState({fileTitle: e.target.value});
    // this updates the state as the user types into the input
    // which also causes a re-render of this component
    // with the newly update state
  }

  handleDescChange = (e) => {
    this.setState({fileDescription: e.target.value});
    // this updates the state as the user types into the input
    // which also causes a re-render of this component
    // with the newly update state
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="https://consensys.net/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Proof of Existence
          </a>
          <ul className = "navbar-nav px3">
            <li className = "nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className = "text-white" > Current address: {this.state.account} </small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="https://consensys.net"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                <img src={ETH} className="HomeImage" alt="HomeImage" />
                </a>
                <h1>Proof of Existence App</h1>
                <p>
                  Proof of Existence is a decentralized application allowing users to prove the existence of data they upload at a specific point in time. The app uses IPFS to store the actual file, and the Ethereum blockchain to store the 
                  IPFS file hash as well as ancillary data associated with the file, such as file titles and descriptions. The app can read and display stored data from the blockchain to allow to user to view proofs they have created.
                </p>
                <h2>Add Proof</h2>
                <p>
                  Attach a file to store on IPFS:
                </p>
                <form onSubmit = {this.onSubmit}>
                  <input type = 'file' onChange = {this.captureFile}/>
                  <input type='submit'/>
                <div>
                  Input your file title here:
                  <input type="text" 
                  id={"question" + this.state.fileTitle}
                  //defaultValue={this.state.fileTitle} 
                  placeholder="Title (20 characters)"
                  onChange={this.handleTitleChange}  // to handle the change
                  value={this.state.fileTitle}/>  
                </div>
                <div>
                  Input your file description here:
                  <input type="text" 
                  id={"question" + this.state.fileDescription}
                  //defaultValue={this.state.fileDescription} 
                  placeholder="Description (40 characters)"
                  onChange={this.handleDescChange}  // to handle the change
                  value={this.state.fileDescription}/>  
                </div>
                </form>
                </div>
                <form componentWillMount = {this.componentWillMount}>
                  <input type = 'submit' value = 'Connect to Metamask'/>
                </form>
                
            </main>
          </div>
          <h1>Existing User Proofs:</h1>
          <ul>
            {JSON.stringify(this.state.userProofs)}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
