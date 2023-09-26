// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract StreamPay {
    address public owner;
    address public recipient;
    address public escrow;
    uint256 public startTimestamp;
    uint256 public duration;
    uint256 public totalAmount;
    uint256 public amountWithdrawn;
    uint256 public refundThreshold;

    enum State { Active, Paused, Completed }
    State public state;

    constructor(
        address _recipient,
        address _escrow,
        uint256 _duration,
        uint256 _totalAmount,
        uint256 _refundThreshold
    ) {
        owner = msg.sender;
        recipient = _recipient;
        escrow = _escrow;
        startTimestamp = block.timestamp;
        duration = _duration;
        totalAmount = _totalAmount;
        refundThreshold = _refundThreshold;
        state = State.Active;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    modifier onlyRecipient() {
        require(msg.sender == recipient, "Only the recipient can call this function");
        _;
    }

    modifier onlyEscrow() {
        require(msg.sender == escrow, "Only the escrow account can call this function");
        _;
    }

    function withdraw() external onlyRecipient {
        require(state == State.Active, "StreamPay: Payment stream is not active");
        uint256 elapsedTime = block.timestamp - startTimestamp;
        uint256 withdrawableAmount = (totalAmount * elapsedTime) / duration;

        if (withdrawableAmount > amountWithdrawn) {
            uint256 newWithdrawnAmount = withdrawableAmount - amountWithdrawn;
            require(newWithdrawnAmount > 0, "StreamPay: Nothing to withdraw");
            amountWithdrawn = withdrawableAmount;
            (bool success, ) = recipient.call{value: newWithdrawnAmount}("");
            require(success, "StreamPay: Transfer failed");
        }
    }

    function pause() external onlyOwner {
        require(state == State.Active, "StreamPay: Payment stream is not active");
        state = State.Paused;
    }

    function resume() external onlyOwner {
        require(state == State.Paused, "StreamPay: Payment stream is not paused");
        state = State.Active;
        startTimestamp = block.timestamp - (duration - (block.timestamp - startTimestamp));
    }

    function complete() external onlyOwner {
        require(state == State.Active || state == State.Paused, "StreamPay: Payment stream is not active or paused");
        state = State.Completed;
    }

    function refund() external onlyEscrow {
        require(state == State.Completed, "StreamPay: Payment stream is not completed");
        uint256 balance = address(this).balance;
        require(balance >= refundThreshold, "StreamPay: Balance is below refund threshold");

        (bool success, ) = owner.call{value: balance}("");
        require(success, "StreamPay: Refund failed");
    }

    function remainingBalance() external view returns (uint256) {
        if (state == State.Completed) {
            return 0;
        }

        uint256 elapsedTime = block.timestamp - startTimestamp;

        if (elapsedTime >= duration) {
            return 0;
        }

        uint256 withdrawableAmount = (totalAmount * elapsedTime) / duration;
        return totalAmount - withdrawableAmount;
    }

    receive() external payable {
        require(state == State.Active, "StreamPay: Payment stream is not active");
    }
}
