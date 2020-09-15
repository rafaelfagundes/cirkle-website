import { Db, MongoClient } from "mongodb";

let cachedDb: Db = null;
let client: MongoClient = null;

export async function connectToDatabase(uri: string): Promise<Db> {
  if (client) {
    if (!client.isConnected()) {
      client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
  } else {
    client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    cachedDb = client.db("cirkle");
  }

  if (!cachedDb) cachedDb = client.db("cirkle");
  return cachedDb;
}
