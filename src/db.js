/* @flow */
import promisify from 'nodefunc-promisify';
import MongoDb from "mongodb";
import Collection from "./collection";
import type { MongoDbType, MongoDbObjectID } from "./flow/mongodb-types";

class Db {
    underlying: MongoDbType;
    ObjectID: MongoDbObjectID;

    constructor(underlying: MongoDbType) {
        this.underlying = underlying;
        this.ObjectID = MongoDb.ObjectID;
    }

    async collection() : Promise<Collection> {
        const fn = promisify(this.underlying.collection);
        const collection = await fn.apply(this.underlying, arguments);
        return new Collection(collection);
    }

    async dropDatabase() : Promise {
        const fn = promisify(this.underlying.dropDatabase);
        await fn.call(this.underlying);
    }

    async close() : Promise {
        const fn = promisify(this.underlying.close);
        await fn.call(this.underlying);
    }
}

export default Db;
