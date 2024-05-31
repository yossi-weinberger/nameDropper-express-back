import express from "express";
import { Router } from "express";
import { ObjectId } from "mongodb";
import { valuesCollection } from "./mongoConnect.mjs";

const router = Router();

// Get all values
router.get("/", async (req, res) => {
  try {
    const values = await valuesCollection.find().toArray();
    res.json({ data: values, status: "success" });
  } catch (error) {
    res.json({ error: error, status: "Error" });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    console.log("Received ID:", req.params.id);
    const value = await valuesCollection.findOne({
      _id: new ObjectId(req.params.id),
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

export default router;
