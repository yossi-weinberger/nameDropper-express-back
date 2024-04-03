import express from "express";
import { Router } from "express";
import { ObjectId } from "mongodb";
import { categoryCollection } from "./mongoConnect.mjs";
const router = Router();

// Create a new product
router.post("/", async (req, res) => {
  try {
    await categoryCollection.insertOne(req.body);

    res.send("created successfully");
  } catch (error) {
    res.json({ error: error, status: "Error" });
  }
});

router.post("/many", async (req, res) => {
  try {
    // console.log(req.body);
    await categoryCollection.insertMany(req.body);

    res.send("created successfully");
  } catch (error) {
    res.json({ error: error, status: "Error" });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await categoryCollection.find().toArray();
    res.json({ data: products, status: "success" });
  } catch (error) {}
});

// Get a single product
router.get("/:id", async (req, res, next) => {
  const products = await categoryCollection.findOne({
    _id: new ObjectId(req.params.id),
  });
  res.json({ data: products, status: "success" });
});

// Update a product
router.patch("/:id", async (req, res) => {
  const products = await categoryCollection.updateOne(
    {
      _id: new ObjectId(req.params.id),
    },
    { $set: req.body }
  );
  res.json({ data: products, status: "success" });
});

// Delete a product
router.delete("/:id", async (req, res) => {
  const products = await categoryCollection.deleteOne({
    _id: new ObjectId(req.params.id),
  });
  res.json({ data: products, status: "success" });
});

export default router;
