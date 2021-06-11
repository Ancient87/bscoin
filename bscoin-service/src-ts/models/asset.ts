import { IAsset, IAssetConfig } from "./iasset";
import { IContract } from "./icontract";
import { IToken } from "./tokenbase";

export class Asset implements IAsset {
  firstToken: IToken;
  secondToken: IToken;
  firstTokenBalance: number;
  secondTokenBalance: number;

  constructor(config: IAssetConfig) {
    Object.assign(this, config);
  }

  get totalValue(): number {
    const firstTokenValue = this.firstToken.valuation * this.firstTokenBalance;
    const secondTokenValue =
      this.secondToken.valuation * this.secondTokenBalance;

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
