import express from 'express';
import {getAllUser, updateUser, updateBrowserId} from '../controllers/user';
//import validator
let router = express.Router();
// router.get('/singup',signup);
router.post('/get-all-user',getAllUser);
router.post('/update',updateUser);
router.post('/update-browser-id',updateBrowserId);
module.exports = router;