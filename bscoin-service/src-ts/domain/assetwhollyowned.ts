import { BaseAsset } from "./assetbase";
import { IContract } from "./icontract";

export class WhollyOwnedAsset extends BaseAsset {
  balanceOf(input: IContract): number {
    return this.totalValue;
  }
}
