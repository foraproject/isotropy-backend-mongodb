/* @flow */
import promisify from 'nodefunc-promisify';
import MongoDb from "mongodb";

const _toArray = promisify(MongoDb.Cursor.prototype.toArray);
const _limit = MongoDb.Cursor.prototype.limit;
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

    limit(n: number) : Cursor {
        var cursor = _limit.call(this.underlying, n);
        return new Cursor(cursor);
    }

    skip(n: number) : Cursor {
        var cursor = _skip.call(this.underlying, n);
        return new Cursor(cursor);
    }

    sort(keys: string | Array<Object> | Object) : Cursor {
        var cursor = _sort.call(this.underlying, keys);
        return new Cursor(cursor);
    }
}

export default Cursor;
