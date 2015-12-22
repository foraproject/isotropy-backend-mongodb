/* @flow */
export type CountOptionsType = {
    limit?: boolean;
    skip?: number
};

export type FindOneOptionsType = {
    limit?: number,
    sort?: Array<Object> | Object,
    fields?: Object,
    skip?: number
}

import type {
    AsyncAction, AsyncAction1, AsyncAction2, AsyncAction3, AsyncAction4, AsyncAction5, AsyncAction6,
    AsyncFunc, AsyncFunc1, AsyncFunc2, AsyncFunc3, AsyncFunc4, AsyncFunc5, AsyncFunc6
} from 'nodefunc-promisify';

import promisify from 'nodefunc-promisify';
import Cursor from "./cursor";
import MongoDb from "mongodb";

const _count: AsyncFunc2<Object, CountOptionsType, number> = promisify(MongoDb.Collection.prototype.count);
const _createIndex: AsyncAction1<string> = promisify(MongoDb.Collection.prototype.createIndex);
const _deleteOne: AsyncAction1<Object> = promisify(MongoDb.Collection.prototype.deleteOne);
const _deleteMany: AsyncFunc1<Object, { result: { n: number } }> = promisify(MongoDb.Collection.prototype.deleteMany);
const _drop: AsyncAction = promisify(MongoDb.Collection.prototype.drop);
const _dropAllIndexes: AsyncAction = promisify(MongoDb.Collection.prototype.dropAllIndexes);
const _dropIndex: AsyncAction1<string> = promisify(MongoDb.Collection.prototype.dropIndex);
const _find = MongoDb.Collection.prototype.find;
const _findOne: AsyncFunc2<Object, FindOneOptionsType, Object> = promisify(MongoDb.Collection.prototype.findOne);
const _indexes: AsyncFunc<Object> = promisify(MongoDb.Collection.prototype.indexes);
const _insertOne: AsyncFunc1<Object, { insertedId: string }> = promisify(MongoDb.Collection.prototype.insertOne);
const _insertMany: AsyncFunc1<Array<Object>, { insertedIds: Array<string> }> = promisify(MongoDb.Collection.prototype.insertMany);
const _removeOne: AsyncAction1<Object> = promisify(MongoDb.Collection.prototype.removeOne);
const _removeMany: AsyncFunc1<Object, { result: { n: number } }> = promisify(MongoDb.Collection.prototype.removeMany);
const _updateOne: AsyncAction2<Object, Object> = promisify(MongoDb.Collection.prototype.updateOne);
const _updateMany: AsyncFunc2<Object, Object, { result: { n: number } }> = promisify(MongoDb.Collection.prototype.updateMany);

class Collection {
    underlying: MongoDb.Collection;

    constructor(underlying: MongoDb.Collection) {
        this.underlying = underlying;
    }

    async count(query: Object, options: CountOptionsType = {}) : Promise<number> {
        const { limit, skip } = options;
        return await _count.call(this.underlying, query, { limit, skip });
    }

    async createIndex(field: string) : Promise {
        await _createIndex.call(this.underlying, field);
    }

    async deleteOne(filter: Object) : Promise {
        await _deleteOne.call(this.underlying, filter);
    }

    async deleteMany(filter: Object) : Promise<number> {
        const { result: { n } } = await _deleteMany.call(this.underlying, filter);
        return n;
    }

    async dropIndex(name: string) : Promise {
        await _dropIndex.call(this.underlying, name);
    }

    async drop() : Promise<Collection> {
        await _drop.call(this.underlying);
        return this;
    }

    async dropAllIndexes() : Promise {
        await _dropAllIndexes.call(this.underlying);
    }

    find(query: Object) : Cursor {
        const cursor = _find.call(this.underlying, query);
        return new Cursor(cursor);
    }

    async findOne(query: Object, options: FindOneOptionsType = {}) : Promise<Object> {
        const { limit, sort, fields, skip } = options;
        return await _findOne.call(this.underlying, query, { limit, sort, fields, skip });
    }

    async indexes(indexes: Object) : Promise<Object> {
        return await _indexes.call(this.underlying);
    }

    async insertOne(doc: Object) : Promise<string> {
        const { insertedId } = await _insertOne.call(this.underlying, doc);
        return insertedId.toString();
    }

    async insertMany(docs: Array<Object>) : Promise<Array<string>> {
        const { insertedIds } = await _insertMany.call(this.underlying, docs);
        return insertedIds.map(id => id.toString());
    }

    async removeOne(query: Object) : Promise {
        await _removeOne.call(this.underlying, query);
    }

    async removeMany(query: Object) : Promise<number> {
        const { result: { n } } = await _removeMany.call(this.underlying, query);
        return n;
    }


    async updateOne(selector: Object, update: Object) : Promise {
        await _updateOne.call(this.underlying, selector, update);
    }

    async updateMany(selector: Object, update: Object) : Promise<number> {
        const { result: { n } } = await _updateMany.call(this.underlying, selector, update);
        return n;
    }
}


export default Collection;
