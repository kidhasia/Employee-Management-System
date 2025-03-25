const express = require('express');
const router = express.Router();
const List = require('../models/List');

// Create a new list
router.post('/', async (req, res) => {
  const { name, boardId, position } = req.body;
  try {
    const list = new List({ name, board: boardId, position });
    await list.save();
    res.status(201).json(list);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all lists for a specific board
router.get('/:boardId', async (req, res) => {
  try {
    const lists = await List.find({ board: req.params.boardId });
    res.status(200).json(lists);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a list by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedList = await List.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedList) return res.status(404).json({ message: 'List not found' });
    res.status(200).json(updatedList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a list by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedList = await List.findByIdAndDelete(req.params.id);
    if (!deletedList) return res.status(404).json({ message: 'List not found' });
    res.status(200).json({ message: 'List deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
