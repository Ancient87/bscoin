import { IContract } from "./icontract";
import { INetwork } from "./inetwork";
import { BasePool } from "./poolbase";
import { TokenBase } from "./tokenbase";

export type IExchangeConfig = {
  id: string;
  name: string;
  exchangeToken: TokenBase;
  masterChef: IContract;
  network: INetwork;
  tokensPerBlock: number;
};

export interface IExchange {
  id: string;
  name: string;
  exchangeToken: TokenBase;
  masterChef: IContract;
  network: INetwork;
  pools: BasePool[];
  tokensPerBlock: number;

  tokensPerDay(): number;
  exchangeTokenPostInflationValue(): number;
  exchangeTokenDailyInflationRate(): number;
}

export class BaseExchange implements IExchange {
  id: string;
  name: string;
  exchangeToken: TokenBase;
  masterChef: IContract;
  network: INetwork;
  tokensPerBlock: number;
  pools: BasePool[];

  constructor(config: IExchangeConfig) {
    Object.assign(this, config);
    this.pools = new Array<BasePool>();
  }

  exchangeTokenPostInflationValue(): number {
    const futureExchangeTokenSupply =
      this.exchangeToken.totalSupply + this.tokensPerDay();

    return this.exchangeToken.marketCap / futureExchangeTokenSupply;
  }

  exchangeTokenDailyInflationRate(): number {
    return Math.abs(
      (this.exchangeTokenPostInflationValue() - this.exchangeToken.valuation) /
        this.exchangeToken.valuation
    );
  }

  tokensPerDay(): number {
    return this.tokensPerBlock * this.network.blocksPerDay;
  }
}
