import { BaseExchange, IExchangeConfig } from "./exchangebase";

export class Exchange extends BaseExchange {
  constructor(config: IExchangeConfig) {
    super(config);
  }
}
