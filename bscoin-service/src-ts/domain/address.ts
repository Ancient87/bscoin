import { IAddress } from "./iaddress";
import { INetwork } from "./inetwork";

export class Address implements IAddress {
  address: string;
  network: INetwork;

  constructor(address: string, network: INetwork) {
    this.address = address;
    this.network = network;
  }
}
