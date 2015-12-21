/* @flow */
import promisify from 'nodefunc-promisify';
import Cursor from "./cursor";
import MongoDb from "mongodb";
import type MongoDbTypes from "mongodb";

const _count = promisify(MongoDb.Collection.prototype.count);
const _createIndex = promisify(MongoDb.Collection.prototype.createIndex);
const _deleteOne = promisify(MongoDb.Collection.prototype.deleteOne);
const _deleteMany = promisify(MongoDb.Collection.prototype.deleteMany);
const _drop = promisify(MongoDb.Collection.prototype.drop);
const _dropIndex = promisify(MongoDb.Collection.prototype.dropIndex);
const _find = MongoDb.Collection.prototype.find;
const _findOne = promisify(MongoDb.Collection.prototype.findOne);
const _insertOne = promisify(MongoDb.Collection.prototype.insertOne);
const _insertMany = promisify(MongoDb.Collection.prototype.insertMany);
const _updateOne = promisify(MongoDb.Collection.prototype.updateOne);
const _updateMany = promisify(MongoDb.Collection.prototype.updateMany);

export type CountOptionsType = {
    limit?: boolean;
    skip?: number,
    hint?: string
};

export type FindOneOptionsType = {
    limit?: number,
    sort?: Array<Object> | Object,
    fields?: Object,
    skip?: number
}

class Collection {
    underlying: MongoDb.Collection;

    constructor(underlying: MongoDb.Collection) {
        this.underlying = underlying;
    }

    async count(query: Object, options: CountOptionsType) : Promise<number> {
        const { limit, skip, hint } = options;
        return await _count.call(this.underlying, query, { limit, skip, hint });
    }

    async createIndex(field: string) : Promise {
        await _createIndex.call(this.underlying, field);
    }

    async deleteOne(filter: Object) : Promise<number> {
        const { result: { ok, n } } = await _deleteOne.call(this.underlying, filter);
        return n;
    }

    async deleteMany(filter: Object) : Promise<number> {
        const { result: { ok, n } } = await _deleteMany.call(this.underlying, filter);
        return n;
    }

    async drop() : Promise<Collection> {
        await _drop.call(this.underlying);
        return this;
    }

    async dropIndex(name: string) : Promise {
        await _count.call(this.underlying, name);
    }

    find(query: Object) : Cursor {
        var cursor = _find.call(this.underlying, query);
        return new Cursor(cursor);
    }

    async findOne(query: Object, options: FindOneOptionsType) : Promise<Object> {
        const { limit, sort, fields, skip } = options;
        return await _findOne.call(this.underlying, query, { limit, sort, fields, skip });
    }

    async insertOne(doc: Object) : Promise<string> {
        const { insertedId } = await _insertOne.call(this.underlying, doc);
        return insertedId.toString();
    }

    async insertMany() : Promise<Array<string>> {
        const insertedIds = await _count.call(this.underlying);
        return insertedIds.map(id => id.toString());
    }

    async updateOne(selector: Object, update: Object) : Promise {
        await _updateOne.call(this.underlying, selector, update);
    }

    async updateMany(selector: Object, update: Object) : Promise {
        await _updateMany.call(this.underlying, selector, update);
    }
}


export default Collection;
