import { IAddress } from "./iaddress";
import { BaseNetwork } from "./networkbase";

export class Address implements IAddress {
  address: string;
  network: BaseNetwork;

  constructor(address: string, network: BaseNetwork) {
    this.address = address;
    this.network = network;
  }
}
