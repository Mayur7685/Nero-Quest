import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { NERO_CHAIN_CONFIG, AA_PLATFORM_CONFIG, CONTRACT_ADDRESSES } from '@/config/nero';

interface NeroContextType {
  provider: ethers.providers.JsonRpcProvider | null;
  signer: ethers.Signer | null;
  aaWallet: any | null;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  createAAWallet: () => Promise<void>;
}

const NeroContext = createContext<NeroContextType | undefined>(undefined);

export function NeroProvider({ children }: { children: React.ReactNode }) {
  const [provider, setProvider] = useState<ethers.providers.JsonRpcProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [aaWallet, setAAWallet] = useState<any | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const initProvider = async () => {
      const provider = new ethers.providers.JsonRpcProvider(NERO_CHAIN_CONFIG.rpcUrl);
      setProvider(provider);
    };
    initProvider();
  }, []);

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        setProvider(provider);
        setSigner(signer);
        setIsConnected(true);
      } else {
        throw new Error('Please install MetaMask or another Web3 wallet');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  };

  const disconnectWallet = () => {
    setProvider(null);
    setSigner(null);
    setAAWallet(null);
    setIsConnected(false);
  };

  const createAAWallet = async () => {
    if (!signer) throw new Error('Please connect your wallet first');
    
    try {
      // Here we would implement the AA wallet creation logic
      // This is a placeholder for the actual implementation
      const aaWalletAddress = await signer.getAddress();
      setAAWallet({ address: aaWalletAddress });
    } catch (error) {
      console.error('Error creating AA wallet:', error);
      throw error;
    }
  };

  return (
    <NeroContext.Provider
      value={{
        provider,
        signer,
        aaWallet,
        isConnected,
        connectWallet,
        disconnectWallet,
        createAAWallet,
      }}
    >
      {children}
    </NeroContext.Provider>
  );
}

export function useNero() {
  const context = useContext(NeroContext);
  if (context === undefined) {
    throw new Error('useNero must be used within a NeroProvider');
  }
  return context;
} 