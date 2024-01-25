require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {},
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
  },
};

// SCRIPT DIBAWAH DIGUNAKAN UNTUK TESTNET

// require('dotenv').config();
// require("@nomicfoundation/hardhat-toolbox");

// module.exports = {
//   defaultNetwork: "polygon_mumbai",
//   networks: {
//     hardhat: {
//       chainId: 1337 // ID jaringan bawaan Hardhat
//     },
//     polygon_mumbai: {
//       url: process.env.POLYGON_MUMBAI_RPC_PROVIDER,
//       accounts: [process.env.PRIVATE_KEY]
//     }
//   },
//   etherscan: {
//     apiKey: process.env.POLYGONSCAN_API_KEY
//   },
//   solidity: {
//     version: "0.8.20",
//     settings: {
//       optimizer: {
//         enabled: true,
//         runs: 200
//       }
//     }
//   },
// }