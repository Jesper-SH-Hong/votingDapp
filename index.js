// const Web3 = require("web3");
// const fs = require("fs");

const web3 = new Web3("http://localhost:8545");

//NOTE: jsonInterface of compiled contract. Inputs are nested in the jsonInterface object when console.log(contract). Investigate(map or etc) the object to find the inputs.
const abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "candidateList",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "candidate",
        type: "bytes32",
      },
    ],
    name: "totalVotesFor",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "candidate",
        type: "bytes32",
      },
    ],
    name: "validCandidate",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "candidate",
        type: "bytes32",
      },
    ],
    name: "voteForCandidate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "candidate",
        type: "bytes32",
      },
    ],
    name: "votesReceived",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

//NOTE: always check the latest contract address in the ganache-cli terminal
const contractAddress = "0x70Ddc2230FE222091DCC5572D7377dc339Cf7fFB";
const contractInstance = new web3.eth.Contract(abi, contractAddress);

let account;

const candidates = {
  Rama: "candidate-1",
  Nick: "candidate-2",
  Jose: "candidate-3",
};

function voteForCandidate() {
  const candidateName = document.getElementById("candidate").value;
  // convert the candidate name from the input field to bytes32 as defined in the contract
  const candidateNameInHex = web3.utils.padRight(
    web3.utils.asciiToHex(candidateName),
    64
  );

  contractInstance.methods
    .voteForCandidate(candidateNameInHex)
    .send({ from: account, gas: 4700000 })
    .then(() => {
      return contractInstance.methods.totalVotesFor(candidateNameInHex).call();
    })
    .then((votes) => {
      const divId = candidates[candidateName];
      document.getElementById(divId).innerText = votes;
    })
    .catch((err) => console.error(err));
}

document.addEventListener("DOMContentLoaded", async () => {
  await web3.eth.getAccounts().then((accs) => {
    if (accs.length === 0) {
      alert(
        "Couldn't get any accounts! Make sure your Ethereum client is configured correctly."
      );
      return;
    }
    account = accs[0];

    const candidateNames = Object.keys(candidates);
    candidateNames.forEach(async (name) => {
      let nameInHex = web3.utils.padRight(web3.utils.asciiToHex(name), 64);
      console.log(name);
      // console.log(typeof(name))
      console.log(nameInHex);

      try {
        const votes = await contractInstance.methods
          .totalVotesFor(nameInHex)
          .call();
        console.log(`${name}: ${votes}`);
        document.getElementById(candidates[name]).innerText = votes;
      } catch (err) {
        console.error(`ERROR while loading ${name}'s vote`, err);
        document.getElementById(candidates[name]).innerText =
          "ERROR LOADING VOTES";
      }
    });
  });
});
