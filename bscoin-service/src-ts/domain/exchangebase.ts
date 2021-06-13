import { AggregateRoot } from "../common/aggregateroot";
import { IContract } from "./icontract";
import { BaseNetwork } from "./networkbase";
import { BasePool } from "./poolbase";
import { TokenBase } from "./tokenbase";

export type IExchangeProps = {
  id?: string;
  name: string;
  exchangeToken: TokenBase;
  masterChef: IContract;
  network: BaseNetwork;
  pools?: BasePool[];
};

export class BaseExchange extends AggregateRoot<IExchangeProps> {
  constructor({ id, ...data }: IExchangeProps) {
    super(data, id);
    this.props.pools = new Array<BasePool>();
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
    return this.props.exchangeToken;
  }

  get masterChef(): IContract {
    return this.props.masterChef;
  }
}
