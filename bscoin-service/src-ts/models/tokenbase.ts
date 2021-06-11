import { IContract } from "./icontract";

export type ITokenConfig = {
  name: string;
  contract: IContract;
  totalSupply: number;
  valuation: number;
};

export class TokenBase implements IToken {
  name: string;
  contract: IContract;
  totalSupply: number;
  valuation: number;

  constructor(tokenConfig: ITokenConfig) {
    Object.assign(this, tokenConfig);
  }

  marketCap(): number {
    return this.totalSupply * this.valuation;
  }
}

export interface IToken {
  name: string;
  contract: IContract;
  totalSupply: number;
  valuation: number;

  marketCap(): number;
}
