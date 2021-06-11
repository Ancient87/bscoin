import { Exchange } from "../../../src-ts/models/exchange";
import { Address } from "../../../src-ts/models/address";
import { Contract } from "../../../src-ts/models/contract";
import { Token } from "../../../src-ts/models/token";
import { Network } from "../../../src-ts/models/network";
import { Asset } from "../../../src-ts/models/asset";
import { TestAsset } from "../../../src-ts/models/testasset";
import { Pool } from "../../../src-ts/models/pool";

export const TEST_NETWORK_BLOCKS_PER_DAY = 10000;
export const TEST_TOKENS_PER_BLOCK = 100;

export const testNetwork = new Network(
  "TEST_NETWORK",
  "TEST",
  "TEST",
  TEST_NETWORK_BLOCKS_PER_DAY
);

export const bscNetwork = new Network(
  "BSC_NETWORK",
  "TEST_BSC",
  "TEST_BSC",
  25000
);

export const testAddress = new Address("0xtest", testNetwork);
export const testContract = new Contract(testAddress);

export const testTwoHundredDollarToken = new Token({
  name: "TEST_BS_TOKEN",
  contract: testContract,
  totalSupply: 1000000,
  valuation: 200,
});

export const testStableToken = new Token({
  name: "TEST_BS_TOKEN",
  contract: testContract,
  totalSupply: 1000000,
  valuation: 1,
});

export const testAsset = new Asset({
  firstToken: testStableToken,
  secondToken: testTwoHundredDollarToken,
  firstTokenBalance: 1000,
  secondTokenBalance: 100,
});

export const testExchange = new Exchange({
  id: "TEST",
  name: "TEST_EXCHANGE",
  exchangeToken: testTwoHundredDollarToken,
  masterChef: testContract,
  network: testNetwork,
  tokensPerBlock: TEST_TOKENS_PER_BLOCK,
});

export const pantherSwapExchange = new Exchange({
  id: "TEST",
  name: "TEST_PANTHER",
  exchangeToken: testTwoHundredDollarToken,
  masterChef: testContract,
  network: bscNetwork,
  tokensPerBlock: 75,
});

const testAssetTenMillion = new TestAsset({
  _currentPoolTotalAsset: 10000000,
});

export const pantherSwapBusdPool = new Pool({
  exchange: testExchange,
  rewardToken: testTwoHundredDollarToken,
  stakedAsset: testAssetTenMillion,
  id: "PANTHER-BUSD",
  weighting: 0.1,
  depositFee: 0,
  tokensPerBlock: testExchange.tokensPerBlock * 40,
  active: true,
});
