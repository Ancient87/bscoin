import { Exchange } from "../../src-ts/models/exchange";
import { Token } from "../../src-ts/models/token";
import "./fixtures/fixtures";
import {
  testTwoHundredDollarToken,
  testContract,
  testNetwork,
  TEST_TOKENS_PER_BLOCK,
  testStableToken,
} from "./fixtures/fixtures";

var chai = require("chai");
var expect = chai.expect; // we are using the "expect" style of Chai
var assert = require("assert");

const exchangeUnderTestTemplate = {
  id: "TEST",
  name: "TEST_EXCHANGE",
  exchangeToken: testTwoHundredDollarToken,
  masterChef: testContract,
  network: testNetwork,
  tokensPerBlock: TEST_TOKENS_PER_BLOCK,
};

describe("Test token emission", () => {
  const expectedTokensPerDay = TEST_TOKENS_PER_BLOCK * testNetwork.blocksPerDay;

  it(`should calculate correct ${expectedTokensPerDay} tokens emitted per day`, () => {
    const exchangeUnderTest = new Exchange(exchangeUnderTestTemplate);

    expect(exchangeUnderTest.tokensPerDay()).to.equal(expectedTokensPerDay);
  });
});

describe(`Test token inflation`, () => {
  const inflationTestCases = [
    {
      args: {
        tokensPerBlock: 100,
        currentSupply: 1000000,
        exchangeToken: testStableToken,
      },
      expected: [0.5, 0.5],
    },
    {
      args: {
        tokensPerBlock: 100,
        currentSupply: 100,
        exchangeToken: testStableToken,
      },
      expected: [0.0000999900009999, 0.99990001],
    },
  ];

  inflationTestCases.forEach((testCase) => {
    const augmentedExchangeToken = new Token({
      ...testStableToken,
      totalSupply: testCase.args.currentSupply,
    });

    const exchangeUnderTest = new Exchange({
      ...exchangeUnderTestTemplate,
      exchangeToken: augmentedExchangeToken,
      tokensPerBlock: testCase.args.tokensPerBlock,
    });

    it(`should estimate deflated token value of ${testCase.expected[0]}`, () => {
      expect(exchangeUnderTest.exchangeTokenPostInflationValue()).to.be.closeTo(
        testCase.expected[0],
        0.01
      );
    });

    it(`should estimate a token inflation of ${
      testCase.expected[1] * 100
    }%`, () => {
      expect(exchangeUnderTest.exchangeTokenDailyInflationRate()).to.be.closeTo(
        testCase.expected[1],
        0.01
      );
    });
  });
});
