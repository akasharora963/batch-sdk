import { ethers } from "ethers";
import { multicall } from "../contracts/multicall"; 

export class BatchProcessor {


  /**
   * Retrieves the native ETH balances for a list of addresses.
   * 
   * @param addresses - An array of Ethereum addresses to fetch balances for.
   * @returns A promise that resolves to an array of objects, each containing an address and its corresponding balance in ETH.
   *          If an error occurs during balance retrieval, the balance is set to "0" for that address.
   */

  async getNativeBalances(addresses: string[]): Promise<{ address: string; balance: string }[]> {
    if (!addresses.length) return [];

    // 🔹 Perform individual `staticCall` for each address
    const results = await Promise.all(
      addresses.map(async (address) => {
        try {
          const balance = await multicall.getFunction("getEthBalance").staticCall(address);
          return { address, balance: ethers.formatEther(balance) };
        } catch (error) {
          //console.error(`Failed to fetch balance for ${address}:`, error);
          return { address, balance: "0" }; 
        }
      })
    );

    return results;
  }
}
