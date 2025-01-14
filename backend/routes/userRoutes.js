const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ data: users });
  } catch (error) {
    console.error('Get Users Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single user
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ data: user });
  } catch (error) {
    console.error('Get User Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create user
router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      username,
      email,
      password
    });

    res.status(201).json({
      data: {
        _id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Create User Error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const { username, email } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username, email },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ data: user });
  } catch (error) {
    console.error('Update User Error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ data: user, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete User Error:', error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
