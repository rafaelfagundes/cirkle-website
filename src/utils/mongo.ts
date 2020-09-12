import { Db, MongoClient } from "mongodb";

let cachedDb: Db = null;
let client: MongoClient = null;
let connNumber = 0;

export async function connectToDatabase(uri: string): Promise<Db> {
  if (client) {
    if (!client.isConnected()) {
      console.log("nao conectado");
      client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      connNumber++;
    }
  } else {
    console.log("nao tem cliente");
    client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    connNumber++;
    cachedDb = client.db("cirkle");
  }

  console.log("connNumber", connNumber);

  if (!cachedDb) cachedDb = client.db("cirkle");
  return cachedDb;
}

export async function closeConnection(): Promise<void> {
  // setTimeout(async () => {
  //   if (client && client.isConnected()) {
  //     await client.close();
  //     connNumber--;
  //     console.log("connNumber", connNumber);
  //   }
  // }, 10000);
}
