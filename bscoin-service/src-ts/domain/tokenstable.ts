import { Contract } from "./contract";
import { BSC_NETWORK, Network } from "./network";
import { TokenBase } from "./tokenbase";

export class StableToken extends TokenBase {
  public static createStableTokenWorth(desiredValuation: number): StableToken {
    return new StableToken({
      name: `StableCoin-${desiredValuation}`,
      valuation: desiredValuation,
      totalSupply: 100000,
      network: BSC_NETWORK,
      contract: new Contract({
        address: "0xlol",
        network: BSC_NETWORK,
      }),
    });
  }
}

export const BUSD_TOKEN = StableToken.createStableTokenWorth(1);
