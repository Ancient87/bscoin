import { IContract } from "./icontract";

export type ITokenConfig = {
  name: string;
  contract: IContract;
  totalSupply: number;
  quote: number;
}

export interface IToken {
  name: string;
  contract: IContract;
  totalSupply: number;
  quote: number;
}
