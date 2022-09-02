# AnthonyDAO

## Guide Lines

Requirements:

1. NodeJs ^14.16.0
2. truffle ( `npm i -g truffle`)

### Steps
Please make sure to add a .secret file with deployer provate key and create a replica of .env.example by the name of .env

Compile : `truffle compile`

Deploy testnet : `truffle migrate --network polygonTest`

Deploy Mainnet : `truffle migrate --network polygon`

> Note: Please add swap wallet and treasury wallet accordingly in file migtrations.

>Please refer to test/distribute.js to further manage distribution and testing.
>You need to add addresses to addresses.csv for testing and change Distributor contract address on line#11 in distribute.js

For Test : `npm run test`
