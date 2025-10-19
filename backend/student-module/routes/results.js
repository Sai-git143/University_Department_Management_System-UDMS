const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Result = require('../models/Result');

// Grade to point mapping for GPA calculation
const gradeToPoint = {
  'O': 10,
  'A+': 9,
  'A': 8,
  'B+': 7,
  'B': 6,
  'C': 5,
  'P': 4,
  'F': 0,
  'Ab': 0,
};

const calculateGpa = (results) => {
  if (!results || results.length === 0) return 0;
  let totalPoints = 0;
  let totalCredits = 0;
  results.forEach(result => {
    totalPoints += (gradeToPoint[result.grade] || 0) * result.credits;
    totalCredits += result.credits;
  });
  return totalCredits > 0 ? totalPoints / totalCredits : 0;
};

// @route   GET api/results
// @desc    Get results for the logged-in student with filtering
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { year, semester, course, examType } = req.query;
    const studentId = req.student.id;

    // Build filter object
    const filter = { student: studentId };
    if (year) filter.year = year;
    if (semester) filter.semester = semester;
    if (course) filter.course = course;
    if (examType) filter.exam_type = examType;

    const filteredResults = await Result.find(filter).populate('course', 'name code');

    // Calculate Overall CGPA regardless of filter
    const allResults = await Result.find({ student: studentId });
    const cgpa = calculateGpa(allResults);

    // Calculate SGPA for the filtered results if a semester is specified
    const sgpa = semester ? calculateGpa(filteredResults) : 0;

    res.json({
      results: filteredResults,
      summary: {
        cgpa: cgpa.toFixed(2),
        sgpa: sgpa.toFixed(2),
        totalCredits: allResults.reduce((acc, r) => acc + r.credits, 0),
      }
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;