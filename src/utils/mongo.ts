import { Db, MongoClient } from "mongodb";

export async function connectToDatabase(uri: string): Promise<Db> {
  console.log("uri", uri);

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db("cirkle");

  return db;
}
