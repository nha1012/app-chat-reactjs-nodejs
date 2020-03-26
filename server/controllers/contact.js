import contactModel from '../models/contact';
import userModel from '../models/User';
import messageModel from '../models/message';
exports.addContact = (req,res)=>{
    const {userId,contactId} = req.body;
    contactModel.findOne( { $or:[ {$and:[{'userId':userId },{'contactId':contactId}]},  {$and:[{'userId':contactId },{'contactId':userId}]}]}).exec((err,contact)=>{
        if(!contact){
            const contactNew = new contactModel({userId,contactId});
            contactNew.save((err,contact)=>{
                if(err){
                return console.log(err);
                }
                return res.json({
                    msg:"Da them contact"
                })
            })
        }

    })
}
exports.gettAllContact= async(req,res)=>{
  const {userId} = req.body
  let allContact =await contactModel.findContacted(userId)
  allContact = await Promise.all(allContact);
  let allFriend = allContact.map(async item=>{
      if(userId==item.contactId){
         let user = await userModel.findById(item.userId)
         return {
          _id: user._id,
           avatar:user.avatar,
           name:user.name,
           updatedAt : item.updatedAt
         }
      }
      else{
        let user = await userModel.findById(item.contactId)
        return {
          _id: user._id,
          avatar:user.avatar,
          name:user.name,
          updatedAt : item.updatedAt
        }

      }})
  let allContactNew = await Promise.all(allFriend);
  allContactNew = allContactNew.sort(function (a, b) {
    return b.updatedAt-a.updatedAt ;
  });
  await userModel.find().exec((err,allUser)=>{
    res.status(200).json({
      allContact:allContactNew,
      allUser:allUser
    })
    })
}
exports.getAllContactAndMessage= async(req,res)=>{
  const {userId} = req.body
  let allContact =await contactModel.findContacted(userId)
  allContact = await Promise.all(allContact);
  let allFriend = allContact.map(async item=>{
      if(userId==item.contactId){
         let user = await userModel.findById(item.userId)
         return {
           id: user._id,
           avatar:user.avatar,
           name:user.name,
           updatedAt : item.updatedAt
         }
      }
      else{
        let user = await userModel.findById(item.contactId)
        return {
          id: user._id,
          avatar:user.avatar,
          name:user.name,
          updatedAt : item.updatedAt
        }
      }})
  let allUserChat = await Promise.all(allFriend);
  let allArrayUserPromise =  allUserChat.map(async item=>{
      let message = await messageModel.findMessagesUser(userId, item.id,20)
      item.message = message
      return item
    }
  )  
  allArrayUserPromise= await Promise.all(allArrayUserPromise) ;
  allArrayUserPromise = allArrayUserPromise.sort(function (a, b) {
    return b.updatedAt-a.updatedAt ;
  });
  return res.status(200).json({
    allUser: allArrayUserPromise
  })   
}