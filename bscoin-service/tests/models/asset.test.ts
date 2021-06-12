import { Asset } from "../../src-ts/domain/asset";
import { BaseAsset } from "../../src-ts/domain/assetbase";

import {
  testTwoHundredDollarToken,
  testExchange,
  testAsset,
  testStableToken,
} from "./fixtures/fixtures";

var itParam = require("mocha-param");
var chai = require("chai");
var expect = chai.expect; // we are using the "expect" style of Chai
var assert = require("assert");

describe("Test that pool totalValue is sum of both balances", () => {
  const valueTestCases = [
    {
      config: {
        firstToken: testStableToken,
        secondToken: testTwoHundredDollarToken,
        firstTokenBalance: 100,
        secondTokenBalance: 100 / 200,
      },
      expected: 200,
    },
  ];

  valueTestCases.forEach((testCase) => {
    it(`should compute totalValue for ${testCase.config.firstToken.valuation} * ${testCase.config.firstTokenBalance} + ${testCase.config.secondToken.valuation} * ${testCase.config.secondTokenBalance} to be ${testCase.expected}`, () => {
      const assetUnderTest = new Asset({
        ...testCase.config,
      });

      expect(assetUnderTest.totalValue).to.equal(testCase.expected);
    });
  });
});

describe("Test future asset share for future added liquidity", () => {
  const futureAssetShareTestCases = [
    {
      config: {
        firstToken: testStableToken,
        secondToken: testTwoHundredDollarToken,
        firstTokenBalance: 100,
        secondTokenBalance: 100 / 200,
      },
      args: [1000],
      expected: 1000 / (200 + 1000),
    },
  ];

  futureAssetShareTestCases.forEach((testCase) => {
    const assetUnderTest = new Asset({
      ...testCase.config,
    });
    it(`Adding $${testCase.args[0]} to a then future pool of value ${
      assetUnderTest.totalValue + testCase.args[0]
    } should give ${testCase.expected * 100}% share`, () => {
      expect(
        assetUnderTest.futureAssetShareForDollarAmount(testCase.args[0])
      ).to.equal(testCase.expected);
    });
  });
});
