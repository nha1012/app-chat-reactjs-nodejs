import express from 'express';
import {addContact,gettAllContact,getAllContactAndMessage} from '../controllers/contact';
let router = express.Router();
router.post('/add-contact',addContact);
router.post('/get-all-contact',gettAllContact);
router.post('/get-all-contact-and-message',getAllContactAndMessage);
module.exports = router;