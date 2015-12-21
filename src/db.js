/* @flow */
import promisify from 'nodefunc-promisify';
import MongoDb from "mongodb";
import Collection from "./collection";

const _collection = MongoDb.Db.prototype.collection;
const _dropDatabase = promisify(MongoDb.Db.prototype.dropDatabase);
const _close = promisify(MongoDb.Db.prototype.close);

class Db {
    underlying: MongoDb.Db;

    constructor(underlying: MongoDb.Db) {
        this.underlying = underlying;
    }

    collection(name: string) : Collection {
        const m_collection = _collection.call(this.underlying, name);
        return new Collection(m_collection);
    }

    async dropDatabase() : Promise {
        await _dropDatabase.call(this.underlying);
    }

    async close() : Promise {
        await _close.call(this.underlying);
    }
}

export default Db;
