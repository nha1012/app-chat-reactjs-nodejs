import express from 'express';
import {signup, signin} from '../controllers/auth';
//import validator
import {checkValidator} from '../validators/signup/auth';
import {runValidator} from '../validators/signup/index';
let router = express.Router();
// router.get('/singup',signup);
router.post('/signup',checkValidator,runValidator,signup);
router.post('/signin',signin);

module.exports = router;