import { BaseAsset, IAssetProps } from "./assetbase";
import { TokenBase } from "./tokenbase";

export class TokenNotFoundInLpError extends Error {
  constructor() {
    super("Supplied token is not in this pool");
  }
}

export class LPAsset extends BaseAsset {
  constructor(ap: IAssetProps) {
    super(ap);
  }

  private findTheOtherToken(token: TokenBase) {
    let otherToken: TokenBase;
    let otherTokenBalance: number;
    let tokenBalance: number;

    if (token === this.firstToken) {
      otherToken = this.secondToken;
      otherTokenBalance = this.secondTokenBalance;
      tokenBalance = this.firstTokenBalance;
    } else if (token === this.secondToken) {
      otherToken = this.firstToken;
      otherTokenBalance = this.firstTokenBalance;
      tokenBalance = this.secondTokenBalance;
    } else {
      throw new TokenNotFoundInLpError();
    }

    return {
      thisToken: token,
      thisTokenBalance: tokenBalance,
      otherToken: otherToken,
      otherTokenBalance: otherTokenBalance,
    };
  }

  relativeValueToOther(token: TokenBase): number {
    const { thisTokenBalance: tokenBalance, otherTokenBalance } =
      this.findTheOtherToken(token);

    return tokenBalance / otherTokenBalance;
  }

  valuationBasedOnOther(token: TokenBase): number {
    const { thisToken, otherToken } = this.findTheOtherToken(token);

    return this.relativeValueToOther(token) * otherToken.valuation;
  }
}
