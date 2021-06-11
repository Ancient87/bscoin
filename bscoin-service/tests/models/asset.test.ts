import { Asset } from "../../src-ts/models/asset";
import { IAssetConfig } from "../../src-ts/models/iasset";
import { IPoolConfig } from "../../src-ts/models/poolbase";

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

describe("Test totalValue", () => {
  const testCases = [
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

  itParam(
    `should compute correct totalValue ${testCases}`,
    testCases,
    (testCase: { config: IAssetConfig; expected: any }) => {
      const assetUnderTest = new Asset({
        ...testCase.config,
      });

      expect(assetUnderTest.totalValue).to.equal(testCase.expected);
    }
  );
});

describe("Test asset share for hypothetical added liquidity", () => {
  const testCases = [
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
  itParam(
    `should compute correct hypotheticalshare ${testCases}`,
    testCases,
    (testCase: { config: IAssetConfig; args: number[]; expected: any }) => {
      const assetUnderTest = new Asset({
        ...testCase.config,
      });

      expect(
        assetUnderTest.futureAssetShareForDollarAmount(testCase.args[0])
      ).to.equal(testCase.expected);
    }
  );
});
