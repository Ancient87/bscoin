import { AggregateRoot } from "../common/aggregateroot";
import { percentageDifference } from "../common/mathhelper";
import { IContract } from "./icontract";
import { BaseNetwork } from "./networkbase";

export type ITokenProps = {
  id?: string;
  name: string;
  contract: IContract;
  totalSupply: number;
  valuation: number;
  network: BaseNetwork;
  emissionsPerBlock?: number;
};

export abstract class TokenBase extends AggregateRoot<ITokenProps> {
  constructor({ id, ...data }: ITokenProps) {
    super(data, id);
  }

  get marketCap(): number {
    return this.props.totalSupply * this.valuation;
  }

  get valuation(): number {
    return this.props.valuation;
  }

  get totalSupply(): number {
    return this.props.totalSupply;
  }

  get emissionsPerBlock(): number {
    return this.props.emissionsPerBlock ? this.props.emissionsPerBlock : 0;
  }

  get emissionsPerDay(): number {
    return this.props.network.blocksPerDay * this.emissionsPerBlock;
  }

  get valuationPostEmissions(): number {
    return this.marketCap / (this.totalSupply + this.emissionsPerDay);
  }

  get valuationInflationDueToEmissions(): number {
    return Math.abs(this.valuationPostEmissions - this.valuation);
  }

  get valuationInflationRateDueToEmissions(): number {
    return Math.abs(
      percentageDifference(this.valuation, this.valuationPostEmissions)
    );
  }
}
