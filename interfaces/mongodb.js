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

    declare class Db {
        collection(name: string) : Collection;
        dropDatabase() : Promise;
        close() : Promise;
    }

    declare class MongoClient {
        constructor(serverConfig: any, options: any) : void;
        static connect(uri: string): Promise<Db>;
    }

    declare class Cursor {
        toArray() : Promise<Array<Object>>;
        count(): Promise<number>;
        limit(n: number) : Cursor;
        skip(n: number) : Cursor;
        sort(keys: string | Array<any> | Object) : Cursor;
    }

    declare class Collection {
        count(query: Object, options: CountOptionsType) : Promise<number>;
        createIndex(field: string) : Promise;
        deleteOne(filter: Object) : Promise;
        deleteMany(filter: Object) : Promise<number>;
        drop() : Promise<Collection>;
        dropAllIndexes() : Promise;
        dropIndex(name: string) : Promise;
        find(query: Object) : Cursor;
        findOne(query: Object, options: FindOneOptionsType) : Promise<Object>;
        indexes() : Promise<Object>;
        insertOne(doc: Object) : Promise<string>;
        insertMany() : Promise<Array<string>>;
        removeOne(query: Object) : Promise;
        removeMany(query: Array<Object>) : Promise<number>;
        updateOne(selector: Object, update: Object) : Promise;
        updateMany(selector: Object, update: Object) : Promise<number>;
    }
}
