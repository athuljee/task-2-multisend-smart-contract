// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PollingSystem {
    struct Poll {
        string title;
        string[] options;
        mapping(string => uint) votes;
        mapping(address => bool) hasVoted;
        uint endTime;
        bool exists;
    }

    mapping(uint => Poll) public polls;
    uint public pollCount;

    function createPoll(string memory _title, string[] memory _options, uint _durationInSeconds) public {
        pollCount++;
        Poll storage newPoll = polls[pollCount];
        newPoll.title = _title;
        newPoll.endTime = block.timestamp + _durationInSeconds;
        newPoll.exists = true;

        for (uint i = 0; i < _options.length; i++) {
            newPoll.options.push(_options[i]);
        }
    }

    function vote(uint _pollId, string memory _option) public {
        require(polls[_pollId].exists, "Poll doesn't exist");
        require(block.timestamp < polls[_pollId].endTime, "Voting period has ended");
        require(!polls[_pollId].hasVoted[msg.sender], "Already voted");

        polls[_pollId].votes[_option]++;
        polls[_pollId].hasVoted[msg.sender] = true;
    }

    function getWinner(uint _pollId) public view returns (string memory winner) {
        require(block.timestamp >= polls[_pollId].endTime, "Poll is still active");
        uint highestVotes = 0;

        for (uint i = 0; i < polls[_pollId].options.length; i++) {
            string memory option = polls[_pollId].options[i];
            uint votesForOption = polls[_pollId].votes[option];

            if (votesForOption > highestVotes) {
                highestVotes = votesForOption;
                winner = option;
            }
        }
    }
}
