import { Asset } from "../../src-ts/domain/asset";
import { WhollyOwnedAsset } from "../../src-ts/domain/assetwhollyowned";
import { Masterchef } from "../../src-ts/domain/masterchef";
import { Network } from "../../src-ts/domain/network";
import { BaseNetwork, INetworkProps } from "../../src-ts/domain/networkbase";
import { Pool } from "../../src-ts/domain/pool";
import { IPoolProps } from "../../src-ts/domain/poolbase";
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
        },
        assetOverrides: {
          assetValue: 10000,
        },
        arguments: [1000],
        expected: [22727.27273, 45454.54545],
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

      it(`Should confirm that $${methodArguments[0]} added to a pool currently worth $${poolForTest.poolLiquidity} yields ${expected[0]} tokens per day`, () => {
        masterChefUnderTest.addPool(poolForTest);
        debugger;
        expect(
          masterChefUnderTest.specifiedPoolFutureTokensPerDayForUSD(
            poolForTest.id,
            methodArguments[0]
          )
        ).to.be.closeTo(expected[0], 0.01);
      });

      it(`Should confirm that $${methodArguments[0]} added to a pool currently worth $${poolForTest.poolLiquidity} yields $${expected[1]} USD per day`, () => {
        masterChefUnderTest.addPool(poolForTest);
        debugger;
        expect(
          masterChefUnderTest.specifiedPoolFutureTokensPerDayForUSD(
            poolForTest.id,
            methodArguments[0]
          )
        ).to.be.closeTo(expected[0], 0.01);
      });
    });
  });
});
