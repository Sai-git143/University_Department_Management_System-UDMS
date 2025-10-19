const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const StudentDocument = require('../models/StudentDocument');
const sendEmail = require('../utils/sendEmail');

// @route   POST api/student/register
// @desc    Register a new student
// @access  Public
const multer = require('multer');

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'photo') {
      cb(null, 'uploads/profile_photos/');
    } else if (['doc_10th', 'doc_12th', 'doc_id'].includes(file.fieldname)) {
      cb(null, 'uploads/documents/');
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// @route   POST api/student/register
// @desc    Register a new student
// @access  Public
router.post('/register', upload.fields([
  { name: 'photo', maxCount: 1 }, 
  { name: 'doc_10th', maxCount: 1 }, 
  { name: 'doc_12th', maxCount: 1 }, 
  { name: 'doc_id', maxCount: 1 }
]), async (req, res) => {
  const { fullName, email, password, phoneNumber, dateOfBirth, gender, address, city, state, pincode, department, course, year, semester } = req.body;

  try {
    // Check if student already exists
    let student = await Student.findOne({ email });
    if (student) {
      return res.status(400).json({ msg: 'Student already exists' });
    }

    // Create a new student
    const registration_id = `REG-${Date.now()}`;
    student = new Student({
      registration_id,
      full_name: fullName,
      email,
      password,
      phone_number: phoneNumber,
      date_of_birth: dateOfBirth,
      gender,
      address,
      city,
      state,
      pincode,
      department,
      course,
      year,
      semester,
      profile_photo: req.files && req.files.photo ? req.files.photo[0].path : null,
    });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(password, salt);

    await student.save();

    // Save documents
    const documentsToSave = [];
    if (req.files) {
      if (req.files.doc_10th) {
        documentsToSave.push({
          student: student._id,
          document_type: '10th Marksheet',
          file_path: req.files.doc_10th[0].path,
        });
      }
      if (req.files.doc_12th) {
        documentsToSave.push({
          student: student._id,
          document_type: '12th Marksheet',
          file_path: req.files.doc_12th[0].path,
        });
      }
      if (req.files.doc_id) {
        documentsToSave.push({
          student: student._id,
          document_type: 'ID Proof',
          file_path: req.files.doc_id[0].path,
        });
      }
    }

    if (documentsToSave.length > 0) {
      await StudentDocument.insertMany(documentsToSave);
    }

    // Send confirmation email
    try {
      await sendEmail({
        email: student.email,
        subject: 'Registration Successful',
        message: `Hello ${student.full_name}, \n\nThank you for registering at our university. Your application is under review. Your registration ID is ${student.registration_id}.\n\nRegards,\nThe University Administration`,
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Do not block the registration process if email fails
    }

    res.status(201).json({ msg: 'Student registered successfully', registration_id });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login rate limiter
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per windowMs
  message: 'Too many login attempts from this IP, please try again after 15 minutes',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// @route   POST api/student/login
// @desc    Login a student
// @access  Public
router.post('/login', loginLimiter, async (req, res) => {
  const { loginId, password } = req.body;

  try {
    // Check if student exists by email or registration ID
    let student = await Student.findOne({ $or: [{ email: loginId }, { registration_id: loginId }] });
    if (!student) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check registration status
    if (student.registration_status === 'Pending') {
      return res.status(403).json({ msg: 'Your registration is still pending approval.' });
    }

    if (student.registration_status === 'Rejected') {
      return res.status(403).json({ msg: 'Your registration has been rejected. Please contact administration.' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create and return a JWT
    const payload = {
      student: {
        id: student.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/student/forgot-password
// @desc    Forgot password
// @access  Public
router.post('/forgot-password', (req, res) => {
  res.send('Password reset link sent to your email');
});

// @route   POST api/student/reset-password
// @desc    Reset password
// @access  Public
router.post('/reset-password', (req, res) => {
  res.send('Password has been reset');
});

module.exports = router;
