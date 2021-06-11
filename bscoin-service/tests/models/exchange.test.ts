import { Exchange } from "../../src-ts/models/exchange";
import "./fixtures/fixtures";
import { testTwoHundredDollarToken, testContract, testNetwork, TEST_TOKENS_PER_BLOCK } from "./fixtures/fixtures";

var chai = require("chai");
var expect = chai.expect; // we are using the "expect" style of Chai
var assert = require("assert");

describe("Exchange Test", () => {
  it("should calculate correct tokens per day", () => {

  const exchangeUnderTest = new Exchange(
    {
    id: "TEST",
    name: "TEST_EXCHANGE",
    bsToken: testTwoHundredDollarToken,
    masterChef: testContract,
    network: testNetwork,
    tokensPerBlock: TEST_TOKENS_PER_BLOCK,
  });
  
  expect(exchangeUnderTest.getTokensPerDay()).to.equal(
    TEST_TOKENS_PER_BLOCK*testNetwork.blocksPerDay
  );

  });
});
