import { mongo } from "./credentials.mjs";
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

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

let cluster;
try {
  cluster = await client.connect();
} catch (e) {
  console.error(e);
}

const db = cluster.db("testDb");
export const productCollection = db.collection("products");
export const usersCollection = db.collection("users");
export default db;
