import { isArgumentsObject } from "util/types";
import { Token } from "../../src-ts/domain/token";
import "./fixtures/fixtures";
import { testStableToken } from "./fixtures/fixtures";
var chai = require("chai");
var expect = chai.expect; // we are using the "expect" style of Chai

describe(`Test token math`, () => {
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
      const tokenUnderTest = new Token({
        ...testStableToken.props,
        ...args,
      });

      expect(tokenUnderTest.marketCap).to.be.closeTo(expected, 0.001);
    });
  });
});
