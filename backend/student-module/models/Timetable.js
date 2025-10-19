const mongoose = require('mongoose');

const TimetableSchema = new mongoose.Schema({
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  day_of_week: {
    type: String,
    required: true,
  },
  start_time: {
    type: String,
    required: true,
  },
  end_time: {
    type: String,
    required: true,
  },
  subject_name: {
    type: String,
    required: true,
  },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty',
    required: true,
  },
  room_number: {
    type: String,
    required: true,
  },
  class_type: {
    type: String,
    enum: ['Lecture', 'Lab', 'Tutorial'],
    required: true,
  },
});

module.exports = mongoose.model('Timetable', TimetableSchema);
