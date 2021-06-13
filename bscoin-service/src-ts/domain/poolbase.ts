import { Entity } from "../common/entity";
import { BaseAsset } from "./assetbase";
import { BaseMasterchef } from "./masterchefbase";
import { TokenBase } from "./tokenbase";

export type IPoolProps = {
  id?: string;
  masterchef: BaseMasterchef;
  rewardToken: TokenBase;
  stakedAsset: BaseAsset;
  weighting: number;
  depositFee?: number;
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

  get masterchef(): BaseMasterchef {
    return this.props.masterchef;
  }

  futureDailyDollarInterestForDollarAmountAccountingForInflation(
    inputAmount: number
  ): number {
    return (
      this.futureDailyDollarInterestForDollarAmount(inputAmount) *
      this.props.masterchef.exchangeTokenPostInflationValue
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
    const futurePoolLiquidity = this.poolLiquidity + addedLiquidityUSD;
    return addedLiquidityUSD / futurePoolLiquidity;
  }

  get poolLiquidity(): number {
    return this.stakedAsset.balanceOf(this.props.masterchef.masterChef);
  }

  get tokensPerBlock(): number {
    return this.props.tokensPerBlock;
  }

  tokensPerBlockForShare(share: number): number {
    return share * this.tokensPerBlock;
  }
}
