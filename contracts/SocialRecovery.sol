// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract SocialRecovery is Ownable {
    using ECDSA for bytes32;

    struct Guardian {
        address guardianAddress;
        bool isActive;
        uint256 addedAt;
    }

    struct RecoveryRequest {
        address newOwner;
        uint256 threshold;
        uint256 validUntil;
        bool executed;
        mapping(address => bool) guardianVotes;
    }

    mapping(address => Guardian) public guardians;
    mapping(uint256 => RecoveryRequest) public recoveryRequests;
    uint256 public recoveryRequestCount;
    uint256 public guardianCount;
    uint256 public requiredGuardians;

    event GuardianAdded(address indexed guardian);
    event GuardianRemoved(address indexed guardian);
    event RecoveryRequested(uint256 indexed requestId, address indexed newOwner);
    event RecoveryExecuted(uint256 indexed requestId, address indexed newOwner);
    event GuardianVoted(uint256 indexed requestId, address indexed guardian);

    constructor(uint256 _requiredGuardians) {
        requiredGuardians = _requiredGuardians;
    }

    function addGuardian(address _guardian) external onlyOwner {
        require(!guardians[_guardian].isActive, "Guardian already exists");
        guardians[_guardian] = Guardian({
            guardianAddress: _guardian,
            isActive: true,
            addedAt: block.timestamp
        });
        guardianCount++;
        emit GuardianAdded(_guardian);
    }

    function removeGuardian(address _guardian) external onlyOwner {
        require(guardians[_guardian].isActive, "Guardian does not exist");
        require(guardianCount > requiredGuardians, "Cannot remove guardian: minimum required");
        guardians[_guardian].isActive = false;
        guardianCount--;
        emit GuardianRemoved(_guardian);
    }

    function requestRecovery(address _newOwner) external {
        require(guardianCount >= requiredGuardians, "Not enough guardians");
        uint256 requestId = recoveryRequestCount++;
        RecoveryRequest storage request = recoveryRequests[requestId];
        request.newOwner = _newOwner;
        request.threshold = requiredGuardians;
        request.validUntil = block.timestamp + 7 days;
        request.executed = false;
        emit RecoveryRequested(requestId, _newOwner);
    }

    function voteForRecovery(uint256 _requestId, bytes calldata _signature) external {
        RecoveryRequest storage request = recoveryRequests[_requestId];
        require(!request.executed, "Recovery already executed");
        require(block.timestamp <= request.validUntil, "Recovery request expired");
        require(guardians[msg.sender].isActive, "Not an active guardian");
        require(!request.guardianVotes[msg.sender], "Already voted");

        bytes32 messageHash = keccak256(abi.encodePacked(_requestId, request.newOwner));
        bytes32 ethSignedMessageHash = messageHash.toEthSignedMessageHash();
        address signer = ethSignedMessageHash.recover(_signature);
        require(signer == msg.sender, "Invalid signature");

        request.guardianVotes[msg.sender] = true;
        emit GuardianVoted(_requestId, msg.sender);

        uint256 voteCount = 0;
        for (uint256 i = 0; i < guardianCount; i++) {
            if (request.guardianVotes[guardians[msg.sender].guardianAddress]) {
                voteCount++;
            }
        }

        if (voteCount >= request.threshold) {
            _executeRecovery(_requestId);
        }
    }

    function _executeRecovery(uint256 _requestId) internal {
        RecoveryRequest storage request = recoveryRequests[_requestId];
        require(!request.executed, "Recovery already executed");
        request.executed = true;
        _transferOwnership(request.newOwner);
        emit RecoveryExecuted(_requestId, request.newOwner);
    }
} 