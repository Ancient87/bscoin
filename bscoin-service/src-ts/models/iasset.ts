import { IContract } from "./icontract";
import { IToken } from "./itoken";

export type IAssetConfig = {
  firstToken: IToken;
  secondToken: IToken;
  firstTokenBalance: number;
  secondTokenBalance: number;
}

export interface IAsset {
  firstToken: IToken;
  secondToken: IToken;
  firstTokenBalance: number;
  secondTokenBalance: number;

  futureAssetShareForDollarAmount(inputAmmount: number):number;
  assetBalanceOf(input: IContract): number;
}

