import { IAddress } from "./iaddress";
import { IContract } from "./icontract";

export class Contract implements IContract {
  address: IAddress;

  constructor(address: IAddress) {
    this.address = address;
  }
}
