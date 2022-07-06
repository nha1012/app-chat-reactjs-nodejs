import userModel from '../models/User';
import path from 'path';
import multer from 'multer';
var crypto = require('crypto');

function createHash(input) {
    const md5sum = crypto.createHash('md5');
    md5sum.update(Buffer.from(input));
    return md5sum.digest('hex');
  }
  
const storage = multer.diskStorage({
    destination: "./client/dist/img/avatars",
    filename: function(req, file, cb){
       cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
    }
 });
 
 const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
 }).single("avatar");

exports.getAllUser = (req,res)=>{
    userModel.find({}).select("-hashed_password").select("-salt").exec((err,allUser)=>{
        if (err) {
           return console.log(err);
        }
        res.json({
            alluser: allUser
        })
    })
}
exports.updateUser= (req,res)=>{ 
    upload(req, res, (err) => {
      if(err)
        return res.status(400);

    const avatarName = `/dist/img/avatars/${req.file.filename}`
    userModel.findOneAndUpdate({ '_id': req.cookies.id }, { 'avatar': avatarName }).exec((err,user)=>{
        if(err)
            return console.log(err);
        return res.status(200).json({
            newAvatar: avatarName
        })
    })
   });
}
exports.updateBrowserId= (req,res)=>{ 
    const subscriptionRequest = req.body.data;
    const susbscriptionId = createHash(JSON.stringify(subscriptionRequest));
    subscriptions[susbscriptionId] = subscriptionRequest;
    console.log(subscriptionRequest);
    userModel.findOneAndUpdate({ '_id': req.cookies.id }, { 'browserId': req }).exec((err,user)=>{
        if(err)
            return console.log(err);
        return res.status(200).json({
            newAvatar: avatarName
        })
    })
}