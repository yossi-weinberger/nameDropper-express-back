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

// Get a single category by name
router.get("/:name", async (req, res, next) => {
  try {
    const categoryName = req.params.name;

    // Find the category by its name
    const category = await categoriesCollection.findOne({
      name: categoryName,
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Find all values that belong to the specified category
    const values = await valuesCollection
      .find({
        category: { name: category.name },
      })
      .toArray();

    res.json({ data: values, status: "success" });
  } catch (error) {
    console.error("Error fetching values by category name:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get a value by category name
router.get("/:categoryName/:valueName", async (req, res, next) => {
  try {
    const { categoryName, valueName } = req.params;
    console.log("Received Category Name:", categoryName);
    console.log("Received Value Name:", valueName);

    // Find the value within the category by its name
    const value = await valuesCollection.findOne({
      "category.name": categoryName,
      name: valueName,
    });

    if (!value) {
      return res.status(404).json({ error: "Value not found" });
    }

    res.json({ data: value, status: "success" });
  } catch (error) {
    console.error("Error fetching value by category and value name:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}); // Update a category
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
