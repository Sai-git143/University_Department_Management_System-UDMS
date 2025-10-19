const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    default: null, // null for general notifications
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Academic', 'Fees', 'Events', 'General'],
    default: 'General',
  },
  read_by: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  }],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Notification', NotificationSchema);
