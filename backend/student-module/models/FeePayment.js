const mongoose = require('mongoose');

const FeePaymentSchema = new mongoose.Schema({
  fee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fee',
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  payment_mode: {
    type: String,
    required: true,
  },
  transaction_id: {
    type: String,
    required: true,
  },
  receipt_number: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Success', 'Failed', 'Pending'],
    default: 'Pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('FeePayment', FeePaymentSchema);
