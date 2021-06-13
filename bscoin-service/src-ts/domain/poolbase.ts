import { throws } from "assert/strict";
import { Entity } from "../common/entity";
import { BaseAsset } from "./assetbase";
import { BaseExchange } from "./exchangebase";
import { TokenBase } from "./tokenbase";

export type IPoolProps = {
  id?: string;
  exchange: BaseExchange;
  rewardToken: TokenBase;
  stakedAsset: BaseAsset;
  weighting: number;
  depositFee: number;
  tokensPerBlock: number;
  active: boolean;
};

export class BasePool extends Entity<IPoolProps> {
  constructor({ id, ...data }: IPoolProps) {
    super(data, id);
  }

  get stakedAsset(): BaseAsset {
    return this.props.stakedAsset;
  }

  get rewardToken(): TokenBase {
    return this.props.rewardToken;
  }

  get exchange(): BaseExchange {
    return this.props.exchange;
  }

  futureDailyDollarInterestForDollarAmountAccountingForInflation(
    inputAmount: number
  ): number {
    return (
      this.futureDailyDollarInterestForDollarAmount(inputAmount) *
      this.props.exchange.exchangeTokenPostInflationValue
    );
  }

  futureDailyDollarInterestForDollarAmount(addedLiquidityUSD: number): number {
    return this.futureLPsTokensPerBlockForUSD(addedLiquidityUSD);
  }

  futureLPsTokensPerBlockForUSD(addedLiqudityUSD: number): number {
    return this.tokensPerBlockForShare(
      this.futureLPsShareOfPoolForUSD(addedLiqudityUSD)
    );
  }

  futureLPsShareOfPoolForUSD(addedLiquidityUSD: number): number {
    const futurePoolLiquidity =
      this.stakedAsset.balanceOf(this.props.exchange.masterChef) +
      addedLiquidityUSD;
    return addedLiquidityUSD / futurePoolLiquidity;
  }

  get tokensPerBlock(): number {
    return this.props.tokensPerBlock;
  }

  tokensPerBlockForShare(share: number): number {
    return share * this.tokensPerBlock;
  }
}
