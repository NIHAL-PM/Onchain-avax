require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

if (!process.env.AVAX_RPC_URL || !process.env.PRIVATE_KEY) {
  throw new Error("Missing environment variables: AVAX_RPC_URL or PRIVATE_KEY");
}

module.exports = {
  solidity: "0.8.20",
  networks: {
    avaxFuji: {
      url: process.env.AVAX_RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
