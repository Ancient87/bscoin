import { IContract } from "./icontract";
import { BaseExchange, IExchange, IExchangeConfig } from "./exchangebase";
import { INetwork } from "./inetwork";
import { BasePool } from "./poolbase";
import { IToken } from "./tokenbase";

export class Exchange extends BaseExchange {
  id: string;
  name: string;
  exchangeToken: IToken;
  masterChef: IContract;
  network: INetwork;
  tokensPerBlock: number;
  pools: BasePool[];

  constructor(config: IExchangeConfig) {
    super(config);
  }
}
