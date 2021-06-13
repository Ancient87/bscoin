import { AggregateRoot } from "../common/aggregateroot";
import { IContract } from "./icontract";
import { BaseNetwork } from "./networkbase";
import { BasePool } from "./poolbase";
import { TokenBase } from "./tokenbase";

export type IMasterchefProps = {
  id?: string;
  name: string;
  rewardToken: TokenBase;
  masterChef: IContract;
  network: BaseNetwork;
  //pools?: BasePool[];
  poolMap?: Map<string, BasePool>;
};

export class PoolNotFoundError extends Error {
  constructor() {
    super("Pool not found");
  }
}

export class BaseMasterchef extends AggregateRoot<IMasterchefProps> {
  constructor({ id, ...data }: IMasterchefProps) {
    super(data, id);
    this.props.poolMap = new Map<string, BasePool>();
  }

  get poolMap() {
    return this.props.poolMap;
  }

  public addPool(poolToAdd: BasePool) {
    this.poolMap.set(poolToAdd.id, poolToAdd);
  }

  public getPoolByID(poolId: string) {
    const pool = this.poolMap.get(poolId);
    if (!pool) {
      throw new PoolNotFoundError();
    }

    return pool;
  }
  get blocksPerDay(): number {
    return this.props.network.blocksPerDay;
  }

  get exchangeTokenPostInflationValue(): number {
    return this.exchangeToken.valuationInflationDueToEmissions;
  }

  get exchangeTokenDailyInflationRate(): number {
    return this.exchangeToken.valuationInflationRateDueToEmissions;
  }

  get network(): BaseNetwork {
    return this.props.network;
  }

  get exchangeToken(): TokenBase {
    return this.props.rewardToken;
  }

  get masterChef(): IContract {
    return this.props.masterChef;
  }

  specifiedPoolFutureAPRPerDayForThousandUSD(poolId: string): number {
    return 1000 / this.specifiedPoolFutureUSDPerDayForUSD(poolId, 1000);
  }

  specifiedPoolFutureUSDPerDayForUSD(
    poolId: string,
    addedLiquidityUSD: number
  ): number {
    const pool = this.getPoolByID(poolId);
    debugger;
    return (
      pool.rewardToken.valuation *
      this.specifiedPoolFutureTokensPerDayForUSD(poolId, addedLiquidityUSD)
    );
  }

  specifiedPoolFutureTokensPerDayForUSD(
    poolId: string,
    addedLiqudityUSD: number
  ): number {
    const pool = this.getPoolByID(poolId);
    return (
      this.blocksPerDay *
      pool.tokensPerBlockForShare(
        pool.futureLPsShareOfPoolForUSD(addedLiqudityUSD)
      )
    );
  }
}
