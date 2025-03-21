import { ethers } from "ethers";
import { BatchProcessor } from "../src/service/BatchProcessor";
import { multicall } from "../src/contracts/multicall";

// 🟢 Mock `multicall.getFunction` and ensure it returns a proper object
jest.mock("../src/contracts/multicall", () => ({
  multicall: {
    getFunction: jest.fn()
  }
}));

describe("BatchProcessor", () => {
  let batchProcessor: BatchProcessor;
  let staticCallMock: jest.Mock;

  beforeEach(() => {
    batchProcessor = new BatchProcessor();
    staticCallMock = jest.fn(); // Mock for `staticCall`

    // 🔹 Ensure `getFunction("getEthBalance")` returns an object with `staticCall`
    (multicall.getFunction as jest.Mock).mockReturnValue({
      staticCall: staticCallMock
    });
  });

  it("should return correct balances for multiple addresses", async () => {
    // 🟢 Mock `staticCall` return values
    staticCallMock
      .mockResolvedValueOnce(ethers.toBigInt(ethers.parseEther("1.5"))) // Address 1
      .mockResolvedValueOnce(ethers.toBigInt(ethers.parseEther("2.75"))); // Address 2

    const addresses = ["0x123...", "0x456..."];
    const result = await batchProcessor.getNativeBalances(addresses);

    expect(result).toEqual([
      { address: "0x123...", balance: "1.5" },
      { address: "0x456...", balance: "2.75" }
    ]);
  });

  it("should handle RPC errors and return '0' for failed balances", async () => {
    staticCallMock
      .mockRejectedValueOnce(new Error("RPC Error")) // First address fails
      .mockResolvedValueOnce(ethers.toBigInt(ethers.parseEther("1.25"))); // Second address succeeds

    const addresses = ["0x123...", "0x456..."];
    const result = await batchProcessor.getNativeBalances(addresses);

    expect(result).toEqual([
      { address: "0x123...", balance: "0" }, // Error case
      { address: "0x456...", balance: "1.25" } // Successful case
    ]);
  });

  it("should return an empty array when given no addresses", async () => {
    const result = await batchProcessor.getNativeBalances([]);
    expect(result).toEqual([]);
  });
});
