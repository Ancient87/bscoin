import { BaseNetwork } from "./networkbase";

export class Network extends BaseNetwork {
  static createNetworkWithEmission(blocksPerDay: number, id?: string) {
    const theId = id ? id : "TEST_NETWORK";
    return new Network({
      id: theId,
      explorer: theId,
      endpoint: theId,
      blocksPerDay: blocksPerDay,
    });
  }
}

export const BSC_NETWORK = Network.createNetworkWithEmission(
  25000,
  "BSC_NETWORK"
);
