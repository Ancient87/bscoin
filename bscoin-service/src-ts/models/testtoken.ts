import { IContract } from "./icontract";
import { IToken, ITokenConfig } from "./itoken";

export type ITestTokenConfig = ITokenConfig & {
}

export class TestToken implements IToken {
  name: string;
  contract: IContract;
  totalSupply: number;
  quote: number;

  constructor(config: ITestTokenConfig) {
    Object.assign(this, config);
  }
}
