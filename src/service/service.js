import dotenv from 'dotenv';
import path from 'path';
import { MongoClient, ServerApiVersion } from 'mongodb';

dotenv.config({ path: path.join(__dirname, '..', '.env') });
const uri = `mongodb+srv://shareplayb:${process.env.DB_PASS}@cluster0.bpnqtur.mongodb.net/?retryWrites=true&w=majority`;
// eslint-disable-next-line max-len
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function createNewUser(user, em, pass) {
  try {
    await client.connect();
    // Establish and verify connection
    await client.db('shareplay').command({ ping: 1 });
    console.log('Connected successfully to server');
    const database = client.db('shareplay');
    const collection = database.collection('users');
    // make password into sha-256
    const doc = { username: user, email: em, password: pass };
    const result = await collection.insertOne(doc);
    console.log(`Document was successful inserted: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

export default createNewUser;
