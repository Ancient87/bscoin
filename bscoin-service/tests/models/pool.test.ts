import { IPoolConfig } from "../../src-ts/models/ipool";
import { TestAsset } from "../../src-ts/models/testasset";
import { LPPool } from "../../src-ts/models/lppool";
import { testTwoHundredDollarToken, testExchange, testAsset } from "./fixtures/fixtures";
var itParam = require('mocha-param');

var chai = require("chai");
var expect = chai.expect; // we are using the "expect" style of Chai
var assert = require("assert");

const testAssetTenThousand = new TestAsset({
  _currentPoolTotalAsset: 10000
})

describe("Test hypothetical pool share for added funds", () => {    
  const testCases = [
        {
            config: {
              exchange: testExchange,
              rewardToken: testTwoHundredDollarToken,
              stakedAsset: testAssetTenThousand,
              id: "TEST",
              weighting: 0.1,
              depositFee: 0,
              tokensPerBlock: 100,
              active: true,
            }, 
            input: 1000,
            expected: 1000/11000,
        }
  ];

  testCases.forEach( (testCase) => {
    it(`Should confirm that $${testCase.input} equals ${testCase.expected*100}% hypotehtical share`, () => {

      const poolUnderTest = new LPPool(testCase.config);

      expect(poolUnderTest.hypotheticalPoolShareForDollarAmount(testCase.input))
        .to.equal(testCase.expected)
    });

  })
});
