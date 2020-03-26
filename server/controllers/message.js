import messageModel from '../models/message';
import contactModel from '../models/contact'
exports.getMessage = (req,res)=>{
    const {senderId,receiverId} = req.body;
    messageModel.find({
        $or:[
          {
            $and:[
              {'senderId':senderId},
              {'receiverId':receiverId}
            ]
          },
          {
            $and:[
              {'receiverId':senderId},
              {'senderId':receiverId}
            ]
          }
        ]
      }).exec((er,message)=>{
        return res.status(200).json({
            message:message
        })
      })
    
}
exports.createMessage= (req,res)=>{
    let item = {}
    item.senderId = req.body.senderId;
    item.receiverId = req.body.receiverId;
    item.text = req.body.text;
    const newMessage =  messageModel.create(item)
    contactModel.afterAddMessage(req.body.senderId, req.body.receiverId)
    res.status(200).json({
      msg:newMessage
    })
}