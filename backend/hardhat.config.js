require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config({path: '.env'});

POLYGON_MUMBAI_RPC_URL= process.env.POLYGON_MUMBAI_RPC_URL

PRIVATE_KEY= process.env.PRIVATE_KEY

POLYGONSCAN_KEY= process.env.POLYGONSCAN_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    mumbai:{
      url: POLYGON_MUMBAI_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan:{
    apiKey: process.env.POLYGONSCAN_KEY
  }
};
