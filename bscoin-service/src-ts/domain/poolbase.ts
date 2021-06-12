import { BaseAsset } from "./assetbase";
import { IExchange } from "./exchangebase";
import { TokenBase } from "./tokenbase";

export type IPoolConfig = {
  exchange: IExchange;
  rewardToken: TokenBase;
  stakedAsset: BaseAsset;
  id: string;
  weighting: number;
  depositFee: number;
  tokensPerBlock: number;
  active: boolean;
};

export interface IPool {
  exchange: IExchange;
  rewardToken: TokenBase;
  stakedAsset: BaseAsset;
  id: number;
  weighting: number;
  depositFee: number;
  tokensPerBlock: number;
  active: boolean;

  futurePoolShareForDollarAmount(inputAmount: number): number;
  poolTokensPerBlockForShare(share: number): number;
  futurePoolTokensPerDayForDollarAmount(inputAmount: number): number;
  futureDailyInterestForDollarAmount(inputAmount: number): number;
}

export class BasePool implements IPool {
  exchange: IExchange;
  tokensPerBlock: number;
  rewardToken: TokenBase;
  stakedAsset: BaseAsset;
  id: number;
  weighting: number;
  depositFee: number;
  active: boolean;

  constructor(config: IPoolConfig) {
    Object.assign(this, config);
  }

  futureDailyInterestForDollarAmount(inputAmount: number): number {
    return (
      this.futurePoolTokensPerDayForDollarAmount(inputAmount) *
      this.exchange.exchangeTokenPostInflationValue()
    );
  }

  futurePoolTokensPerDayForDollarAmount(inputAmount: number): number {
    return (
      this.exchange.network.blocksPerDay *
      this.tokensPerBlock *
      this.futurePoolShareForDollarAmount(inputAmount)
    );
  }

  futurePoolShareForDollarAmount(inputAmmount: number): number {
    const currentPoolsBlanceOfAsset = this.stakedAsset.balanceOf(
      this.exchange.masterChef
    );
    const futureTotalStakedAssetAmount =
      currentPoolsBlanceOfAsset + inputAmmount;
    const inputsShareOfFuturePoolAsset =
      inputAmmount / futureTotalStakedAssetAmount;

    return inputsShareOfFuturePoolAsset;
  }

  poolTokensPerBlockForShare(share: number): number {
    return share * this.tokensPerBlock;
  }
}
