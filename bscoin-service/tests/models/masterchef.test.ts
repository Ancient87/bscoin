import { Asset } from "../../src-ts/domain/asset";
import { WhollyOwnedAsset } from "../../src-ts/domain/assetwhollyowned";
import { Masterchef } from "../../src-ts/domain/masterchef";
import { Network } from "../../src-ts/domain/network";
import { BaseNetwork, INetworkProps } from "../../src-ts/domain/networkbase";
import { Pool } from "../../src-ts/domain/pool";
import { IPoolProps } from "../../src-ts/domain/poolbase";
import { StableToken } from "../../src-ts/domain/tokenstable";
import "./fixtures/fixtures";
import {
  testTwoHundredDollarToken,
  testContract,
  testNetworkHundredBlocksPerDay,
  TEST_TOKENS_PER_BLOCK,
  BSC_NETWORK_BLOCKS_PER_DAY,
  testStableToken,
} from "./fixtures/fixtures";

var chai = require("chai");
var expect = chai.expect; // we are using the "expect" style of Chai
var assert = require("assert");

const bscNetworkForTestTemplate: INetworkProps = {
  id: "BSC_NETWORK",
  explorer: "TEST",
  endpoint: "TEST",
  blocksPerDay: BSC_NETWORK_BLOCKS_PER_DAY,
};

const poolForTestTemplate = {
  id: "TEST_POOL",
  tokensPerBlock: 10,
  rewardToken: testStableToken,
  weighting: 1,
  active: true,
};

describe("Masterchef", () => {
  const masterchefUnderTestTemplate = {
    id: "TEST",
    name: "TEST_EXCHANGE",
    rewardToken: testTwoHundredDollarToken,
    masterChef: testContract,
    network: testNetworkHundredBlocksPerDay,
    tokensPerBlock: TEST_TOKENS_PER_BLOCK,
  };

  describe("Yield calculation", () => {
    const yieldTestSpecs = [
      {
        networkOverrides: {
          blocksPerDay: BSC_NETWORK_BLOCKS_PER_DAY,
        },
        poolOverrides: {
          tokensPerBlock: 10,
          rewardToken: StableToken.createStableTokenWorth(2),
        },
        assetOverrides: {
          assetValue: 10000,
        },
        arguments: [1000],
        expected: [22727.27273, 45454.54545, 0.022],
      },
      {
        networkOverrides: {
          blocksPerDay: BSC_NETWORK_BLOCKS_PER_DAY,
        },
        poolOverrides: {
          tokensPerBlock: 10,
          rewardToken: StableToken.createStableTokenWorth(2),
        },
        assetOverrides: {
          assetValue: 10000,
        },
        arguments: [1],
        expected: [24.99750025, 49.9950005, 0.020002],
      },
    ];

    yieldTestSpecs.forEach((testSpec) => {
      const expected = testSpec.expected;
      const methodArguments = testSpec.arguments;
      const networkOverrides = testSpec.networkOverrides;
      const assetOverrides = testSpec.assetOverrides;
      const poolOverrides = testSpec.poolOverrides;

      const networkForTest = new Network({
        ...bscNetworkForTestTemplate,
        ...networkOverrides,
      });
      const masterChefUnderTest = new Masterchef({
        ...masterchefUnderTestTemplate,
        network: networkForTest,
      });
      const poolForTest = new Pool({
        ...poolForTestTemplate,
        ...poolOverrides,
        masterchef: masterChefUnderTest,
        stakedAsset: WhollyOwnedAsset.createAssetWorthUSD(
          assetOverrides.assetValue
        ),
      });

      it(`$${methodArguments[0]} added to a pool currently worth $${poolForTest.poolLiquidity} yields ${expected[0]} tokens per day`, () => {
        masterChefUnderTest.addPool(poolForTest);
        expect(
          masterChefUnderTest.specifiedPoolFutureTokensPerDayForUSD(
            poolForTest.id,
            methodArguments[0]
          )
        ).to.be.closeTo(expected[0], 0.01);
      });

      it(`$${methodArguments[0]} added to a pool printing ${
        poolForTest.tokensPerBlock * masterChefUnderTest.blocksPerDay
      } tokens per day and is currently worth $${
        poolForTest.poolLiquidity
      } yields $${expected[1]} USD per day if reward token is worth $${
        poolForTest.rewardToken.valuation
      }`, () => {
        masterChefUnderTest.addPool(poolForTest);
        expect(
          masterChefUnderTest.specifiedPoolFutureUSDPerDayForUSD(
            poolForTest.id,
            methodArguments[0]
          )
        ).to.be.closeTo(expected[1], 0.01);
      });

      it(`Owning $${methodArguments[0]} for ${
        methodArguments[0] /
        (poolForTest.stakedAsset.totalValue + methodArguments[0])
      } share of a pool printing $${
        poolForTest.tokensPerBlock * masterChefUnderTest.blocksPerDay
      } in tokens per day yields ${expected[2] * 100}% per day`, () => {
        masterChefUnderTest.addPool(poolForTest);
        expect(
          masterChefUnderTest.specifiedPoolFutureAPRPerDayForThousandUSD(
            poolForTest.id
          )
        ).to.be.closeTo(expected[2], 0.01);
      });
    });
  });
});
