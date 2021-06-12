import * as UniqueEntityID from "cuid";
import { ITokenProps } from "../domain/tokenbase";

declare global {
  interface String {
    hashCode(): number;
  }
}

String.prototype.hashCode = (): number => {
  var hash = 0,
    i,
    chr;

  const that: string = this as string;

  if (that.length === 0) return hash;

  for (i = 0; i < that.length; i++) {
    chr = that.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

export abstract class Entity<T> {
  private readonly _id: string;
  public _props: T;

  get id(): string {
    return this._id;
  }

  constructor(props: T, id?: string) {
    this._id = id ? id : UniqueEntityID();
    this._props = props;
  }

  public equals(other?: Entity<T>) {
    if (other === null) {
      return false;
    }

    if (other === this) {
      return true;
    }

    if (typeof other !== typeof this) {
      return false;
    }

    return this._id === other._id;
  }

  public getHashCode(): number {
    return (typeof this + this.id).hashCode();
  }

  get props(): T {
    return this._props;
  }
}
