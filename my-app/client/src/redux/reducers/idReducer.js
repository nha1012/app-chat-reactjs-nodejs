let allState = {
    id:"",
    allUser:[],
    allMessage:[],
    userChat:{},
    chatLeft:[],
    mode:""
}
const idReducer=(state=allState,action)=>{
    switch (action.type) {
        case "CHANGE_ID":
            return{
                ...state,id:action.id
            }
        case "UPDATE_ID_APP":
            return{
                ...state,id:action.id
            }
        case "UPDATE_INFO_USER":
            return{
                ...state,info:action.info
            }
        case "ALL_USER":
            return{
                ...state,allUser:action.allUser
            }
        case "UPDATE_MESSAGE":
            return{
                ...state,allMessage:action.message
            }
        case "ADD_NEW_MESSAGE":
            return{
                ...state,allMessage :[...state.allMessage,action.message]
            }
        case "UPDATE_USER_CHAT":
            return{
                ...state,userChat:action.userChat
            }
        case "UPDATE_CHAT_LEFT":
            return{
                ...state,chatLeft:action.chatLeft
            }
        case "SET_MODE":
            return{
                ...state,mode:action.mode
            }
        default:
            break;
    }
}
export default idReducer;