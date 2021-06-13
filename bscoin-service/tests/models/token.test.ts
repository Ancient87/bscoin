import { Network } from "../../src-ts/domain/network";
import { StableToken } from "../../src-ts/domain/tokenstable";
import "./fixtures/fixtures";
import {
  bscNetwork,
  testNetworkHundredBlocksPerDay,
  testStableToken,
} from "./fixtures/fixtures";
var chai = require("chai");
var expect = chai.expect; // we are using the "expect" style of Chai

describe("Token", () => {
  describe(`Token marketcap`, () => {
    const marketCapTestCases = [
      {
        args: {
          totalSupply: 1,
          valuation: 1,
        },
        expected: 1,
      },
      {
        args: {
          totalSupply: 10,
          valuation: 1.11,
        },
        expected: 11.1,
      },
    ];
    marketCapTestCases.forEach((testCase) => {
      const args = testCase.args;
      const expected = testCase.expected;
      it(`Should calculate marketCap of supply ${args.totalSupply} and valuation ${args.valuation} to be ${expected}`, () => {
        const tokenUnderTest = new StableToken({
          ...testStableToken.props,
          ...args,
        });

        expect(tokenUnderTest.marketCap).to.be.closeTo(expected, 0.001);
      });
    });
  });

  describe(`Emission and its caused inflation`, () => {
    const emissionInflationTestConditions = [
      {
        tokenConfig: {
          emissionsPerBlock: 10,
          totalSupply: 100,
          valuation: 100,
        },
        networConfig: {
          blocksPerDay: 10,
        },
        expected: [100, 50, 50, 50],
      },
      {
        tokenConfig: {
          emissionsPerBlock: 70,
          totalSupply: 20000000,
          valuation: 10,
        },
        networConfig: {
          ...bscNetwork.props,
        },
        expected: [1750000, 9.195402299, 0.8045977011, 8.045977011],
      },
      {
        tokenConfig: {
          emissionsPerBlock: 70,
          totalSupply: 235000000,
          valuation: 1.6,
        },
        networConfig: {
          ...bscNetwork.props,
        },
        expected: [1750000, 1.588173178, 0.01182682154, 0.74],
      },
    ];

    emissionInflationTestConditions.forEach((testCondition) => {
      const tokenConfig = testCondition.tokenConfig;
      const networkConfig = testCondition.networConfig;
      const networkForTest = new Network({
        ...testNetworkHundredBlocksPerDay.props,
        ...networkConfig,
      });
      const tokenUnderTest = new StableToken({
        ...testStableToken.props,
        ...tokenConfig,
        network: networkForTest,
      });

      it(`Token minting ${tokenConfig.emissionsPerBlock} per block on network emitting ${networkConfig.blocksPerDay} should be emitting ${testCondition.expected[0]}`, () => {
        expect(tokenUnderTest.emissionsPerDay).to.equal(
          testCondition.expected[0]
        );
      });

      it(`Token worth $${tokenUnderTest.valuation} at supply of ${
        tokenUnderTest.totalSupply
      } after emission of ${
        tokenConfig.emissionsPerBlock * networkConfig.blocksPerDay
      } should be worth $${testCondition.expected[1]}`, () => {
        expect(tokenUnderTest.valuationPostEmissions).to.be.closeTo(
          testCondition.expected[1],
          0.01
        );
      });

      it(`Token worth $${tokenUnderTest.valuation} at supply of ${
        tokenUnderTest.totalSupply
      } after emission of ${
        tokenConfig.emissionsPerBlock * networkConfig.blocksPerDay
      } should have lost $${testCondition.expected[2]}`, () => {
        expect(tokenUnderTest.valuationInflationDueToEmissions).to.be.closeTo(
          testCondition.expected[2],
          0.01
        );
      });

      it(`Token worth $${tokenUnderTest.valuation} at supply of ${
        tokenUnderTest.totalSupply
      } after emission of ${
        tokenConfig.emissionsPerBlock * networkConfig.blocksPerDay
      } should have lost ${testCondition.expected[3]}%`, () => {
        expect(
          tokenUnderTest.valuationInflationRateDueToEmissions
        ).to.be.closeTo(testCondition.expected[3], 0.01);
      });
    });
  });
});
