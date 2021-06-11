import { IContract } from "./icontract";
import { BaseExchange, IExchange } from "./exchangebase";
import { INetwork } from "./inetwork";
import { BasePool } from "./poolbase";
import { IToken } from "./tokenbase";

export class TestExchange extends BaseExchange {
  id: string;
  name: string;
  exchangeToken: IToken;
  masterChef: IContract;
  network: INetwork;
  pools: BasePool[];
  tokensPerBlock: number;

  tokensPerDay: () => number;

  exchangeTokenPostInflationValue(): number {
    throw new Error("Method not implemented.");
  }
}
