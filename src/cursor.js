/* @flow */
import promisify from 'nodefunc-promisify';
import type { MongoCursorType } from "./flow/mongodb-types";

class Cursor {
    underlying: MongoCursorType;

    constructor(underlying: MongoCursorType) {
        this.underlying = underlying;
    }

    limit() {
        
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
