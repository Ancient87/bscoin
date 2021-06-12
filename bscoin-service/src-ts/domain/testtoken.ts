import { TokenBase, ITokenProps } from "./tokenbase";

export type ITestTokenProps = ITokenProps & {};

export class TestToken extends TokenBase {
  constructor(config: ITestTokenProps) {
    super(config);
  }
}
