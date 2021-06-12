import { AggregateRoot } from "../common/aggregateroot";
import { Entity } from "../common/entity";
import { IContract } from "./icontract";

export type ITokenProps = {
  id?: string;
  name: string;
  contract: IContract;
  totalSupply: number;
  valuation: number;
};

export abstract class TokenBase extends AggregateRoot<ITokenProps> {
  constructor({ id, ...data }: ITokenProps) {
    super(data, id);
  }

  get marketCap(): number {
    return this._props.totalSupply * this._props.valuation;
  }

  get valuation(): number {
    return this._props.valuation;
  }

  get totalSupply(): number {
    return this._props.totalSupply;
  }
}
