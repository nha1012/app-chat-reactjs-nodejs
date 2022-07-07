const subscriptions = {};
var crypto = require('crypto');
const webpush = require('web-push');

const vapidKeys = {
  privateKey: 'bdSiNzUhUP6piAxLH-tW88zfBlWWveIx0dAsDO66aVU',
  publicKey:
    'BIN2Jc5Vmkmy-S3AUrcMlpKxJpLeVRAfu9WBqUbJ70SJOCWGCGXKY-Xzyh7HDr6KbRDGYHjqZ06OcS3BjD7uAm8'
};

webpush.setVapidDetails('mailto:example@yourdomain.org', vapidKeys.publicKey, vapidKeys.privateKey);

function createHash(input) {
  const md5sum = crypto.createHash('md5');
  md5sum.update(Buffer.from(input));
  return md5sum.digest('hex');
}

function handlePushNotificationSubscription(req, res) {
  const subscriptionRequest = req.body.data.subscription;
  const userId = req.body.data.userId
  subscriptions[userId] = subscriptionRequest;
  res.status(201).json({ id: userId });
}

function sendPushNotification(userId, text, senderId) {
  const pushSubscription = subscriptions[userId];
  webpush
    .sendNotification(
      pushSubscription,
      JSON.stringify({
        title: `New messages from ${userId}`,
        text: text,
        image: '/dist/img/favicon.png',
        tag: 'new-messages',
        url: `/home/chat-left/${senderId}`
      })
    )
    .catch((err) => {
      console.log(err);
    });
}

module.exports = { handlePushNotificationSubscription, sendPushNotification };
