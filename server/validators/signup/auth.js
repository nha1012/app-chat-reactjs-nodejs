import {check} from 'express-validator';
exports.checkValidator = [
    check('name','name is required')
        .not()
        .isEmpty(),
    check('email', 'Email phai co dang example@gmail.com')
        .isEmail()
        .trim(),
    check('password', 'password phai tren 6 ki tu')
        .isLength({min:6})
]