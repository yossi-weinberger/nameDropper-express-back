import express from "express";
import { Router } from "express";
import { ObjectId } from "mongodb";
import { categoriesCollection, valuesCollection } from "./mongoConnect.mjs";

const router = Router();

// Create a new category
router.post("/", async (req, res) => {
  try {
    await categoriesCollection.insertOne(req.body);
    res.status(201).send("category created successfully");
  } catch (error) {
    res.json({ error: error, status: "Error" });
  }
});

// Get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await categoriesCollection.find().toArray();
    res.json({ data: categories, status: "success" });
  } catch (error) {
    res.json({ error: error, status: "Error" });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const valueId = req.params.id;
    console.log("Received ID:", valueId);

    // Find the value by its _id
    const value = await valuesCollection.findOne({
      _id: new ObjectId(valueId),
    });

    if (!value) {
      return res.status(404).json({ error: "Value not found" });
    }

    res.json({ data: value, status: "success" });
  } catch (error) {
    console.error("Error fetching value by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// router.get("/:id", async (req, res, next) => {
//   const values = await categoriesCollection.findOne({
//     _id: new ObjectId(req.params.id),
//   });
//   res.json({ data: values, status: "success" });
// });

// Get subcategories for a specific category
// router.get("/:categoryId", async (req, res) => {
//   const { categoryId } = req.params;
//   try {
//     const values = await valuesCollection.find({
//       "category._id": mongoose.Types.ObjectId(categoryId),
//     });
//     res.json({ data: values });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
// router.get("/:categoryId", async (req, res) => {
//   try {
//     const subcategories = await categoriesCollection
//       .find({ parentId: req.params.categoryId })
//       .toArray();
//     res.json({ data: subcategories, status: "success" });
//   } catch (error) {
//     res.json({ error: error, status: "Error" });
//   }
// });

// Get values for a specific category
router.get("/:categoryName/values", async (req, res) => {
  try {
    const { categoryName } = req.params;
    const values = await categoriesCollection
      .find({ "category.name": categoryName })
      .toArray();
    res.json({ data: values, status: "success" });
  } catch (error) {
    res.json({ error: error, status: "Error" });
  }
});

// Get a specific item by subcategory and item ID

router.get("/:subcategoryId/:id", async (req, res) => {
  try {
    const item = await categoriesCollection.findOne({
      _id: new ObjectId(req.params.id),
      parentId: req.params.subcategoryId,
    });
    res.json({ data: item, status: "success" });
  } catch (error) {
    res.json({ error: error, status: "Error" });
  }
});

// Update a category
router.patch("/:id", async (req, res) => {
  const categories = await categoriesCollection.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.json({ data: categories, status: "success" });
});

// Delete a category
router.delete("/:id", async (req, res) => {
  const categories = await categoriesCollection.deleteOne({
    _id: new ObjectId(req.params.id),
  });
  res.json({ data: categories, status: "success" });
});

export default router;

// import express from "express";
// import { Router } from "express";
// import { ObjectId } from "mongodb";
// import { categoriesCollection } from "./mongoConnect.mjs";
// const router = Router();

// // Create a new category
// router.post("/", async (req, res) => {
//   try {
//     await categoriesCollection.insertOne(req.body);

//     res.status(201).send("category created successfully");
//   } catch (error) {
//     res.json({ error: error, status: "Error" });
//   }
// });

// router.post("/many", async (req, res) => {
//   try {
//     // console.log(req.body);
//     await categoriesCollection.insertMany(req.body);

//     res.send("categories created successfully");
//   } catch (error) {
//     res.json({ error: error, status: "Error" });
//   }
// });

// // Get all categories
// router.get("/", async (req, res) => {
//   try {
//     const categories = await categoriesCollection.find().toArray();
//     res.json({ data: categories, status: "success" });
//   } catch (error) {}
// });

// // Get a single category
// router.get("/:id", async (req, res, next) => {
//   const categories = await categoriesCollection.findOne({
//     _id: new ObjectId(req.params.id),
//   });
//   res.json({ data: categories, status: "success" });
// });

// // Update a category
// router.patch("/:id", async (req, res) => {
//   const categories = await categoriesCollection.updateOne(
//     {
//       _id: new ObjectId(req.params.id),
//     },
//     { $set: req.body }
//   );
//   res.json({ data: categories, status: "success" });
// });

// // Delete a category
// router.delete("/:id", async (req, res) => {
//   const categories = await categoriesCollection.deleteOne({
//     _id: new ObjectId(req.params.id),
//   });
//   res.json({ data: categories, status: "success" });
// });

// export default router;
