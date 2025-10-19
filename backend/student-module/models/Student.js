const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  registration_id: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  pincode: {
    type: String,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
  },
  course: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  }],
  year: {
    type: Number,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  profile_photo: {
    type: String,
  },
  registration_status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
  father_name: {
    type: String,
  },
  category: {
    type: String,
  },
  puc_group: {
    type: String,
  },
  puc_final_cgpa: {
    type: Number,
  },
  puc_rank: {
    type: Number,
  },
  emergency_contact: {
    name: String,
    relationship: String,
    phone: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
