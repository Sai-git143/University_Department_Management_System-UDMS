const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Attendance = require('../models/Attendance');
const Course = require('../models/Course');

// @route   GET api/attendance
// @desc    Get all attendance data for the logged-in student
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const studentId = req.student.id;

    const attendanceRecords = await Attendance.find({ student: studentId }).populate('course', 'name');

    if (!attendanceRecords) {
      return res.status(404).json({ msg: 'No attendance records found.' });
    }

    // Calculate subject-wise summary
    const summary = {};

    for (const record of attendanceRecords) {
      const courseId = record.course._id.toString();
      if (!summary[courseId]) {
        summary[courseId] = {
          courseName: record.course.name,
          totalClasses: 0,
          attendedClasses: 0,
        };
      }
      summary[courseId].totalClasses++;
      if (record.status === 'Present') {
        summary[courseId].attendedClasses++;
      }
    }

    // Calculate percentages and status
    const subjectSummary = Object.values(summary).map(s => {
      const percentage = s.totalClasses > 0 ? (s.attendedClasses / s.totalClasses) * 100 : 0;
      let status = 'Safe';
      if (percentage < 75) status = 'Warning';
      if (percentage < 50) status = 'Danger';
      return { ...s, percentage: percentage.toFixed(0), status };
    });

    // Calculate overall percentage
    const totalAttended = subjectSummary.reduce((acc, s) => acc + s.attendedClasses, 0);
    const totalClasses = subjectSummary.reduce((acc, s) => acc + s.totalClasses, 0);
    const overallPercentage = totalClasses > 0 ? (totalAttended / totalClasses) * 100 : 0;

    res.json({
      rawRecords: attendanceRecords, // For calendar view
      subjectSummary,
      overallPercentage: overallPercentage.toFixed(0),
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;