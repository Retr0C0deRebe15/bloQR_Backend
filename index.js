const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
require('dotenv').config();
const contractABI = require('./Abi'); 
const Web3 = require('web3');
const path = require('path');


const cors=require('cors');



// Initialize Express
const app = express();
// axios.interceptors.request.use(request => {
//   console.log(request);
//   return request;
// });
// Create GET request







/////////new code
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://blo-qr.vercel.app"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.get('/', function(req, res, next) {
//   // Handle the get for this route
// });

// app.post('/', function(req, res, next) {
//  // Handle the post for this route
// });

////////////







app.get("/", (req, res) => {
  res.send("Express on Vercel");
});


app.post('/pinFileToIPFS', async (req, res) => {
  try {
    console.log(contractABI);
    let data = new FormData();
    data.append('file', fs.createReadStream(path.join(process.cwd(), 'public', 'assets', 'Cyclone.png')));
    data.append('pinataMetadata', req.body.pinataMetadata); // Use JSON payload from request

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



// Initialize server
app.listen(5000, () => {
  console.log("Running on port 5000.");
});












