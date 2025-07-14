// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint private value;

    // Increment value by 1
    function increment() public {
        value += 1;
    }

    // Decrement value by 1
    function decrement() public {
        require(value > 0, "Value cannot go below zero");
        value -= 1;
    }

    // Read the value
    function getValue() public view returns (uint) {
        return value;
    }
}
