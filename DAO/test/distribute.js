require("dotenv").config()
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi } = require("../build/contracts/Profit.json")
const fs = require('fs')
const csv = require('csv-parser')

const privateKey = process.env.PRIVATE_KEY

//variables used as parameters to be filled by the user
const contract_Address = "0x4eaB3f1B2f0ab85DdDA4d34EDf691ADE9eB9b146"; // Profit Distributor address here

const provider = new HDWalletProvider(
    privateKey,
    process.env.RPC
);

const web3 = new Web3(provider);     //unlocking the account using seed and a gateway to ethereum network

const transact = async (addresses, amounts) => {
    const accounts = await web3.eth.getAccounts();   //keeping sub accounts of unlocked account
    console.log('Attempting to whitelsit from account', accounts[0]);
    const contract = await new web3.eth.Contract(abi, contract_Address);

    const gas = await contract.methods.profit49(addresses).estimateGas({ from: accounts[0] });

    let gasPrice = await web3.eth.getGasPrice();

    gasPrice = parseInt(gasPrice) + 2000000000;

    console.log( "Matic Cost:", (gas * gasPrice) / 10 ** 18)

    const result = await contract.methods.profit49(addresses).send({ from: accounts[0], gas: gas, gasPrice: gasPrice.toString() });

    console.log('Transaction hash on address ', result.transactionHash)

};

const addressesListFile = []        //storing all csv data here

let arr500 = [];
fs.createReadStream('addresses.csv').pipe(csv({})).on('data', (data) => addressesListFile.push(data.address)).on('end', async () => {
    while (addressesListFile.length) {
        arr500.push(addressesListFile.splice(0, 499));
    }

    for (let i = 0; i < arr500.length; i++) {
        await transact(arr500[i]);
    }
    console.log('All Addresses Profit Sent');
    return
});