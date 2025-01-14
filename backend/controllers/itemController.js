const Item = require('../models/itemModel');

exports.createItem = async (req, res) => {
  try {
    const { name, description } = req.body;
    const item = await Item.create({ name, description, createdBy: req.user.id });
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find().populate('createdBy', 'name email');
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
