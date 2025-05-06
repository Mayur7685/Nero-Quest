import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy EntryPoint (if not already deployed)
  const EntryPoint = await ethers.getContractFactory("EntryPoint");
  const entryPoint = await EntryPoint.deploy();
  await entryPoint.deployed();
  console.log("EntryPoint deployed to:", entryPoint.address);

  // Deploy AAWalletFactory
  const AAWalletFactory = await ethers.getContractFactory("AAWalletFactory");
  const aaWalletFactory = await AAWalletFactory.deploy(entryPoint.address);
  await aaWalletFactory.deployed();
  console.log("AAWalletFactory deployed to:", aaWalletFactory.address);

  // Deploy Paymaster
  const Paymaster = await ethers.getContractFactory("Paymaster");
  const paymaster = await Paymaster.deploy(entryPoint.address);
  await paymaster.deployed();
  console.log("Paymaster deployed to:", paymaster.address);

  // Deploy SocialRecovery
  const SocialRecovery = await ethers.getContractFactory("SocialRecovery");
  const socialRecovery = await SocialRecovery.deploy(3); // Require 3 guardians for recovery
  await socialRecovery.deployed();
  console.log("SocialRecovery deployed to:", socialRecovery.address);

  // Deploy SubscriptionManager
  const SubscriptionManager = await ethers.getContractFactory("SubscriptionManager");
  const subscriptionManager = await SubscriptionManager.deploy();
  await subscriptionManager.deployed();
  console.log("SubscriptionManager deployed to:", subscriptionManager.address);

  // Deploy QuestManager
  const QuestManager = await ethers.getContractFactory("QuestManager");
  const questManager = await QuestManager.deploy(process.env.REWARD_TOKEN_ADDRESS);
  await questManager.deployed();
  console.log("QuestManager deployed to:", questManager.address);

  // Add some initial tokens to the Paymaster
  const tokenAddress = process.env.REWARD_TOKEN_ADDRESS;
  const tokenPrice = ethers.utils.parseEther("1"); // 1 token per ETH
  await paymaster.addToken(tokenAddress, tokenPrice);
  console.log("Added token to Paymaster:", tokenAddress);

  // Add some initial subscription plans
  await subscriptionManager.addPlan(
    ethers.utils.parseEther("10"), // 10 tokens
    30 * 24 * 60 * 60 // 30 days in seconds
  );
  await subscriptionManager.addPlan(
    ethers.utils.parseEther("50"), // 50 tokens
    90 * 24 * 60 * 60 // 90 days in seconds
  );
  console.log("Added subscription plans");

  // Create initial quests
  await questManager.createQuest(
    "Share a Tweet",
    "Share NERO Quest on Twitter and tag 3 friends to earn NERO tokens.",
    ethers.utils.parseEther("10"), // 10 NERO tokens reward
    [
      "Create a tweet about NERO Quest",
      "Tag at least 3 friends in your tweet",
      "Include the #NEROQuest hashtag"
    ]
  );

  await questManager.createQuest(
    "Refer Friends",
    "Invite 5 friends to join NERO Quest using your unique referral link.",
    ethers.utils.parseEther("25"), // 25 NERO tokens reward
    [
      "Share your referral link with friends",
      "Get 3 friends to sign up",
      "Get 5 friends to sign up"
    ]
  );

  console.log("Added initial quests");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 