const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Notification = require('../models/Notification');

// @route   GET api/student/:id/notifications
// @desc    Get all notifications for a student
// @access  Private
router.get('/:id/notifications', auth, async (req, res) => {
  try {
    const notifications = await Notification.find({
      $or: [
        { student: req.params.id },
        { student: null }
      ]
    });
    if (!notifications) {
      return res.status(404).json({ msg: 'No notifications found' });
    }
    res.json(notifications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
