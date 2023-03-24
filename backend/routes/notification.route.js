const express = require('express');
const router = express.Router();
const notificationController = require('../Controllers/notificationController');




router.get('/notifications',notificationController.getNotifications,notificationController.markNotificationAsRead);







module.exports = router;