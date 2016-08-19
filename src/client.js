/* @flow */
import promisify from 'nodefunc-promisify';
import MongoDb from "mongodb";
import Db from "./db";

import type {
  //AsyncAction, AsyncAction1, AsyncAction2, AsyncAction3, AsyncAction4, AsyncAction5, AsyncAction6,
  AsyncFunc, AsyncFunc1, AsyncFunc2, AsyncFunc3, AsyncFunc4, AsyncFunc5, AsyncFunc6
} from 'nodefunc-promisify';

const _connect: AsyncFunc1<string, MongoDb.Db> = promisify(MongoDb.MongoClient.connect);

class Client {
  static async connect(connectionString: string) : Promise<Db> {
    const db = await _connect.call(MongoDb.MongoClient, connectionString);
    return new Db(db);
  }
}

export default Client;
