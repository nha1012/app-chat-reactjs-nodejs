
import express from 'express';
const subscriptionHandler = require('../subscription/handle');

let router = express.Router();

router.post('', subscriptionHandler.handlePushNotificationSubscription);
module.exports = router;
