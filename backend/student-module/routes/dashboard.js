const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Import all necessary models
const Student = require('../models/Student');
const Result = require('../models/Result');
const Attendance = require('../models/Attendance');
const Fee = require('../models/Fee');
const Notification = require('../models/Notification');
const Timetable = require('../models/Timetable');

// @route   GET api/dashboard
// @desc    Get all data for student dashboard
// @access  Private
router.get('/', auth, async (req, res) => {
  console.log('Dashboard route hit');
  try {
    const studentId = req.student.id;

    // 1. Welcome message & Profile Completion
    const student = await Student.findById(studentId).select('-password').populate('course');
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    // Basic profile completion logic
    let profileCompletion = 50; // Base for registration data
    if (student.address) profileCompletion += 10;
    if (student.phone_number) profileCompletion += 10;
    if (student.profile_photo) profileCompletion += 10;
    // ... add other fields as necessary
    profileCompletion = Math.min(profileCompletion, 100);

    // 2. Quick Stats - CGPA, Attendance, Fees
    const results = await Result.find({ student: studentId });
    let totalCredits = 0;
    let totalGradePoints = 0;
    const gradePoints = { 'A': 10, 'B': 8, 'C': 6, 'D': 4, 'E': 2, 'F': 0 };

    results.forEach(result => {
      totalCredits += result.credits;
      totalGradePoints += gradePoints[result.grade] * result.credits;
    });

    const cgpa = totalCredits > 0 ? totalGradePoints / totalCredits : 0;

    // Attendance (simplified: overall percentage)
    const attendanceRecords = await Attendance.find({ student: studentId });
    const totalClasses = attendanceRecords.length;
    const attendedClasses = attendanceRecords.filter(r => r.status === 'Present').length;
    const attendancePercentage = totalClasses > 0 ? (attendedClasses / totalClasses) * 100 : 100;

    // Pending Fees
    const feeDetails = await Fee.findOne({ student: studentId });
    const pendingFees = feeDetails ? feeDetails.pending_amount : 0;

    // 3. Recent Notifications (last 5)
    const notifications = await Notification.find({
      $or: [
        { student: studentId },
        { student: null } // General notifications
      ]
    }).sort({ created_at: -1 }).limit(5);

    // 4. Today's Timetable
    const today = new Date().toLocaleString('en-us', { weekday: 'long' }); // e.g., 'Monday'
    const todaysTimetable = await Timetable.find({
      course: { $in: student.course.map(c => c._id) },
      year: student.year,
      semester: student.semester,
      day_of_week: today
    }).sort({ start_time: 1 });

    res.json({
      welcomeMessage: `Welcome, ${student.full_name}`,
      profileCompletion,
      quickStats: {
        cgpa,
        attendancePercentage: Math.round(attendancePercentage),
        pendingFees,
        upcomingExamsCount: 0, // Placeholder as Exam model doesn't exist
      },
      notifications,
      todaysTimetable,
      courses: student.course,
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
