const express = require('express');
const router = express.Router();
const Card = require('../models/Card');

// Create a new card
router.post('/', async (req, res) => {
  const { title, description, listId, assignedTo, dueDate } = req.body;
  try {
    const card = new Card({
      title,
      description,
      list: listId,
      assignedTo,
      dueDate,
    });
    await card.save();
    res.status(201).json(card);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all cards in a specific list
router.get('/:listId', async (req, res) => {
  try {
    const cards = await Card.find({ list: req.params.listId }).populate('assignedTo');
    res.status(200).json(cards);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a card by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCard) return res.status(404).json({ message: 'Card not found' });
    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a card by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedCard = await Card.findByIdAndDelete(req.params.id);
    if (!deletedCard) return res.status(404).json({ message: 'Card not found' });
    res.status(200).json({ message: 'Card deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
