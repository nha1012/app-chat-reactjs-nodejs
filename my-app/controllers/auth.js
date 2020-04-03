//import userModel
import User from '../models/User';
import jwt from 'jsonwebtoken';
exports.signup = (req, res) => {
    const { name, email, password } = req.body;   
    User.findOne({'email':email}).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is taken'
            });
        }else{
            let newUser = new User({ name, email, password });
            newUser.save((err, success) => {
                if (err) {
                    console.log('SIGNUP ERROR', err);
                    return res.status(400).json({
                        error: err
                    });
                }
                res.json({
                    message: 'Signup success! Please signin'
                });
            });
        }
    });
};
exports.signin=(req,res)=>{
    const {email,password} = req.body
    User.findOne({'email':email}).exec((err,user)=>{
        if(err){
            return res.status(400).json({error:"Sai tai khoan hoac mat khau"})
        } else if(user){
            if(!user.authenticate(password)){
                return res.status(400).json({error:"Sai tai khoan hoac mat khau"})
            }
            else{
                const token = jwt.sign({ email: user.email, name: user.name, _id: user._id}, 'RESTFULAPIs');
                const { _id, name, email, role, avatar } = user;
                req.session.user = user;
                return res.json({
                    token,
                    user: { _id, name, email, role ,avatar}
                });
              
                
        }
        }
            
      
    })

}
exports.requiredSignin=(req,res)=>{
    if (req.user) {
        next();
      } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
      }
}