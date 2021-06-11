import { IAsset } from "./iasset";
import { IContract } from "./icontract";
import { IToken } from "./itoken";

export type ITestAssetConfig = {
    _currentPoolTotalAsset: number;
}

export class TestAsset implements IAsset {
    firstToken: IToken;
    secondToken: IToken;
    firstTokenBalance: number;
    secondTokenBalance: number;
    _currentPoolTotalAsset: number;
    
    futureAssetShareForDollarAmount(inputAmount: number): number {
        return inputAmount/(this._currentPoolTotalAsset+inputAmount);
    }
    assetBalanceOf(input: IContract): number {
        return this._currentPoolTotalAsset;
    }

    constructor(config: ITestAssetConfig) {
        Object.assign(this, config);
    }

}