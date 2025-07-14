const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your deployed address if different

const contractABI = [
  {
    "inputs": [],
    "name": "decrement",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getValue",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "increment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

let provider, signer, contract;

async function connect() {
  if (window.ethereum) {
    provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = await provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);
  } else {
    alert("Please install MetaMask!");
  }
}

async function getValue() {
  await connect();
  const value = await contract.getValue();
  document.getElementById("value").innerText = value.toString();
}

async function increment() {
  await connect();
  const tx = await contract.increment();
  document.getElementById("status").innerText = "⏳ Waiting for confirmation...";
  await tx.wait();
  await getValue();
  document.getElementById("status").innerText = "✅ Incremented!";
}

async function decrement() {
  await connect();
  const tx = await contract.decrement();
  document.getElementById("status").innerText = "⏳ Waiting for confirmation...";
  await tx.wait();
  await getValue();
  document.getElementById("status").innerText = "✅ Decremented!";
}
