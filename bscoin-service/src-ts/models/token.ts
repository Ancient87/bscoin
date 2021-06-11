import { IContract } from "./icontract";
import { ITokenConfig, TokenBase } from "./tokenbase";

export class Token extends TokenBase {
  name: string;
  contract: IContract;
  totalSupply: number;
  valuation: number;

  constructor(config: ITokenConfig) {
    super(config);
  }
}
