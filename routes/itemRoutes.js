const express = require("express");
const router = express.Router();
const Item = require("../models/itemModel");
const { protect } = require("../middlewares/authMiddleware");

// Get all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json({ data: items });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get single item
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ data: item });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create item
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;

    // Validate required fields
    if (!name || !description) {
      return res.status(400).json({
        message: "Please provide all required fields for creating item",
      });
    }

    const itemExists = await Item.findOne({ $or: [{ name }, { description }] });
    if (itemExists) {
      return res.status(400).json({ message: "Item already exists" });
    }

    const item = await Item.create(req.body);
    res.status(201).json({ data: item });
  } catch (error) {
    console.error("Create User Error:", error);
    res.status(400).json({ message: error.message });
  }
});

// Update item
router.put("/:id", async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ data: item });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete item
router.delete("/:id", async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ data: item });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
