import { ethers } from "ethers";
import { provider } from "../utils/provider";
import { MULTICALL_ADDRESS } from "../utils/constant";
import { MULTICALL_ABI } from "./abi/multicallAbi";

/**
 * Provides an instance of the Multicall contract.
 */

export const multicall = new ethers.Contract(MULTICALL_ADDRESS, MULTICALL_ABI, provider);
