fs = require("fs");
code = fs.readFileSync("./Voting.sol").toString();
solc = require("solc");
const input = {
  language: "Solidity",
  sources: {
    "Voting.sol": {
      content: code,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log(output);


const contractName = "Voting";
const abi = output.contracts["Voting.sol"][contractName].abi;
const bin = output.contracts["Voting.sol"][contractName].evm.bytecode.object;

// ABI와 BIN 파일 저장
fs.writeFileSync("./VotingABI.json", JSON.stringify(abi, null, 2));
fs.writeFileSync("./VotingBIN.bin", bin);