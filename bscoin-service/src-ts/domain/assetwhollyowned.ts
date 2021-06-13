import { BaseAsset } from "./assetbase";
import { IContract } from "./icontract";
import { BUSD_TOKEN } from "./tokenstable";

export class WhollyOwnedAsset extends BaseAsset {
  balanceOf(input: IContract): number {
    return this.totalValue;
  }

  static createAssetWorthUSD(assetValue: number): WhollyOwnedAsset {
    const eachPart = assetValue / 2;
    return new WhollyOwnedAsset({
      firstToken: BUSD_TOKEN,
      firstTokenBalance: eachPart,
      secondToken: BUSD_TOKEN,
      secondTokenBalance: eachPart,
    });
  }
}
