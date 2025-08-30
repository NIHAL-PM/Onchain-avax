require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
  avaxFuji: {
    url: process.env.AVAX_RPC_URL,
    accounts: [process.env.PRIVATE_KEY]
  }
}
};
