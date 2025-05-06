import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { useNero } from '@/contexts/NeroContext';
import { PaymasterService } from '@/services/paymaster';
import { CONTRACT_ADDRESSES } from '@/config/nero';

export function useAAWallet() {
  const { provider, signer, aaWallet } = useNero();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const paymasterService = new PaymasterService();

  const sendUserOperation = useCallback(async (target: string, data: string, value: string = '0') => {
    if (!signer || !aaWallet) {
      throw new Error('Wallet not connected');
    }

    setIsLoading(true);
    setError(null);

    try {
      const userOp = {
        sender: aaWallet.address,
        nonce: await provider?.getTransactionCount(aaWallet.address),
        initCode: '0x',
        callData: data,
        callGasLimit: '0',
        verificationGasLimit: '0',
        preVerificationGas: '0',
        maxFeePerGas: '0',
        maxPriorityFeePerGas: '0',
        paymasterAndData: '0x',
        signature: '0x',
      };

      // Get paymaster data
      const paymasterAndData = await paymasterService.getPaymasterAndData(userOp);
      userOp.paymasterAndData = paymasterAndData;

      // Estimate gas
      const gasEstimate = await paymasterService.estimateUserOperationGas(userOp);
      userOp.callGasLimit = gasEstimate.callGasLimit;
      userOp.verificationGasLimit = gasEstimate.verificationGasLimit;
      userOp.preVerificationGas = gasEstimate.preVerificationGas;

      // Send the user operation
      const response = await provider?.send('eth_sendUserOperation', [
        userOp,
        CONTRACT_ADDRESSES.entryPoint,
      ]);

      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [signer, aaWallet, provider]);

  return {
    sendUserOperation,
    isLoading,
    error,
  };
} 