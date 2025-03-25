const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  // Name of the board; only letters, numbers, spaces, and basic punctuation allowed.
  name: { 
    type: String, 
    required: true,
    validate: {
      validator: function(v) {
        return /^[A-Za-z0-9\s,.-]+$/.test(v);
      },
      message: props => `${props.value} is not a valid board name!`
    }
  },
  // Description of the board.
  description: { 
    type: String, 
    required: true
  },
  // Reference to the user who created the board.
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  // Array of lists that belong to the board.
  lists: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'List' 
  }]
}, { timestamps: true });

module.exports = mongoose.model('Board', boardSchema);
