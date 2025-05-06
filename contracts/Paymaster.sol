// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

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

contract Paymaster is Ownable {
    IEntryPoint public immutable entryPoint;
    mapping(address => bool) public supportedTokens;
    mapping(address => uint256) public tokenPrices;
    
    event TokenAdded(address indexed token, uint256 price);
    event TokenRemoved(address indexed token);
    event PriceUpdated(address indexed token, uint256 price);
    
    constructor(address _entryPoint) {
        entryPoint = IEntryPoint(_entryPoint);
    }
    
    function addToken(address token, uint256 price) external onlyOwner {
        supportedTokens[token] = true;
        tokenPrices[token] = price;
        emit TokenAdded(token, price);
    }
    
    function removeToken(address token) external onlyOwner {
        supportedTokens[token] = false;
        emit TokenRemoved(token);
    }
    
    function updatePrice(address token, uint256 price) external onlyOwner {
        require(supportedTokens[token], "Paymaster: token not supported");
        tokenPrices[token] = price;
        emit PriceUpdated(token, price);
    }
    
    function validatePaymasterUserOp(UserOperation calldata userOp, bytes32 userOpHash, uint256 maxCost) external returns (bytes memory context, uint256 validationData) {
        require(msg.sender == address(entryPoint), "Paymaster: not from entrypoint");
        
        // Extract token and amount from paymasterAndData
        (address token, uint256 amount) = abi.decode(userOp.paymasterAndData[20:], (address, uint256));
        require(supportedTokens[token], "Paymaster: token not supported");
        
        // Calculate required token amount based on gas cost
        uint256 requiredAmount = (maxCost * tokenPrices[token]) / 1e18;
        require(amount >= requiredAmount, "Paymaster: insufficient token amount");
        
        // Transfer tokens from user to paymaster
        IERC20(token).transferFrom(userOp.sender, address(this), requiredAmount);
        
        return (abi.encode(token, requiredAmount), 0);
    }
    
    function postOp(PostOpMode mode, bytes calldata context, uint256 actualGasCost) external {
        require(msg.sender == address(entryPoint), "Paymaster: not from entrypoint");
        
        (address token, uint256 amount) = abi.decode(context, (address, uint256));
        
        if (mode == PostOpMode.opSucceeded) {
            // Refund excess tokens
            uint256 refundAmount = amount - actualGasCost;
            if (refundAmount > 0) {
                IERC20(token).transfer(msg.sender, refundAmount);
            }
        } else {
            // Refund all tokens on failure
            IERC20(token).transfer(msg.sender, amount);
        }
    }
    
    enum PostOpMode {
        opSucceeded,
        opReverted,
        postOpReverted
    }
    
    receive() external payable {}
} 