const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  credits: {
    type: Number,
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
  },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty',
  },
  year: {
    type: Number,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  course_type: {
    type: String,
    enum: ['Core', 'Elective'],
    default: 'Core',
  },
  syllabus: {
    type: String, // Could be a path to a PDF file
  },
  reference_books: {
    type: [String],
  },
  objectives: {
    type: [String],
  },
  outcomes: {
    type: [String],
  },
});

module.exports = mongoose.model('Course', CourseSchema);
