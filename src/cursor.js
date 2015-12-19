/* @flow */
import promisify from 'nodefunc-promisify';

class Cursor {
    constructor(underlying: MongoCollectionType) {
        this.underlying = underlying;
    }
}

const syncMethods = [
    "limit",
    "skip",
    "sort"
];

syncMethods.forEach(function(methodName) {
    Cursor.prototype[methodName] = function() {
        var cursor = this.underlying[methodName].apply(this.underlying, arguments);
        return new Cursor(cursor);
    };
});

var asyncMethods = [
    "toArray"
];
asyncMethods.forEach(function(methodName) {
    Cursor.prototype[methodName] = async function() {
        var fn = promisify(this.underlying[methodName]);
        return await fn.apply(this.underlying, arguments);
    };
});

export default Cursor;
