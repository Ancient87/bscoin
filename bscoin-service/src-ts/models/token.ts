import { IContract } from "./icontract";
import { IToken, ITokenConfig } from "./itoken";

export class Token implements IToken {
  name: string;
  contract: IContract;
  totalSupply: number;
  quote: number;

  constructor(config: ITokenConfig) {
    Object.assign(this, config);
  }
  
}
