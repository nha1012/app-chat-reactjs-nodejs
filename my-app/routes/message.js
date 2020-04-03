import express from 'express';
import {getMessage,createMessage} from '../controllers/message';
let router = express.Router();
router.post('/get-message',getMessage);
router.post('/create-message',createMessage);
module.exports = router;