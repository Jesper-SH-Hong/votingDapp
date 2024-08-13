// Web3 = require('web3')
// web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
// VotingContract = web3.eth.contract(abiDefinition)
// byteCode = compiledCode.contracts[':Voting'].bytecode
// deployedContract = VotingContract.new(['Rama','Nick','Jose'],{data: byteCode, from: web3.eth.accounts[0], gas: 4700000})

fs = require("fs");
const { Web3 } = require("web3");
const web3 = new Web3("http://localhost:8545");
bytecode = fs.readFileSync("./VotingBIN.bin").toString();
abi = fs.readFileSync("./VotingABI.json").toString();

abi = JSON.parse(abi);

const contract = new web3.eth.Contract(abi);
console.log(contract._jsonInterface.map((i) => i.inputs));

const deployContract = async () => {
  try {
    const accounts = await web3.eth.getAccounts();

    //we defined the argument type was bytes32 in the contract... so map it..
    const candidateNames = ["Rama", "Nick", "Jose"].map((name) =>
      web3.utils.padRight(web3.utils.asciiToHex(name), 64)
    );

    const result = await contract
      .deploy({
        data: bytecode,

        arguments: [candidateNames],
      })
      .send({
        //send submits transaction to the blockchain(a.k.a deploy)
        //from is the account(a.k.aaddress) that is deploying the contract
        //check ganache-cli(ganache terminal) for the address
        from: accounts[0],
        gas: "1000000",
        gasPrice: "20000000000",
      });

    console.log("Contract deployed at address:", result.options.address);
    //save the address of the deployed contract to the our deployed contract  object
    contract.options.address = result.options.address;

    //call is used to read data from the blockchain.
    const votesForRama = Number(
      await contract.methods
        .totalVotesFor(web3.utils.padRight(web3.utils.asciiToHex("Rama"), 64))
        .call()
    );

    console.log("Votes for Rama:", votesForRama);

    await contract.methods
      .voteForCandidate(web3.utils.padRight(web3.utils.asciiToHex("Rama"), 64))
      .send({ from: accounts[0], gas: 1000000 });
    console.log("Voted for Rama");

    // const votesForRama2 = Number(
    //   await contract.methods
    //     .totalVotesFor(web3.utils.padRight(web3.utils.asciiToHex("Rama"), 64))
    //     .call()
    // );

    // console.log("Votes for Rama after voting:", votesForRama2);
  } catch (error) {
    console.log("error while deploying: ", error);
  }
};

deployContract().catch(console.error);
