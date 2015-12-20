declare module "mongodb" {
    declare class Db {
        collection(name: string) : Collection
    }

    declare class MongoClient {
        constructor(serverConfig: any, options: any) : void;
        static connect(uri: string): Promise<Db>;
    }

    declare class ObjectID {
        constructor (s?: string) : void;
    }

    declare interface Collection {
    }
}
