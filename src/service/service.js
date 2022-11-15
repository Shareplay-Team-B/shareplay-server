import dotenv from 'dotenv';
import path from 'path';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { createHash } from 'crypto';

dotenv.config({ path: path.join(__dirname, '..', '.env') });
const uri = `mongodb+srv://shareplayb:${process.env.DB_PASS}@cluster0.bpnqtur.mongodb.net/?retryWrites=true&w=majority`;
// eslint-disable-next-line max-len
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function serverConnect() {
  await client.connect();
  // Establish and verify connection
  await client.db('shareplay').command({ ping: 1 });
  console.log('Connected successfully to mongodb server');
}

async function createNewUser(user, em, pass) {
  serverConnect();
  const database = client.db('shareplay');
  const collection = database.collection('users');
  const newPass = createHash('sha256').update(pass).digest('hex');

  const doc = { username: user, email: em, password: newPass };
  const result = await collection.insertOne(doc);
  console.log(`Document was successful inserted: ${result.insertedId}`);
}

async function getAllUsers(user) {
  serverConnect();
  const database = client.db('shareplay');
  const collection = database.collection('users');
  const query = { username: user };
  if (await collection.countDocuments(query) > 0) {
    return false;
  // eslint-disable-next-line no-else-return
  } else {
    return true;
  }
}

async function getUser(ema) {
  serverConnect();
  const items = [];
  const database = client.db('shareplay');
  const collection = database.collection('users');
  const query = { email: ema };
  const cursor = collection.find(query);
  await cursor.forEach((doc) => items.push(doc));
  return items[0].username;
}

export { createNewUser, getAllUsers, getUser };
