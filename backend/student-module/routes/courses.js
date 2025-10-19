const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Course = require('../models/Course');
const Student = require('../models/Student');
const Department = require('../models/Department');
const Faculty = require('../models/Faculty');

// @route   GET api/courses
// @desc    Get all courses for the logged-in student
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const student = await Student.findById(req.student.id).populate({
      path: 'course',
      populate: { 
        path: 'faculty', 
        select: 'full_name email' 
      }
    });

    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }
    res.json(student.course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/courses/all
// @desc    Get all courses (for registration page)
// @access  Public
router.get('/all', async (req, res) => {
  try {
    const courses = await Course.find().select('name');
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/courses/departments
// @desc    Get all departments (for registration page)
// @access  Public
router.get('/departments', async (req, res) => {
  try {
    const departments = await Department.find().select('name');
    res.json(departments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/courses/by-department/:departmentId
// @desc    Get courses by department
// @access  Public
router.get('/by-department/:departmentId', async (req, res) => {
  try {
    const courses = await Course.find({ department: req.params.departmentId }).select('name');
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/courses/:departmentId/:semester
// @desc    Get courses by department and semester
// @access  Public
router.get('/:departmentId/:semester', async (req, res) => {
  try {
    const courses = await Course.find({ department: req.params.departmentId, semester: req.params.semester });
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;