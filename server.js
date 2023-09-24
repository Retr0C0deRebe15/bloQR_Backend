const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const contractABI = require('./Abi'); 
const Web3 = require('web3');
const path = require('path');

module.exports = async (req, res) => {
  try {
    console.log(contractABI)
    let data = new FormData();
    data.append('file', fs.createReadStream('./public/assets/cyclone.png'));
    data.append('pinataOptions', '{"cidVersion": 0}');
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
};