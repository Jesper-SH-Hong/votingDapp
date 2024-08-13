//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;


contract Voting {

    bytes32[] public candidateList;
    mapping (bytes32=> uint8) public votesReceived; //track each candidate(b32) got how many votes(uint8)    
    //init as 0s

    //Note: the constructor invoked only once when it gets invoked.
    //deploying contract multiple times.. creating multiple instance of this contract in blockchain..
    //so, once the contract deployed, it can't be modified, overwritten.

    //memory vs storage. no need visibility modifier for constructor if solidity >=0.7
    constructor(bytes32[] memory _candidateNames) {
        candidateList = _candidateNames;
    }

    function voteForCandidate(bytes32 candidate) public {
        require(validCandidate(candidate)); //check condition. if not met, halt the transaction.
        votesReceived[candidate] += 1;
    }

    //view. readonly func. getter
    function totalVotesFor(bytes32 candidate) view public returns(uint8) {
        return votesReceived[candidate];
    }

    function validCandidate(bytes32 candidate) view public returns(bool) {
        for(uint i =0; i < candidateList.length; i ++) {
            if (candidateList[i] == candidate) {
                return true;
            }
        }
        return false;
    }

}