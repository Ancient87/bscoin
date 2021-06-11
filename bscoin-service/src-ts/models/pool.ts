import { IAsset } from "./iasset";
import { IContract } from "./icontract";
import { IExchange } from "./exchangebase";
import { BasePool } from "./poolbase";
import { IPoolConfig } from "./poolbase";
import { IToken } from "./tokenbase";

export class Pool extends BasePool {
  exchange: IExchange;
  tokensPerBlock: number;
  rewardToken: IToken;
  stakedAsset: IAsset;
  id: number;
  weighting: number;
  depositFee: number;
  active: boolean;

  constructor(config: IPoolConfig) {
    super(config);
  }
}
