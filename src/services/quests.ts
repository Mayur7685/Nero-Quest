import { ethers } from 'ethers';
import { useNeroContext } from '@/contexts/NeroContext';
import QuestManagerABI from '@/contracts/QuestManager.json';

export class QuestService {
  private contract: ethers.Contract;
  private provider: ethers.providers.JsonRpcProvider;
  private signer: ethers.Signer;

  constructor(provider: ethers.providers.JsonRpcProvider, signer: ethers.Signer, contractAddress: string) {
    this.provider = provider;
    this.signer = signer;
    this.contract = new ethers.Contract(contractAddress, QuestManagerABI, signer);
  }

  async completeTask(questId: number, taskId: number) {
    try {
      const tx = await this.contract.completeTask(questId, taskId);
      await tx.wait();
      return true;
    } catch (error) {
      console.error('Error completing task:', error);
      throw error;
    }
  }

  async claimReward(questId: number) {
    try {
      const tx = await this.contract.claimReward(questId);
      await tx.wait();
      return true;
    } catch (error) {
      console.error('Error claiming reward:', error);
      throw error;
    }
  }

  async getQuestProgress(userAddress: string, questId: number) {
    try {
      const progress = await this.contract.getQuestProgress(userAddress, questId);
      return progress;
    } catch (error) {
      console.error('Error getting quest progress:', error);
      throw error;
    }
  }

  async getQuestDetails(questId: number) {
    try {
      const quest = await this.contract.quests(questId);
      return {
        id: quest.id.toNumber(),
        title: quest.title,
        description: quest.description,
        rewardAmount: quest.rewardAmount.toString(),
        isActive: quest.isActive,
        taskIds: quest.taskIds.map((id: ethers.BigNumber) => id.toNumber())
      };
    } catch (error) {
      console.error('Error getting quest details:', error);
      throw error;
    }
  }
}

export function useQuestService() {
  const { provider, signer } = useNeroContext();
  const contractAddress = process.env.NEXT_PUBLIC_QUEST_MANAGER_ADDRESS;

  if (!provider || !signer || !contractAddress) {
    throw new Error('Quest service not initialized');
  }

  return new QuestService(provider, signer, contractAddress);
} 