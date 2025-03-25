const express = require('express');
const router = express.Router();
const Board = require('../models/Board');

// Create a new board
router.post('/', async (req, res) => {
  const { name, description, createdBy } = req.body;
  try {
    const board = new Board({ name, description, createdBy });
    await board.save();
    res.status(201).json(board);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all boards
router.get('/', async (req, res) => {
  try {
    const boards = await Board.find().populate('createdBy');
    res.status(200).json(boards);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a specific board by ID
router.get('/:id', async (req, res) => {
  try {
    const board = await Board.findById(req.params.id).populate('createdBy');
    if (!board) return res.status(404).json({ message: 'Board not found' });
    res.status(200).json(board);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a board by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedBoard = await Board.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBoard) return res.status(404).json({ message: 'Board not found' });
    res.status(200).json(updatedBoard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a board by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedBoard = await Board.findByIdAndDelete(req.params.id);
    if (!deletedBoard) return res.status(404).json({ message: 'Board not found' });
    res.status(200).json({ message: 'Board deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
