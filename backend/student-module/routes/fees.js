const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Fee = require('../models/Fee');
const FeePayment = require('../models/FeePayment');
const Student = require('../models/Student');

// @route   GET api/fees
// @desc    Get student's fee structure and payment history
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const student = await Student.findById(req.student.id);
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    // Get fee structure for the current semester
    const feeStructure = await Fee.findOne({
      student: req.student.id,
      semester: student.semester, // Assuming current semester is on student model
    });

    // Get all past payments
    const paymentHistory = await FeePayment.find({ student: req.student.id }).sort({ payment_date: -1 });

    res.json({
      feeStructure,
      paymentHistory,
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/fees/initiate-payment
// @desc    Create a payment order (e.g., with Razorpay)
// @access  Private
router.post('/initiate-payment', auth, async (req, res) => {
  const { amount } = req.body;

  // In a real app, you would integrate with Razorpay here to create an order.
  // For now, we'll simulate it.
  console.log(`Initiating payment for amount: ${amount}`);
  const mockOrder = {
    id: `order_${Date.now()}`,
    amount: amount * 100, // Amount in paise
    currency: 'INR',
  };
  res.json(mockOrder);
});

// @route   POST api/fees/verify-payment
// @desc    Verify payment signature and save payment
// @access  Private
router.post('/verify-payment', auth, async (req, res) => {
  const { order_id, payment_id, signature, amount } = req.body;

  // In a real app, you would verify the Razorpay signature here.
  // For now, we'll simulate a successful verification and save the payment.
  console.log(`Verifying payment for order: ${order_id}`);
  
  try {
    const student = await Student.findById(req.student.id);
    const fee = await Fee.findOne({ student: req.student.id, semester: student.semester });

    if (!fee) {
      return res.status(404).json({ msg: 'Fee record not found for current semester' });
    }

    const newPayment = new FeePayment({
      fee: fee._id,
      student: req.student.id,
      amount: amount / 100, // Convert back from paise
      payment_mode: 'Online',
      transaction_id: payment_id,
      receipt_number: `RCPT-${Date.now()}`,
      status: 'Success',
    });

    await newPayment.save();

    fee.paid_amount += (amount / 100);
    fee.pending_amount -= (amount / 100);
    if (fee.pending_amount <= 0) {
      fee.status = 'Paid';
      fee.pending_amount = 0;
    }

    await fee.save();

    // Here you would also trigger an email receipt

    res.json({ msg: 'Payment successful', payment: newPayment });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;