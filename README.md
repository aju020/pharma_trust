# **PharmaTrust**: *A cure for counterfeit drugs*

The cure for Counterfeit Drugs" refers to a solution that helps to prevent the distribution of counterfeit drugs. Counterfeit drugs are a significant problem globally, leading to serious health consequences, loss of life, and financial losses. Current tracking and tracing of drugs are not entirely effective, and counterfeit drugs can easily enter the supply chain undetected. There is a need for a secure, transparent, and tamper-proof system that can track drugs' manufacturing, distribution, and consumption in real-time to prevent counterfeit drugs from entering the supply chain and ensure patient safety. Blockchain technology provides a promising solution to this problem, and thus this project proposes the use of blockchain to develop a drug documenting system to reduce counterfeit drugs prevalence in the pharmaceutical supply chain.

The current pharma supply chain poses a threat of drugs being produced by illegal stakeholders(Raw-material Suppliers, Manufacturers, Distributors, retailers). In the current scenario, the customer is not fully able to view the track of medicine and verify its genuinity. In this project, we ensure transparency by ensuring that anyone whether in the blockchain network or not is able to view the track of medicines(with the help of QRCode).

In this project, we make sure that only the legally verified/authorized stakeholders will be able to enter the details of the medicine into this network. If however there is an attempt by an outside(illegal) organization to enter/update the details in this network then this will be shown as an alert and also the transaction cannot take place unless they are a part of the blockchain network. The suppliers are also able to backtrack and inform the other stakeholders if there is any shortage of raw materials to produce certain medicines. This will be helpful in the chain as the other stakeholders can opt for alternative medicines and fulfill the people's needs.

## Run Locally

1.Clone this repository to your local machine.

```bash
  git clone https://github.com/shinoj-exe/pharma_trust.git
```

2.Go to the project directory
```bash
  cd pharma_trust
```

3.Install the dependencies for both the client and server side.
```bash
  npm install
```
4.Install Truffle for compiling and deploying the contracts
```bash
  npm install -g truffle
```
5.Install hd wallet provider
```bash
  npm install @truffle/hdwallet-provider
```
6.Create a .secret file in the root directory folder and store your wallet's recovery phrase in it

6.Compile the contracts 
```bash
  truffle compile 
```

7.Now before deploying it to the polygon testnet create a testnet in metamask(we used alchemy for creating the testnet rpc url).Create some accounts in the network and add sufficient MATIC tokens from polygon faucets.
```
Polygon testnet details:
Network name : Polygon Mumbai Testnet
New RPC URL : https://polygon-mumbai.g.alchemy.com/YOUR_API_KEY
Chain ID : 80001
Currency symbol : MATIC
```



8.Deploy the contracts
```bash
 truffle deploy --network matic
 ```
9.Open another terminal window and start the client.
```bash
  cd client && npm start
```

## Dependencies
The following are the major dependencies that have been used in this project:

-React JS: A JavaScript library used for building user interfaces.

-Node.js: A JavaScript runtime used to build server-side applications(Runtime Environment for Javascript).

-Truffle: A world class development environment, testing framework and asset pipeline for blockchains using the Ethereum Virtual Machine (EVM), aiming to make life as a developer easier.

## Working Demo

[Working Demo](https://www.loom.com/share/f77d8769e8174228b9ee14533d9d4d61)


https://github.com/shinoj-exe/pharma_trust/assets/76904393/dfc3f222-bd4b-491d-88a6-857a53cf6a62



## Project
![Logo](https://github.com/shinoj-exe/pharma_trust/blob/master/Screenshots/CoverPage.jpg?raw=true)


## Roadmap

- **Phase 1:** Blockchain Network and Smart Contract Development

- **Phase 2:** Client-Side Implementation

- **Phase 3:** Integration and Testing




### Home Page
![App Screenshot](https://github.com/shinoj-exe/pharma_trust/blob/master/Screenshots/HomePage.png?raw=true)

### Register Page
![App Screenshot](https://github.com/shinoj-exe/pharma_trust/blob/master/Screenshots/roles.png?raw=true)

### Order Medicines
![App Screenshot](https://github.com/shinoj-exe/pharma_trust/blob/master/Screenshots/orderMedicine.png?raw=true)


### Update Blockchain Data for Tracking
![App Screenshot](https://github.com/shinoj-exe/pharma_trust/blob/master/Screenshots/update.png?raw=true)

#### Update as Raw Material Supplier
![App Screenshot](https://github.com/shinoj-exe/pharma_trust/blob/master/Screenshots/update1.png?raw=true)

#### Update as Manufacturer
![App Screenshot](https://github.com/shinoj-exe/pharma_trust/blob/master/Screenshots/update2.png?raw=true)

#### Update as Distributor
![App Screenshot](https://github.com/shinoj-exe/pharma_trust/blob/master/Screenshots/update3.png?raw=true)

#### Update as Retailer/Pharmacist
![App Screenshot](https://github.com/shinoj-exe/pharma_trust/blob/master/Screenshots/update4.png?raw=true)

### Tracking Medicines
![App Screenshot](https://github.com/shinoj-exe/pharma_trust/blob/master/Screenshots/tracking.png?raw=true)
## Tech Stack

***React Js, Bootstrap, CSS,Node JS, Web3 JS, Solidity, Truffle Suite, Polygon Mumbai Testnet***

