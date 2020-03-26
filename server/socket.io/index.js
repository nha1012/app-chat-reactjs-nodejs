import sendMessageText from './message/sendmessagetext';
let socketConnect=(io)=>{
    sendMessageText(io)
}
module.exports = socketConnect