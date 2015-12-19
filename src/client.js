/* @flow */
import promisify from 'nodefunc-promisify';
import MongoDb from "mongodb";
import Db from "./db";

const NativeComponent = MongoDb.MongoClient;
const connect = promisify(NativeComponent.connect);

class Client {
    static async connect(connectionString: string) : Db {
        const db = await connect.call(NativeComponent, connectionString);
        return new Db(_db);
    }
}

export default Client;
