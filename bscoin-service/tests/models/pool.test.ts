import { Pool } from "../../src-ts/domain/pool";
import {
  testTwoHundredDollarToken,
  testExchange,
  makeWhollyOwnedAssetWorth,
} from "./fixtures/fixtures";

var chai = require("chai");
var expect = chai.expect; // we are using the "expect" style of Chai

const whollyOwnedAssetWorthTenThousand = makeWhollyOwnedAssetWorth(10000);

describe("Test future pool share for added funds", () => {
  const testCases = [
    {
      config: {
        exchange: testExchange,
        rewardToken: testTwoHundredDollarToken,
        stakedAsset: whollyOwnedAssetWorthTenThousand,
        id: "TEST",
        weighting: 0.1,
        depositFee: 0,
        tokensPerBlock: 100,
        active: true,
      },
      input: 1000,
      expected: 1000 / 11000,
    },
  ];

  testCases.forEach((testCase) => {
    it(`Should confirm that $${testCase.input} equals ${
      testCase.expected * 100
    }% hypotehtical share`, () => {
      const poolUnderTest = new Pool(testCase.config);

      expect(
        poolUnderTest.futurePoolShareForDollarAmount(testCase.input)
      ).to.equal(testCase.expected);
    });
  });
});

describe("Test future tokens per day for added funds", () => {
  const testCases = [
    {
      config: {
        exchange: testExchange,
        rewardToken: testTwoHundredDollarToken,
        stakedAsset: whollyOwnedAssetWorthTenThousand,
        id: "TEST",
        weighting: 0.1,
        depositFee: 0,
        tokensPerBlock: 100,
        active: true,
      },
      input: 1000,
      expected: (1000 / 11000) * 100 * testExchange.network.blocksPerDay,
    },
  ];

  testCases.forEach((testCase) => {
    it(`Should confirm that $${testCase.input} equals ${testCase.expected} tokens per day`, () => {
      const poolUnderTest = new Pool(testCase.config);

      expect(
        poolUnderTest.futurePoolTokensPerDayForDollarAmount(testCase.input)
      ).to.closeTo(testCase.expected, 0.001);
    });
  });
});

describe("Test real APR calculation", () => {
  const testCases = [
    {
      config: {
        exchange: testExchange,
        rewardToken: testTwoHundredDollarToken,
        stakedAsset: whollyOwnedAssetWorthTenThousand,
        id: "TEST",
        weighting: 0.1,
        depositFee: 0,
        tokensPerBlock: 100,
        active: true,
      },
      input: 1000,
      expected: 200,
    },
  ];

  testCases.forEach((testCase) => {
    it(`Should confirm that daily interest accounting for inflation for $${testCase.input} equals $${testCase.expected} per day`, () => {
      const poolUnderTest = new Pool(testCase.config);

      expect(
        poolUnderTest.futureDailyInterestForDollarAmount(testCase.input)
      ).to.closeTo(testCase.expected, 0.001);
    });
  });
});
