const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const workOrderRoutes = require('./workorders');

router.use('/api', authRoutes);
router.use('/api', workOrderRoutes);

module.exports = router;
