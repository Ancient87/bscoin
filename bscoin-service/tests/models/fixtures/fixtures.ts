import { Exchange } from "../../../src-ts/models/exchange";
import { Address } from "../../../src-ts/models/address";
import { Contract } from "../../../src-ts/models/contract";
import { Token } from "../../../src-ts/models/token";
import { Network } from "../../../src-ts/models/network";
import { Asset } from "../../../src-ts/models/asset";
import { LPPool } from "../../../src-ts/models/lppool";

export const TEST_NETWORK_BLOCKS_PER_DAY = 10000;
export const TEST_TOKENS_PER_BLOCK = 100;

export const testNetwork = new Network(
  "TEST_NETWORK",
  "TEST",
  "TEST",
  TEST_NETWORK_BLOCKS_PER_DAY,
);
export const testAddress = new Address("0xtest", testNetwork);
export const testContract = new Contract(testAddress);

export const testTwoHundredDollarToken = new Token({
  name:"TEST_BS_TOKEN", 
  contract: testContract, 
  totalSupply: 1000000,
  quote: 200,
});

export const testStableToken = new Token({
  name:"TEST_BS_TOKEN", 
  contract: testContract, 
  totalSupply: 1000000,
  quote: 1,
});


export const testAsset = new Asset({
  firstToken: testStableToken,
  secondToken: testTwoHundredDollarToken,
  firstTokenBalance: 1000,
  secondTokenBalance: 100
});

export const testExchange = new Exchange(
  {
    id: "TEST",
    name: "TEST_EXCHANGE",
    bsToken: testTwoHundredDollarToken,
    masterChef: testContract,
    network: testNetwork,
    tokensPerBlock: TEST_TOKENS_PER_BLOCK,
  });