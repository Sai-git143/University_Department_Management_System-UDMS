const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/profile', require('./profile'));
router.use('/fees', require('./fees'));
router.use('/results', require('./results'));
router.use('/timetable', require('./timetable'));
router.use('/attendance', require('./attendance'));
router.use('/dashboard', require('./dashboard'));
router.use('/courses', require('./courses'));
router.use('/notifications', require('./notifications'));
router.use('/', require('./student'));

module.exports = router;
