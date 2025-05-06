// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

interface IEntryPoint {
    function handleOps(UserOperation[] calldata ops, address payable beneficiary) external;
}

struct UserOperation {
    address sender;
    uint256 nonce;
    bytes initCode;
    bytes callData;
    uint256 callGasLimit;
    uint256 verificationGasLimit;
    uint256 preVerificationGas;
    uint256 maxFeePerGas;
    uint256 maxPriorityFeePerGas;
    bytes paymasterAndData;
    bytes signature;
}

contract AAWallet is Initializable, Ownable {
    using ECDSA for bytes32;
    
    IEntryPoint public immutable entryPoint;
    uint256 private nonce;
    
    event WalletInitialized(address indexed owner);
    
    constructor(address _entryPoint) {
        entryPoint = IEntryPoint(_entryPoint);
    }
    
    function initialize(address owner) external initializer {
        _transferOwnership(owner);
        emit WalletInitialized(owner);
    }
    
    function execute(address dest, uint256 value, bytes calldata func) external onlyOwner {
        (bool success, ) = dest.call{value: value}(func);
        require(success, "AAWallet: execution failed");
    }
    
    function executeBatch(address[] calldata dest, uint256[] calldata value, bytes[] calldata func) external onlyOwner {
        require(dest.length == value.length && dest.length == func.length, "AAWallet: invalid input lengths");
        for (uint256 i = 0; i < dest.length; i++) {
            (bool success, ) = dest[i].call{value: value[i]}(func[i]);
            require(success, "AAWallet: execution failed");
        }
    }
    
    function validateUserOp(UserOperation calldata userOp, bytes32 userOpHash, uint256 missingAccountFunds) external returns (uint256 validationData) {
        require(msg.sender == address(entryPoint), "AAWallet: not from entrypoint");
        require(userOp.sender == address(this), "AAWallet: not from this wallet");
        
        bytes32 hash = userOpHash.toEthSignedMessageHash();
        address recovered = hash.recover(userOp.signature);
        require(recovered == owner(), "AAWallet: invalid signature");
        
        if (missingAccountFunds > 0) {
            (bool success, ) = payable(msg.sender).call{value: missingAccountFunds}("");
            require(success, "AAWallet: failed to pay prefund");
        }
        
        return 0;
    }
    
    receive() external payable {}
} 