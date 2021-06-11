import { IContract } from "./icontract";
import { IExchange } from "./iexchange";
import { INetwork } from "./inetwork";
import { IPool } from "./ipool";
import { IToken } from "./itoken";

export class TestExchange implements IExchange {
    id: string;
    name: string;
    bsToken: IToken;
    masterChef: IContract;
    network: INetwork;
    pools: IPool[];
    tokensPerBlock: number;

    getTokensPerDay: () => number;

}