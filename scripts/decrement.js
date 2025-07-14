const hre = require("hardhat");

async function main() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your deployed address

  const contract = await hre.ethers.getContractAt("SimpleStorage", contractAddress);

  console.log("🔢 Current value:", (await contract.getValue()).toString());

  console.log("➖ Subtracting 1...");
  const tx = await contract.decrement();
  await tx.wait();

  const newValue = await contract.getValue();
  console.log("✅ New value:", newValue.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
