const express = require('express');
const router = express.Router();
const Card = require('../models/Card');

// Get all cards (NEW - added this missing endpoint)
router.get('/', async (req, res) => {
  try {
    const cards = await Card.find().populate('assignedTo list');
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new card
router.post('/', async (req, res) => {
  const { title, description, list, assignedTo, dueDate, labels } = req.body;
  
  try {
    const card = new Card({
      title,
      description,
      list,
      assignedTo,
      dueDate,
      labels: labels || []
    });
    
    const savedCard = await card.save();
    res.status(201).json(savedCard);
  } catch (error) {
    res.status(400).json({ 
      message: 'Error creating card',
      error: error.message 
    });
  }
});

// Get all cards in a specific list
router.get('/list/:listId', async (req, res) => {  // Changed to '/list/:listId'
  try {
    const cards = await Card.find({ list: req.params.listId })
                          .populate('assignedTo')
                          .sort({ createdAt: -1 });
    res.status(200).json(cards);
  } catch (error) {
    res.status(400).json({ 
      message: 'Error fetching cards',
      error: error.message 
    });
  }
});

// Get a single card by ID
router.get('/:id', async (req, res) => {  // NEW - added single card endpoint
  try {
    const card = await Card.findById(req.params.id)
                          .populate('assignedTo list');
    if (!card) return res.status(404).json({ message: 'Card not found' });
    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a card by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('assignedTo list');
    
    if (!updatedCard) {
      return res.status(404).json({ message: 'Card not found' });
    }
    
    res.status(200).json(updatedCard);
  } catch (error) {
    res.status(400).json({ 
      message: 'Error updating card',
      error: error.message 
    });
  }
});

// Delete a card by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedCard = await Card.findByIdAndDelete(req.params.id);
    
    if (!deletedCard) {
      return res.status(404).json({ message: 'Card not found' });
    }
    
    res.status(200).json({ 
      message: 'Card deleted successfully',
      deletedCard 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting card',
      error: error.message 
    });
  }
});

module.exports = router;