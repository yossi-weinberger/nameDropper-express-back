import dotenv from "dotenv";
dotenv.config();

import neo4j from "neo4j-driver";

const driver = neo4j.driver(
  process.env.NEO4J_URL,
  neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
);

export default driver;

// import neo4j from "neo4j-driver";

// import dotenv from "dotenv";
// dotenv.config();

// const driver = neo4j.driver(
//   process.env.NEO4J_URL,
//   neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
// );
// export default driver;
