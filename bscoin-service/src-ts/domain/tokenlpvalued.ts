import { LPAsset } from "./assetlp";
import { ITokenProps, TokenBase } from "./tokenbase";

export type ITokenLPValuedProps = ITokenProps & {
  valuationPool: LPAsset;
};

class LPValuedToken extends TokenBase {
  constructor(data: ITokenLPValuedProps) {
    super(data);
    this.valuationPool = data.valuationPool;
  }

  get valuationPool() {
    return this.valuationPool;
  }

  set valuationPool(valuationPool: LPAsset) {
    this.valuationPool = valuationPool;
  }

  get valuation(): number {
    return this.valuationPool.relativeValueToOther(this);
  }
}
