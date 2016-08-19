/* @flow */
import promisify from 'nodefunc-promisify';
import MongoDb from "mongodb";

import type {
  //AsyncAction, AsyncAction1, AsyncAction2, AsyncAction3, AsyncAction4, AsyncAction5, AsyncAction6,
  AsyncFunc, AsyncFunc1, AsyncFunc2, AsyncFunc3, AsyncFunc4, AsyncFunc5, AsyncFunc6
} from 'nodefunc-promisify';

const _toArray: AsyncFunc<Array<Object>> = promisify(MongoDb.Cursor.prototype.toArray);
const _count: AsyncFunc<number> = promisify(MongoDb.Cursor.prototype.count);
const _hasNext: AsyncFunc<boolean> = promisify(MongoDb.Cursor.prototype.hasNext);
const _limit = MongoDb.Cursor.prototype.limit;
const _next: AsyncFunc<Object> = promisify(MongoDb.Cursor.prototype.next);
const _skip = MongoDb.Cursor.prototype.skip;
const _sort = MongoDb.Cursor.prototype.sort;

class Cursor {
  underlying: MongoDb.Cursor;

  constructor(underlying: MongoDb.Cursor) {
    this.underlying = underlying;
  }

  async toArray() : Promise<Array<Object>> {
    return await _toArray.call(this.underlying);
  }

  async count() : Promise<number> {
    return await _count.call(this.underlying);
  }

  async hasNext() : Promise<boolean> {
    return await _hasNext.call(this.underlying);
  }

  limit(n: number) : Cursor {
    const cursor = _limit.call(this.underlying, n);
    return new Cursor(cursor);
  }

  async next() : Promise<Object> {
    return await _next.call(this.underlying);
  }

  skip(n: number) : Cursor {
    const cursor = _skip.call(this.underlying, n);
    return new Cursor(cursor);
  }

  sort(keys: Array<Array<string|number>>) : Cursor {
    const cursor = _sort.call(this.underlying, keys);
    return new Cursor(cursor);
  }
}

export default Cursor;
