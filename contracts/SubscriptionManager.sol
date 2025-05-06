// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract SubscriptionManager is Ownable, ReentrancyGuard {
    struct Subscription {
        address subscriber;
        address token;
        uint256 amount;
        uint256 interval;
        uint256 lastPayment;
        bool isActive;
    }

    struct Plan {
        uint256 price;
        uint256 interval;
        bool isActive;
    }

    mapping(bytes32 => Subscription) public subscriptions;
    mapping(uint256 => Plan) public plans;
    uint256 public planCount;

    event SubscriptionCreated(bytes32 indexed subscriptionId, address indexed subscriber, uint256 planId);
    event SubscriptionCancelled(bytes32 indexed subscriptionId);
    event PaymentProcessed(bytes32 indexed subscriptionId, uint256 amount);
    event PlanAdded(uint256 indexed planId, uint256 price, uint256 interval);
    event PlanUpdated(uint256 indexed planId, uint256 price, uint256 interval);
    event PlanDeactivated(uint256 indexed planId);

    function addPlan(uint256 _price, uint256 _interval) external onlyOwner {
        uint256 planId = planCount++;
        plans[planId] = Plan({
            price: _price,
            interval: _interval,
            isActive: true
        });
        emit PlanAdded(planId, _price, _interval);
    }

    function updatePlan(uint256 _planId, uint256 _price, uint256 _interval) external onlyOwner {
        require(plans[_planId].isActive, "Plan does not exist");
        plans[_planId].price = _price;
        plans[_planId].interval = _interval;
        emit PlanUpdated(_planId, _price, _interval);
    }

    function deactivatePlan(uint256 _planId) external onlyOwner {
        require(plans[_planId].isActive, "Plan already inactive");
        plans[_planId].isActive = false;
        emit PlanDeactivated(_planId);
    }

    function subscribe(uint256 _planId, address _token) external nonReentrant {
        require(plans[_planId].isActive, "Plan is not active");
        
        bytes32 subscriptionId = keccak256(abi.encodePacked(msg.sender, _planId, block.timestamp));
        subscriptions[subscriptionId] = Subscription({
            subscriber: msg.sender,
            token: _token,
            amount: plans[_planId].price,
            interval: plans[_planId].interval,
            lastPayment: block.timestamp,
            isActive: true
        });

        // Process initial payment
        IERC20(_token).transferFrom(msg.sender, address(this), plans[_planId].price);
        
        emit SubscriptionCreated(subscriptionId, msg.sender, _planId);
        emit PaymentProcessed(subscriptionId, plans[_planId].price);
    }

    function cancelSubscription(bytes32 _subscriptionId) external {
        Subscription storage subscription = subscriptions[_subscriptionId];
        require(subscription.subscriber == msg.sender, "Not the subscriber");
        require(subscription.isActive, "Subscription not active");
        
        subscription.isActive = false;
        emit SubscriptionCancelled(_subscriptionId);
    }

    function processPayment(bytes32 _subscriptionId) external nonReentrant {
        Subscription storage subscription = subscriptions[_subscriptionId];
        require(subscription.isActive, "Subscription not active");
        require(block.timestamp >= subscription.lastPayment + subscription.interval, "Too early for payment");

        IERC20(subscription.token).transferFrom(
            subscription.subscriber,
            address(this),
            subscription.amount
        );

        subscription.lastPayment = block.timestamp;
        emit PaymentProcessed(_subscriptionId, subscription.amount);
    }

    function withdrawFunds(address _token, uint256 _amount) external onlyOwner {
        IERC20(_token).transfer(owner(), _amount);
    }
} 