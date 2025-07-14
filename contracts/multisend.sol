// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MultiSend {

    // Payable function to distribute Ether equally
    function multiSend(address[] calldata recipients) external payable {
        uint256 totalRecipients = recipients.length;
        require(totalRecipients > 0, "No recipients provided");
        require(msg.value > 0, "No Ether sent");

        uint256 amountPerRecipient = msg.value / totalRecipients;
        require(amountPerRecipient > 0, "Ether too low to distribute");

        for (uint256 i = 0; i < totalRecipients; i++) {
            (bool success, ) = recipients[i].call{value: amountPerRecipient}("");
            require(success, "Transfer failed");
        }

        // Refund remainder if any
        uint256 remainder = msg.value - (amountPerRecipient * totalRecipients);
        if (remainder > 0) {
            (bool refundSuccess, ) = msg.sender.call{value: remainder}("");
            require(refundSuccess, "Refund failed");
        }
    }
}
