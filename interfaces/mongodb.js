declare module "mongodb" {

  declare type CountOptionsType = {
    limit?: number;
    skip?: number
  };

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
    hasNext(cb: (err?: Error, result: boolean) => void) : void;
    limit(n: number) : Cursor;
    next(cb: (err?: Error, result: Object) => void) : void;
    skip(n: number) : Cursor;
    sort(keys: Array<Array<string|number>>) : Cursor;
  }

  declare class Collection {
    count(query: Object, options: CountOptionsType, cb: (err?: Error, result: number) => void) : void;
    createIndex(field: Object, cb: (err?: Error) => void) : void;
    deleteOne(filter: Object, cb: (err?: Error) => void) : void;
    deleteMany(filter: Object, cb: (err?: Error, result: QueryResultType) => void) : void;
    drop(cb: (err?: Error) => void) : void;
    dropIndexes(cb: (err?: Error) => void) : void;
    dropIndex(name: string, cb: (err?: Error) => void) : void;
    find(query: Object) : Cursor;
    indexes(cb: (err?: Error, result: Array<Object>) => void) : void;
    insertOne(doc: Object, cb: (err?: Error, result: { insertedId: string }) => void) : void;
    insertMany(docs: Array<Object>, cb: (err?: Error, result: { insertedIds: Array<string>}) => void) : void;
    updateOne(selector: Object, update: Object, cb: (err?: Error) => void) : void;
    updateMany(selector: Object, update: Object, cb: (err?: Error, result: QueryResultType) => void) : void;
  }
}
