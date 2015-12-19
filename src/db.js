/* @flow */
import promisify from 'nodefunc-promisify';
import MongoDb from "mongodb";
import Collection from "./collection";

class Db {
    underlying: MongoDbType;
    ObjectID: MongoDbObjectID;

    constructor(underlying: MongoDbType) {
        this.underlying = underlying;
        this.ObjectID = mongodb.ObjectID;
    }

    async collection() {
        var fn = promisify(this.underlying.collection);
        var collection = await fn.apply(this.underlying, arguments);
        return new Collection(collection);
    }
}

var methods = [
    "dropDatabase",
    "close"
];
methods.forEach(function(methodName) {
    Db.prototype[methodName] = async function() {
        var fn = promisify(this.underlying[methodName]);
        return await fn.apply(this.underlying, arguments);
    };
});

export default Db;
