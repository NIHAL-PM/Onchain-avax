const hre = require("hardhat");

async function main() {
  const OnchainSIP = await hre.ethers.getContractFactory("OnchainSIP");
  const sip = await OnchainSIP.deploy();
  await sip.waitForDeployment();

  console.log("OnchainSIP deployed to:", await sip.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
