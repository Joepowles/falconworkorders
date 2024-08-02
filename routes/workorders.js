const express = require('express');
const router = express.Router();
const workOrderController = require('../controllers/workOrderController');

router.post('/workorders', workOrderController.createWorkOrder);
router.get('/workorders', workOrderController.getWorkOrders);
router.put('/workorders/:id', workOrderController.updateWorkOrder);
router.delete('/workorders/:id', workOrderController.deleteWorkOrder);

module.exports = router;
