const mongoose = require('mongoose');

const FeeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  tuition_fee: {
    type: Number,
    required: true,
  },
  lab_fee: {
    type: Number,
    required: true,
  },
  library_fee: {
    type: Number,
    required: true,
  },
  other_fees: {
    type: Number,
    required: true,
  },
  total_amount: {
    type: Number,
    required: true,
  },
  paid_amount: {
    type: Number,
    default: 0,
  },
  pending_amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Paid', 'Pending', 'Partial'],
    default: 'Pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('Fee', FeeSchema);
