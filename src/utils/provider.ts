import { ethers } from "ethers";
import { config } from "dotenv";

config();

if (!process.env.PRIVATE_KEY || !process.env.RPC_URL) {
  throw new Error("Missing PRIVATE_KEY or RPC_URL in environment variables.");
}

/**
 * Provides a configured Ethereum provider and signer.
 */
export const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
export const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || "", provider);
export const signer = wallet.connect(provider);
