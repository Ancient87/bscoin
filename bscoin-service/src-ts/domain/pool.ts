import { BasePool } from "./poolbase";
import { IPoolConfig } from "./poolbase";

export class Pool extends BasePool {
  constructor(config: IPoolConfig) {
    super(config);
  }
}
