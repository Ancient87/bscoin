import { IContract } from "./icontract";
import { INetwork } from "./inetwork";
import { IPool } from "./ipool";
import { IToken } from "./itoken";

export type IExchangeConfig = {
  id: string;
  name: string;
  bsToken: IToken;
  masterChef: IContract;
  network: INetwork;
  tokensPerBlock: number;
}

export interface IExchange {
  id: string;
  name: string;
  bsToken: IToken;
  masterChef: IContract;
  network: INetwork;
  pools: IPool[];
  tokensPerBlock: number;

  getTokensPerDay(): number;
}
