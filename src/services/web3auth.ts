import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { NERO_CHAIN_CONFIG } from "@/config/nero";

export class Web3AuthService {
  private web3auth: Web3Auth;

  constructor() {
    this.web3auth = new Web3Auth({
      clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID || "",
      chainConfig: {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: NERO_CHAIN_CONFIG.chainId.toString(16),
        rpcTarget: NERO_CHAIN_CONFIG.rpcUrl,
        displayName: NERO_CHAIN_CONFIG.chainName,
        tickerName: NERO_CHAIN_CONFIG.currency,
        ticker: NERO_CHAIN_CONFIG.currency,
      },
      web3AuthNetwork: "testnet",
    });
  }

  async init() {
    await this.web3auth.initModal();
  }

  async connect() {
    try {
      const provider = await this.web3auth.connect();
      return provider;
    } catch (error) {
      console.error("Error connecting to Web3Auth:", error);
      throw error;
    }
  }

  async disconnect() {
    await this.web3auth.logout();
  }

  async getUserInfo() {
    return await this.web3auth.getUserInfo();
  }
} 