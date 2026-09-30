const express = require('express');
const router = express.Router();

const binController = require('../controllers/binController');
const complaintController = require('../controllers/complaintController');
const taskController = require('../controllers/taskController');

// Bins & Telemetry routes
router.get('/bins', binController.getAllBins);
router.get('/bins/:id', binController.getBinById);
router.post('/bins/telemetry', binController.updateTelemetry);

// Complaints routes
router.get('/complaints', complaintController.getAllComplaints);
router.post('/complaints', complaintController.createComplaint);
router.get('/complaints/:ticket_id', complaintController.trackComplaint);

// Collection Tasks & Dispatch routes
router.get('/tasks', taskController.getAllTasks);
router.post('/tasks', taskController.createTask);
router.post('/tasks/:id/complete', taskController.completeTask);

module.exports = router;
