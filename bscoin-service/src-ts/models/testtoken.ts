import { setupMaster } from "cluster";
import { IContract } from "./icontract";
import { TokenBase, ITokenConfig } from "./tokenbase";

export type ITestTokenConfig = ITokenConfig & {};

export class TestToken extends TokenBase {
  name: string;
  contract: IContract;
  totalSupply: number;
  valuation: number;

  constructor(config: ITestTokenConfig) {
    super(config);
  }
  marketCap(): number {
    throw new Error("Method not implemented.");
  }
}
