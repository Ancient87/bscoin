import { INetwork } from "./inetwork";

export class Network implements INetwork {
  id: string;
  explorer: string;
  endpoint: string;
  blocksPerDay: number;

  constructor(
    id: string,
    explorer: string,
    endpoint: string,
    blocksPerDay: number
  ) {
    this.id = id;
    this.explorer = explorer;
    this.endpoint = endpoint;
    this.blocksPerDay = blocksPerDay;
  }
}
