import express from "express";
import runMongoConnect from "./mongoConnect.mjs";
import graph from "./graph.mjs";
import users from "./users.mjs";
import categories from "./categories.mjs";
import { expressjwt as jwt } from "express-jwt";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
const port = 3001;

// runMongoConnect().catch(console.dir);

app.use(express.json());
app.use(cors());
app.use(
  jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }).unless({
    path: ["/users/login", "/users/register"],
  })
);
app.use("/users", users);
app.use("/categories", categories);
app.use("/api/graph", graph);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
