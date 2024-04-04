import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
// const uri = `mongodb+srv://${mongo["username"]}:${mongo["password"]}@njs-test.0xygldr.mongodb.net/`;
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@njs-test.0xygldr.mongodb.net/`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let cluster;
try {
  cluster = await client.connect();
} catch (e) {
  console.error(e);
}

const db = cluster.db("testDb");
export const categoriesCollection = db.collection("categories");
export const usersCollection = db.collection("users");
export default db;
