declare module "mongodb" {

    declare type CountOptionsType = {
        limit?: boolean;
        skip?: number
    };

    declare type FindOneOptionsType = {
        limit?: number,
        sort?: Array<Object> | Object,
        fields?: Object,
        skip?: number
    }

    declare type QueryResultType = {
        result: {
            n: number
        }
    }

    declare class Db {
        collection(name: string) : Collection;
        dropDatabase(cb: (err?: Error) => void) : void;
        close(cb: (err?: Error) => void) : void;
    }

    declare class MongoClient {
        constructor(serverConfig: any, options: any) : void;
        static connect(uri: string, cb: (err?: Error, db: Db) => void) : void;
    }

    declare class Cursor {
        toArray(cb: (err?: Error, result: Array<Object>) => void) : void;
        count(cb: (err?: Error, result: number) => void) : void;
        limit(n: number) : Cursor;
        skip(n: number) : Cursor;
        sort(keys: string | Array<any> | Object) : Cursor;
    }

    declare class Collection {
        count(query: Object, options: CountOptionsType, cb: (err?: Error, result: number) => void) : void;
        createIndex(field: string, cb: (err?: Error) => void) : void;
        deleteOne(filter: Object, cb: (err?: Error) => void) : void;
        deleteMany(filter: Object, cb: (err?: Error, result: QueryResultType) => void) : void;
        drop(cb: (err?: Error) => void) : void;
        dropAllIndexes(cb: (err?: Error) => void) : void;
        dropIndex(name: string, cb: (err?: Error) => void) : void;
        find(query: Object) : Cursor;
        findOne(query: Object, options: FindOneOptionsType, cb: (err?: Error, result: Object) => void) : void;
        indexes(cb: (err?: Error, result: Object) => void) : void;
        insertOne(doc: Object, cb: (err?: Error, result: { insertedId: string }) => void) : void;
        insertMany(docs: Array<Object>, cb: (err?: Error, result: { insertedIds: Array<string>}) => void) : void;
        removeOne(query: Object, cb: (err?: Error) => void) : void;
        removeMany(query: Object, cb: (err?: Error, result: QueryResultType) => void) : void;
        updateOne(selector: Object, update: Object, cb: (err?: Error) => void) : void;
        updateMany(selector: Object, update: Object, cb: (err?: Error, result: QueryResultType) => void) : void;
    }
}
