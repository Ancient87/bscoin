import "./fixtures/fixtures";
import {
  testTwoHundredDollarToken,
  testContract,
  testNetworkHundredBlocksPerDay,
  TEST_TOKENS_PER_BLOCK,
} from "./fixtures/fixtures";

var chai = require("chai");
var expect = chai.expect; // we are using the "expect" style of Chai
var assert = require("assert");

const exchangeUnderTestTemplate = {
  id: "TEST",
  name: "TEST_EXCHANGE",
  exchangeToken: testTwoHundredDollarToken,
  masterChef: testContract,
  network: testNetworkHundredBlocksPerDay,
  tokensPerBlock: TEST_TOKENS_PER_BLOCK,
};

describe("Exchange", () => {});
