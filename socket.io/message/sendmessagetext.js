let clients={}
let sendMessageText=(io)=>{
  io.on('connection', function (socket) {
    let currentUserId = null
    let currentUser = {}
    socket.on('client-send-new-message-text', function ( contactFromClient){
      currentUser.message= contactFromClient.message
        if( clients[contactFromClient.receiverId]){
          clients[contactFromClient.receiverId].forEach(element => {
            socket.broadcast.emit('server-send-new-message-text', currentUser);
          })}

      socket.on('disconnect', function () {
            if(clients[currentUserId]){       
              delete clients[currentUserId]
            }
          })
  })
  socket.on("login", function(userdata) {
    currentUser =  userdata;
    currentUserId = userdata._id;
      clients[currentUserId]=[]
      clients[currentUserId]=[socket.id]
});
})}
module.exports= sendMessageText