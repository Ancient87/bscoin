import { IAsset } from "./iasset";
import { IExchange } from "./iexchange";
import { IToken } from "./itoken";

export type IPoolConfig = {
  exchange: IExchange;
  rewardToken: IToken;
  stakedAsset: IAsset;
  id: string;
  weighting: number;
  depositFee: number;
  tokensPerBlock: number;
  active: boolean;
}

export interface IPool {
  exchange: IExchange;
  rewardToken: IToken;
  stakedAsset: IAsset;
  id: number;
  weighting: number;
  depositFee: number;
  tokensPerBlock: number;
  active: boolean;

  hypotheticalPoolShareForDollarAmount(inputAmmount: number): number;
  poolTokensPerBlockForShare(share: number): number;
  
}
