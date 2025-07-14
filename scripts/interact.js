const hre = require("hardhat");

async function main() {
  // Get contract factory
  const SimpleStorage = await hre.ethers.getContractFactory("SimpleStorage");

  // Deploy contract
  const contract = await SimpleStorage.deploy();
  await contract.waitForDeployment();

  console.log("✅ Contract deployed to:", contract.target);

  // Call getValue() before incrementing
  let value = await contract.getValue();
  console.log("🔎 Initial value:", value.toString());

  // Call increment()
  let tx1 = await contract.increment();
  await tx1.wait();

  // Call getValue() again
  value = await contract.getValue();
  console.log("🟢 Value after increment:", value.toString());

  // Call decrement()
  let tx2 = await contract.decrement();
  await tx2.wait();

  // Final value
  value = await contract.getValue();
  console.log("🔻 Value after decrement:", value.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
