import { Pool } from "../../src-ts/domain/pool";
import {
  testTwoHundredDollarToken,
  testExchange,
  makeWhollyOwnedAssetWorth,
} from "./fixtures/fixtures";

var chai = require("chai");
var expect = chai.expect; // we are using the "expect" style of Chai

const whollyOwnedAssetWorthTenThousand = makeWhollyOwnedAssetWorth(10000);

describe("Pool", () => {
  describe("Test future share for added funds", () => {
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
      }% fure share`, () => {
        const poolUnderTest = new Pool(testCase.config);

        expect(
          poolUnderTest.futureLPsShareOfPoolForUSD(testCase.input)
        ).to.equal(testCase.expected);
      });
    });
  });

  describe("Test block based yield", () => {
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
        //expected: [9.090909091, 90909.09091],
        expected: [9.090909091],
      },
    ];

    testCases.forEach((testCase) => {
      it(`Should confirm that $${testCase.input} equals ${testCase.expected[0]} tokens per block`, () => {
        const poolUnderTest = new Pool(testCase.config);

        expect(
          poolUnderTest.futureLPsTokensPerBlockForUSD(testCase.input)
        ).to.closeTo(testCase.expected[0], 0.001);
      });
    });
  });

  describe("Test real yield calculation", () => {
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
      it(`Should confirm that per block interest accounting for inflation for $${testCase.input} equals $${testCase.expected} per day`, () => {
        const poolUnderTest = new Pool(testCase.config);

        expect(
          poolUnderTest.futureDailyDollarInterestForDollarAmount(testCase.input)
        ).to.closeTo(testCase.expected, 0.001);
      });
    });
  });
});
