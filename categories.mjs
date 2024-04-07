import express from "express";
import { Router } from "express";
import { ObjectId } from "mongodb";
import { categoriesCollection } from "./mongoConnect.mjs";
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

router.post("/many", async (req, res) => {
  try {
    // console.log(req.body);
    await categoriesCollection.insertMany(req.body);

    res.send("categories created successfully");
  } catch (error) {
    res.json({ error: error, status: "Error" });
  }
});

// Get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await categoriesCollection.find().toArray();
    res.json({ data: categories, status: "success" });
  } catch (error) {}
});

// Get a single category
router.get("/:id", async (req, res, next) => {
  const categories = await categoriesCollection.findOne({
    _id: new ObjectId(req.params.id),
  });
  res.json({ data: categories, status: "success" });
});

// Update a category
router.patch("/:id", async (req, res) => {
  const categories = await categoriesCollection.updateOne(
    {
      _id: new ObjectId(req.params.id),
    },
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
