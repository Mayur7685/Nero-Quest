// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./AAWallet.sol";

contract AAWalletFactory is Ownable {
    using Clones for address;
    
    address public immutable implementation;
    address public immutable entryPoint;
    
    event WalletCreated(address indexed wallet, address indexed owner);
    
    constructor(address _entryPoint) {
        implementation = address(new AAWallet(_entryPoint));
        entryPoint = _entryPoint;
    }
    
    function createWallet(address owner, uint256 salt) external returns (address) {
        bytes32 saltBytes = bytes32(salt);
        address clone = implementation.cloneDeterministic(saltBytes);
        AAWallet(clone).initialize(owner);
        emit WalletCreated(clone, owner);
        return clone;
    }
    
    function getWalletAddress(address owner, uint256 salt) external view returns (address) {
        bytes32 saltBytes = bytes32(salt);
        return implementation.predictDeterministicAddress(saltBytes, address(this));
    }
} 