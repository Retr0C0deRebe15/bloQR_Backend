const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
require('dotenv').config();
const contractABI = require('./Abi'); 
const Web3 = require('web3');
const path = require('path');
alert('hi')
const app = express();
//const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');

// Add this line to intercept and log requests
axios.interceptors.request.use(request => {
  console.log(request);
  return request;
});

app.get('/pinFileToIPFS', async (req, res) => {
  try {
    console.log(contractABI)
    let data = new FormData();
    data.append('file', fs.createReadStream('./public/assets/cyclone.png'));
    data.append('pinataMetadata', '{"name": "pinnie"}');

    const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', data, {
      headers: {
        'Authorization': `Bearer ${process.env.PINATA_JWT}`
      }
    });

    console.log(response.data);
    console.log(`View the file here: https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`);
    
    res.send(`File pinned successfully. View the file here: https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while pinning the file to IPFS.");
  }
});

// app.get('/fetchNFTMetadata/:contractAddress/:tokenId', async (req, res) => {
//     try {
//         const { contractAddress, tokenId } = req.params;
//         const contract = new web3.eth.Contract(ContractABI, contractAddress);
//         const tokenURI = await contract.methods.tokenURI(tokenId).call();
//         const metadata = await axios.get(tokenURI);
        
//         res.send(metadata.data);
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("An error occurred while fetching the NFT metadata.");
//     }
// });


