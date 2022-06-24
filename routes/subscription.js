
import express from 'express';
const subscriptionHandler = require('../subscription/handle');

let router = express.Router();

router.post('', subscriptionHandler.handlePushNotificationSubscription);
router.get('/:id', subscriptionHandler.sendPushNotification);
module.exports = router;
