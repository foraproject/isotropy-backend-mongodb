/* @flow */
import promisify from 'nodefunc-promisify';
import MongoDb from "mongodb";
import Collection from "./collection";

import type {
  //AsyncAction, AsyncAction1, AsyncAction2, AsyncAction3, AsyncAction4, AsyncAction5, AsyncAction6,
  AsyncFunc, AsyncFunc1, AsyncFunc2, AsyncFunc3, AsyncFunc4, AsyncFunc5, AsyncFunc6
} from 'nodefunc-promisify';

const _collection = MongoDb.Db.prototype.collection;
const _dropDatabase: AsyncFunc<void> = promisify(MongoDb.Db.prototype.dropDatabase);
const _close: AsyncFunc<void> = promisify(MongoDb.Db.prototype.close);

class Db {
  underlying: MongoDb.Db;

  constructor(underlying: MongoDb.Db) {
    this.underlying = underlying;
  }

  collection(name: string) : Collection {
    const m_collection = _collection.call(this.underlying, name);
    return new Collection(m_collection);
  }

  async dropDatabase() : Promise<void> {
    await _dropDatabase.call(this.underlying);
  }

  async close() : Promise<void> {
    await _close.call(this.underlying);
  }
}

export default Db;
