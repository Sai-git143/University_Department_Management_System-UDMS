const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const Student = require('../models/Student');
const StudentDocument = require('../models/StudentDocument');
const multer = require('multer');

// @route   GET api/profile
// @desc    Get current student's complete profile
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const student = await Student.findById(req.student.id)
      .populate('course')
      .populate('department')
      .select('-password');

    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    const documents = await StudentDocument.find({ student: req.student.id });

    res.json({ ...student.toObject(), documents });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/profile
// @desc    Update current student's profile
// @access  Private
router.put('/', auth, async (req, res) => {
  const { phone_number, address, city, state, pincode, emergency_contact } = req.body;

  const profileFields = {};
  if (phone_number) profileFields.phone_number = phone_number;
  if (address) profileFields.address = address;
  if (city) profileFields.city = city;
  if (state) profileFields.state = state;
  if (pincode) profileFields.pincode = pincode;
  if (emergency_contact) profileFields.emergency_contact = emergency_contact;

  try {
    const student = await Student.findByIdAndUpdate(
      req.student.id,
      { $set: profileFields },
      { new: true }
    ).select('-password');

    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Multer config for photo uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/profile_photos/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// @route   POST api/profile/photo
// @desc    Upload or update profile photo
// @access  Private
router.post('/photo', [auth, upload.single('profile_photo')], async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded.' });
    }
    const student = await Student.findByIdAndUpdate(
      req.student.id,
      { profile_photo: req.file.path },
      { new: true }
    ).select('-password');

    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/profile/change-password
// @desc    Change student password
// @access  Private
router.put('/change-password', auth, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const student = await Student.findById(req.student.id);

    const isMatch = await bcrypt.compare(oldPassword, student.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Incorrect old password' });
    }

    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(newPassword, salt);
    await student.save();

    res.json({ msg: 'Password changed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/profile/documents
// @desc    Get student's documents
// @access  Private
router.get('/documents', auth, async (req, res) => {
  try {
    const documents = await StudentDocument.find({ student: req.student.id });
    res.json(documents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
