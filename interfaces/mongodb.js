declare module "mongodb" {

    declare type CountOptionsType = {
        limit?: boolean;
        skip?: number,
        hint?: string
    };

    declare type FindOneOptionsType = {
        limit?: number,
        sort?: Array<Object> | Object,
        fields?: Object,
        skip?: number
    }

    declare class Db {
        collection(name: string) : Promise<Collection>;
        dropDatabase() : Promise;
        close() : Promise;
    }

    declare class MongoClient {
        constructor(serverConfig: any, options: any) : void;
        static connect(uri: string): Promise<Db>;
    }

    declare class Cursor {
        toArray() : Promise<Array<Object>>;
        limit(n: number) : Cursor;
        skip(n: number) : Cursor;
        sort(keys: string | Array<Object> | Object) : Cursor;
    }

    declare class Collection {
        count(query: Object, options: CountOptionsType) : Promise<number>;
        createIndex(field: string) : Promise;
        deleteOne(filter: Object) : Promise<number>;
        deleteMany(filter: Object) : Promise<number>;
        drop() : Promise<Collection>;
        dropIndex(name: string) : Promise;
        find(query: Object) : Cursor;
        findOne(query: Object, options: FindOneOptionsType) : Promise<Object>;
        insertOne(doc: Object) : Promise<string>;
        insertMany() : Promise<Array<string>>;
        updateOne(selector: Object, update: Object) : Promise;
        updateMany(selector: Object, update: Object) : Promise;
    }
}
