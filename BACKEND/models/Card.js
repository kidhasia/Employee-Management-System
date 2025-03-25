const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  // Title of the card; only letters, numbers, spaces, and basic punctuation allowed.
  title: { 
    type: String, 
    required: true,
    validate: {
      validator: function(v) {
        return /^[A-Za-z0-9\s,.-]+$/.test(v);
      },
      message: props => `${props.value} is not a valid card title!`
    }
  },
  // Description of the card.
  description: { 
    type: String, 
    required: true 
  },
  // Reference to the list the card belongs to.
  list: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'List', 
    required: true 
  },
  // Reference to the user assigned to the card.
  assignedTo: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  // Due date for the card.
  dueDate: { 
    type: Date 
  },
  // Labels or tags related to the card.
  labels: [{
    type: String
  }],
  // Status of the card (e.g., "to do", "in progress", "done").
  status: { 
    type: String, 
    default: 'to do' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Card', cardSchema);
