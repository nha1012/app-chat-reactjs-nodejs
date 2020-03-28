import mongoose from 'mongoose';
mongoose.set('useFindAndModify', false);
let messageSchema = new mongoose.Schema({
  senderId:String,
  receiverId:String,
  text:String,
  isRead:{type:Boolean,default:false},
  file:{data:Buffer,contentType:Buffer,fileName:String},
  createdAt:{type:Number,default:Date.now()},
  updatedAt:{type:Number,default:Date.now()},
  deletedAt:{type:Number,default:null}
})
messageSchema.statics={
  createNewMessage(item){
     return this.create(item);
    },
    findMessagesUser(senderId,receiverId,limit){
    return this.find({
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
    }).sort({ 'createdAt': -1 }).limit(limit).exec()
  },
  findMessagesGroup(receiverId,limit){
    return this.find( 
        {'receiverId':receiverId}
      ).sort({ 'createdAt': -1 }).limit(limit).exec()
  },
  markAllIsReadUser(id){
    return this.updateMany({'senderId':id,'conversationType':MESSAGE_CONVERSATION_TYPES.PERSONAL },{'isRead':true}).exec()
  }
  ,markAllIsReadGroup(id){
    return this.updateMany({'receiverId':id,'conversationType':MESSAGE_CONVERSATION_TYPES.GROUP},{'isRead':true}).exec()
  }
}

module.exports = mongoose.model('Message', messageSchema);