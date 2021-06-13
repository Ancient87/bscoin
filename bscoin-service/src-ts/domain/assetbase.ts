import { IContract } from "./icontract";
import { TokenBase } from "./tokenbase";
import { AggregateRoot } from "../common/aggregateroot";

export type IAssetProps = {
  id?: string;
  firstToken: TokenBase;
  secondToken: TokenBase;
  firstTokenBalance: number;
  secondTokenBalance: number;
};

export abstract class BaseAsset extends AggregateRoot<IAssetProps> {
  constructor({ id, ...data }: IAssetProps) {
    super(data, id);
  }

  get firstToken() {
    return this.props.firstToken;
  }

  get secondToken() {
    return this.props.secondToken;
  }

  get firstTokenBalance() {
    return this.props.firstTokenBalance;
  }

  get secondTokenBalance() {
    return this.props.secondTokenBalance;
  }

  get totalValue(): number {
    const firstTokenValue =
      this.props.firstToken.valuation * this.props.firstTokenBalance;
    const secondTokenValue =
      this.props.secondToken.valuation * this.props.secondTokenBalance;

    return firstTokenValue + secondTokenValue;
  }

  futureAssetShareForDollarAmount(inputAmmount: number): number {
    const totalHypotheticalValue = this.totalValue + inputAmmount;
    const futureAssetShare = inputAmmount / totalHypotheticalValue;

    return futureAssetShare;
  }

  balanceOf(input: IContract): number {
    throw new Error("Method not implemented.");
  }
}
