import { IContract } from "./icontract";
import { IExchange, IExchangeConfig } from "./iexchange";
import { INetwork } from "./inetwork";
import { IPool } from "./ipool";
import { IToken } from "./itoken";

export class Exchange implements IExchange {
    id: string;
    name: string;
    bsToken: IToken;
    masterChef: IContract;
    network: INetwork;
    tokensPerBlock: number;
    pools: IPool[];

    constructor(config: IExchangeConfig) {
      Object.assign(this, config);
      this.pools = new Array<IPool>();
    }

    getTokensPerDay(): number {
      return this.tokensPerBlock*this.network.blocksPerDay;
    }

}