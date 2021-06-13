import { Entity } from "../common/entity";

export interface INetworkProps {
  id?: string;
  explorer: string;
  endpoint: string;
  blocksPerDay: number;
}

export abstract class BaseNetwork extends Entity<INetworkProps> {
  constructor({ id, ...data }: INetworkProps) {
    super(data, id);
  }

  get blocksPerDay(): number {
    return this.props.blocksPerDay;
  }
}
