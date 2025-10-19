const mongoose = require('mongoose');

const StudentDocumentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  document_type: {
    type: String,
    enum: ['10th', '12th', 'ID Proof'],
    required: true,
  },
  file_path: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('StudentDocument', StudentDocumentSchema);
