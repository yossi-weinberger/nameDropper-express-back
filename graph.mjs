import express from "express";
const router = express.Router();
import neo4j from "neo4j-driver";

const driver = neo4j.driver(
  process.env.NEO4J_URL,
  neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
);

router.get("/", async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(
      "MATCH (p:Project)-[r:CONTAINS]->(t:Technology)-[r2:CONTAINS]->(tool:Tool) RETURN p, r, t, r2, tool"
    );

    const data = result.records.map((record) => {
      const project = record.get("p").properties;
      const technology = record.get("t").properties;
      const tool = record.get("tool").properties;

      return {
        id: project.name,
        label: project.name,
        children: [
          {
            id: technology.name,
            label: technology.name,
            children: [
              {
                id: tool.name,
                label: tool.name,
              },
            ],
          },
        ],
      };
    });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await session.close();
  }
});

export default router;

// import dotenv from "dotenv";
// dotenv.config();
// import neo4j from "neo4j-driver";
// import express from "express";

// const driver = neo4j.driver(
//   process.env.NEO4J_URL,
//   neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
// );

// const app = express();
// const router = express.Router();

// router.get("/", async (req, res) => {
//   const session = driver.session();
//   try {
//     const result = await session.run("MATCH (n)-[r]->(m) RETURN n,r,m");
//     const nodes = [],
//       rels = [];
//     if (Array.isArray(result.records)) {
//       result.records.forEach((record) => {
//         nodes.push(...record.get("n", "m").map((node) => node.properties));
//         rels.push(record.get("r").properties);
//       });
//     }
//     res.json({ nodes, rels });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "שגיאת שרת פנימית" });
//   } finally {
//     await session.close();
//   }
// });

// app.use("/api", router);

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`השרת רץ על הפורט ${PORT}`);
// });

// import driver from "./neo4jConnect.mjs";
// import express from "express";
// const router = express.Router();

// import neo4j from "neo4j-driver";

// const driver = neo4j.driver(
//   process.env.NEO4J_URL,
//   neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
// );

// router.get("/", async (req, res) => {
//   const session = driver.session();
//   try {
//     const result = await session.run("MATCH (n)-[r]->(m) RETURN n, r, m");
//     const data = [];
//     if (Array.isArray(result.records)) {
//       result.records.forEach((record, index) => {
//         const node1 = record.get("n").properties;
//         const node2 = record.get("m").properties;
//         const relationship = record.get("r").properties;

//         const node1Data = {
//           id: `node-${index}-1`,
//           label: node1.name || `Node ${index}-1`,
//           x: Math.random(),
//           y: Math.random(),
//           color: "#ccc",
//           relationships: [
//             {
//               id: `rel-${index}`,
//               target: `node-${index}-2`,
//               ...relationship,
//             },
//           ],
//         };

//         const node2Data = {
//           id: `node-${index}-2`,
//           label: node2.name || `Node ${index}-2`,
//           x: Math.random(),
//           y: Math.random(),
//           color: "#ccc",
//         };

//         data.push(node1Data, node2Data);
//       });
//     }
//     res.json(data);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   } finally {
//     await session.close();
//   }
// });
// export default router;
