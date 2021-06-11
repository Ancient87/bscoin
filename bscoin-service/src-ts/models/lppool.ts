import { IAsset } from "./iasset";
import { IContract } from "./icontract";
import { IExchange } from "./iexchange";
import { IPool } from "./ipool";
import { IPoolConfig } from "./ipool";
import { IToken } from "./itoken";

export class LPPool implements IPool {
    
    exchange: IExchange;
    tokensPerBlock: number;
    rewardToken: IToken;
    stakedAsset: IAsset;
    id: number;
    weighting: number;
    depositFee: number;
    active: boolean;

    constructor(config:IPoolConfig) {
        Object.assign(this, config);
    }
    
    hypotheticalPoolShareForDollarAmount(inputAmmount: number): number {
        //const inputsFutureShareOfAsset = this.stakedAsset.futureAssetShareForDollarAmount(inputAmmount);
        
        const currentPoolsBlanceOfAsset = this.stakedAsset.assetBalanceOf(this.exchange.masterChef);
        const futureTotalStakedAssetAmount = currentPoolsBlanceOfAsset+inputAmmount;
        const inputsShareOfFuturePoolAsset = inputAmmount/futureTotalStakedAssetAmount;

        return inputsShareOfFuturePoolAsset;
    }
    
    poolTokensPerBlockForShare(share: number): number {
        return share*this.tokensPerBlock;
    }
}