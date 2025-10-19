const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Timetable = require('../models/Timetable');
const Student = require('../models/Student');
const Faculty = require('../models/Faculty');

// @route   GET api/timetable
// @desc    Get the full weekly timetable for the logged-in student
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const student = await Student.findById(req.student.id);
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    const timetable = await Timetable.find({
      course: { $in: student.course },
      year: student.year,
      semester: student.semester,
    }).populate('faculty', 'full_name'); // Populate faculty name

    if (!timetable || timetable.length === 0) {
      return res.status(404).json({ msg: 'Timetable not found for your course and semester.' });
    }

    res.json(timetable);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;