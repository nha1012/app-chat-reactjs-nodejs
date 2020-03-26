import express from 'express';
import {getAllUser} from '../controllers/user';
import {updateUser} from '../controllers/user';
//import validator
let router = express.Router();
// router.get('/singup',signup);
router.post('/get-all-user',getAllUser);
router.post('/update',updateUser);
module.exports = router;