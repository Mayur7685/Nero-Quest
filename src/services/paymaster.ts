import { ethers } from 'ethers';
import { AA_PLATFORM_CONFIG } from '@/config/nero';

export class PaymasterService {
  private provider: ethers.providers.JsonRpcProvider;

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(AA_PLATFORM_CONFIG.paymasterRpc);
  }

  async getPaymasterAndData(userOp: any): Promise<string> {
    try {
      const response = await this.provider.send('pm_sponsorUserOperation', [
        userOp,
        AA_PLATFORM_CONFIG.paymasterRpc,
      ]);
      return response.paymasterAndData;
    } catch (error) {
      console.error('Error getting paymaster data:', error);
      throw error;
    }
  }

  async estimateUserOperationGas(userOp: any): Promise<any> {
    try {
      const response = await this.provider.send('eth_estimateUserOperationGas', [
        userOp,
        AA_PLATFORM_CONFIG.paymasterRpc,
      ]);
      return response;
    } catch (error) {
      console.error('Error estimating gas:', error);
      throw error;
    }
  }
} 