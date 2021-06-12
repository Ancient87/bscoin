import { Exchange } from "../../../src-ts/domain/exchange";
import { Address } from "../../../src-ts/domain/address";
import { Contract } from "../../../src-ts/domain/contract";
import { Token } from "../../../src-ts/domain/token";
import { Network } from "../../../src-ts/domain/network";
import { Asset } from "../../../src-ts/domain/asset";
import { WhollyOwnedAsset } from "../../../src-ts/domain/assetwhollyowned";
import { Pool } from "../../../src-ts/domain/pool";

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
  exchange: testExchange,
  rewardToken: testTwoHundredDollarToken,
  stakedAsset: testAssetTenMillion,
  id: "PANTHER-BUSD",
  weighting: 0.1,
  depositFee: 0,
  tokensPerBlock: testExchange.tokensPerBlock * 40,
  active: true,
});
