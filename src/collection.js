/* @flow */
import promisify from 'nodefunc-promisify';
import Cursor from "./cursor";
import type { MongoCollectionType } from "./flow/mongodb-types";

class Collection {
    underlying: MongoCollectionType;

    constructor(underlying: MongoCollectionType) {
        this.underlying = underlying;
    }

    async find() : Promise<Cursor> {
        const fn = promisify(this.underlying.find);
        var cursor = await fn.apply(this.underlying, arguments);
        return new Cursor(cursor);
    }
}

const methods = [
    "count",
    "createIndex",
    "deleteOne",
    "deleteMany",
    "drop",
    "dropIndex",
    "findOne",
    "insertOne",
    "insertMany",
    "updateOne",
    "updateMany"
];

methods.forEach(function(methodName) {
    Collection.prototype[methodName] = async function() {
        const fn = promisify(this.underlying[methodName]);
        return await fn.apply(this.underlying, arguments);
    };
});

export default Collection;
