import { IDomainEvent } from "./domain-event";
import { Entity } from "./entity";

export abstract class AggregateRoot<T> extends Entity<T> {
  private readonly _domainEvents = new Array<IDomainEvent>();

  get domainEvents() {
    return this._domainEvents;
  }

  public readonly version: number;

  constructor(props: T, id?: string) {
    super(props, id);

    this.version = 1;
  }
}
