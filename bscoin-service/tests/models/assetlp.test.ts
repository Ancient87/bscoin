import { LPAsset, TokenNotFoundInLpError } from "../../src-ts/domain/assetlp";
import { TokenBase } from "../../src-ts/domain/tokenbase";
import { StableToken } from "../../src-ts/domain/tokenstable";
import "./fixtures/fixtures";
import {
  bscNetwork,
  testContract,
  testStableToken,
  testTwoHundredDollarToken,
} from "./fixtures/fixtures";
var chai = require("chai");
var expect = chai.expect; // we are using the "expect" style of Chai

describe("LPAsset", () => {
  describe("Relative valuation", () => {
    const relativeValuationTestConditions = [
      {
        assetOverride: {
          firstToken: testStableToken,
          secondToken: testStableToken,
          firstTokenBalance: 100,
          secondTokenBalance: 1,
        },
        expected: {
          ratio: 100,
          secondTokenValuation: 100,
        },
      },
      {
        assetOverride: {
          firstToken: testStableToken,
          secondToken: testTwoHundredDollarToken,
          firstTokenBalance: 100,
          secondTokenBalance: 20,
        },
        expected: {
          ratio: 5,
          secondTokenValuation: 1000,
        },
      },
      //Reversed order
      {
        assetOverride: {
          firstToken: testStableToken,
          secondToken: testStableToken,
          firstTokenBalance: 1,
          secondTokenBalance: 100,
        },
        expected: {
          ratio: 0.01,
          secondTokenValuation: 0.01,
        },
      },
      {
        assetOverride: {
          firstToken: testStableToken,
          secondToken: testTwoHundredDollarToken,
          firstTokenBalance: 20,
          secondTokenBalance: 100,
        },
        expected: {
          ratio: 0.2,
          secondTokenValuation: 40,
        },
      },
    ];
    relativeValuationTestConditions.forEach((testCondition) => {
      const { assetOverride, expected } = testCondition;
      const assetUnderTest = new LPAsset({
        ...assetOverride,
      });

      it(`${assetOverride.firstTokenBalance} of token1 @ $${assetOverride.firstToken.valuation} means token2 ${assetOverride.secondTokenBalance} is worth ${expected["ratio"]} times token1`, () => {
        expect(
          assetUnderTest.relativeValueToOther(assetOverride.firstToken)
        ).equals(expected["ratio"]);
      });

      it(`${assetOverride.firstTokenBalance} of token1 @ $${assetOverride.firstToken.valuation} means ${assetOverride.secondTokenBalance} of token2 is worth $${expected["secondTokenValuation"]}`, () => {
        expect(assetUnderTest.valuationBasedOnOther(testStableToken)).equals(
          expected["secondTokenValuation"]
        );
      });

      it(`Should trow an error if neither of the tokens provided are in the LP`, () => {
        const foreignToken = new StableToken({
          name: "lala",
          contract: testContract,
          totalSupply: 10,
          valuation: 1,
          network: bscNetwork,
        });
        expect(() => {
          assetUnderTest.valuationBasedOnOther(foreignToken);
        }).to.throw(TokenNotFoundInLpError);
      });
    });
  });
});
