const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Notification = require('../models/Notification');

// @route   GET api/notifications
// @desc    Get all notifications for the logged-in student
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const studentId = req.student.id;
    const { category, read_status } = req.query;

    // Base query: notifications for this student OR general notifications
    const query = {
      $or: [
        { student: studentId },
        { student: null }
      ]
    };

    if (category) {
      query.category = category;
    }

    if (read_status === 'read') {
      query.read_by = studentId;
    } else if (read_status === 'unread') {
      query.read_by = { $ne: studentId };
    }

    const notifications = await Notification.find(query).sort({ created_at: -1 });

    // Add a virtual 'is_read' field for the frontend
    const processedNotifications = notifications.map(n => ({
      ...n.toObject(),
      is_read: n.read_by.includes(studentId),
    }));

    res.json(processedNotifications);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/notifications/:id/read
// @desc    Mark a notification as read
// @access  Private
router.put('/:id/read', auth, async (req, res) => {
  try {
    const studentId = req.student.id;
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ msg: 'Notification not found' });
    }

    // Add student to the read_by array if not already present
    if (!notification.read_by.includes(studentId)) {
      notification.read_by.push(studentId);
      await notification.save();
    }

    res.json({ msg: 'Notification marked as read.' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/notifications/:id/unread
// @desc    Mark a notification as unread
// @access  Private
router.put('/:id/unread', auth, async (req, res) => {
  try {
    const studentId = req.student.id;
    await Notification.updateOne(
      { _id: req.params.id },
      { $pull: { read_by: studentId } }
    );

    res.json({ msg: 'Notification marked as unread.' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;