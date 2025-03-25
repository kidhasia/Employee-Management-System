const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  // Name of the list; only letters, numbers, spaces, and basic punctuation allowed.
  name: { 
    type: String, 
    required: true,
    validate: {
      validator: function(v) {
        return /^[A-Za-z0-9\s,.-]+$/.test(v);
      },
      message: props => `${props.value} is not a valid list name!`
    }
  },
  // Position of the list relative to others on the board.
  position: {
    type: Number,
    required: true
  },
  // Reference to the board to which the list belongs.
  board: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Board', 
    required: true 
  },
  // Array of cards that belong to the list.
  cards: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Card' 
  }]
}, { timestamps: true });

module.exports = mongoose.model('List', listSchema);
