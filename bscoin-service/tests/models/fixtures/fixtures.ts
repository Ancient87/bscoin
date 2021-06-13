import { Masterchef } from "../../../src-ts/domain/masterchef";
import { Address } from "../../../src-ts/domain/address";
import { Contract } from "../../../src-ts/domain/contract";
import { StableToken } from "../../../src-ts/domain/tokenstable";
import { Network } from "../../../src-ts/domain/network";
import { Asset } from "../../../src-ts/domain/asset";
import { WhollyOwnedAsset } from "../../../src-ts/domain/assetwhollyowned";
import { Pool } from "../../../src-ts/domain/pool";

export const TEST_NETWORK_BLOCKS_PER_DAY = 10000;
export const BSC_NETWORK_BLOCKS_PER_DAY = 25000;
export const TEST_TOKENS_PER_BLOCK = 100;

export const testNetworkHundredBlocksPerDay = new Network({
  id: "TEST_NETWORK",
  explorer: "TEST",
  endpoint: "TEST",
  blocksPerDay: TEST_NETWORK_BLOCKS_PER_DAY,
});

export const bscNetwork = new Network({
  id: "BSC_NETWORK",
  explorer: "TEST_BSC",
  endpoint: "TEST_BSC",
  blocksPerDay: 25000,
});

export const testAddress = new Address(
  "0xtest",
  testNetworkHundredBlocksPerDay
);
export const testContract = new Contract(testAddress);

export const testTwoHundredDollarToken = new StableToken({
  name: "TEST_BS_TOKEN",
  contract: testContract,
  totalSupply: 1000000,
  valuation: 200,
  network: testNetworkHundredBlocksPerDay,
});

export const testStableToken = new StableToken({
  name: "TEST_BS_TOKEN",
  contract: testContract,
  totalSupply: 1000000,
  valuation: 1,
  network: testNetworkHundredBlocksPerDay,
});

export const testAsset = new Asset({
  firstToken: testStableToken,
  secondToken: testTwoHundredDollarToken,
  firstTokenBalance: 1000,
  secondTokenBalance: 100,
});

export const testExchange = new Masterchef({
  id: "TEST",
  name: "TEST_EXCHANGE",
  rewardToken: testTwoHundredDollarToken,
  masterChef: testContract,
  network: testNetworkHundredBlocksPerDay,
});

export const makeWhollyOwnedAssetWorth = (desiredWorth: number): Asset => {
  return new WhollyOwnedAsset({
    ...makeAssetWorth(desiredWorth).props,
  });
};

export const makeAssetWorth = (desiredWorth: number): Asset => {
  return new Asset({
    ...testAsset.props,
    firstToken: testStableToken,
    secondToken: testStableToken,
    firstTokenBalance: desiredWorth / 2,
    secondTokenBalance: desiredWorth / 2,
  });
};

const testAssetTenMillion = makeAssetWorth(10000000);

export const pantherSwapBusdPool = new Pool({
  masterchef: testExchange,
  rewardToken: testTwoHundredDollarToken,
  stakedAsset: testAssetTenMillion,
  id: "PANTHER-BUSD",
  weighting: 0.1,
  depositFee: 0,
  tokensPerBlock: testStableToken.emissionsPerBlock * 40,
  active: true,
});
