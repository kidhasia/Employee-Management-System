const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
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
  description: { 
    type: String, 
    required: true 
  },
  list: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'List', 
    required: true 
  },
  // Removed assignedTo field since it's no longer needed
  dueDate: { 
    type: Date 
  },
  labels: [{
    type: String
  }],
  status: { 
    type: String, 
    default: 'to do' 
  },
  // Add these new fields for reporting
  reportContent: {
    type: String,
    default: ''
  },
  reportGeneratedAt: {
    type: Date
  },
  reportSentTo: {
    type: String,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  reportFormat: {
    type: String,
    enum: ['text', 'html', 'pdf'],
    default: 'text'
  }
}, { timestamps: true });

module.exports = mongoose.model('Card', cardSchema);
