import React, { Component } from 'react';
import {isAuth} from '../../helpers';
import { Redirect, Link } from 'react-router-dom';
import Axios from 'axios';
import { connect } from 'react-redux';
class ChatLeft extends Component {
    constructor(props) {
        super(props);
        this.state={
            allMessage:[]
        }
    }
    getChatTab = (id)=>{
        this.props.chatLeft.map((value,key)=>{
            if(value.id===id){
               return this.props.updateUserChat(value)
            }
        })
        Axios({
            method:"POST",
            data:{senderId:JSON.parse(localStorage.getItem('id')),receiverId:id},
            baseURL: "http://localhost:4000",
url:'/message/get-message'
        })
        .then(res=>{
            this.setState({
                allMessage:res.data.message
            })
            
            return this.props.updateMessage(this.state.allMessage)
        })
        .catch(err=>{
            console.log(err);
        })
    }
    getAllContactAndMessage(){
        Axios({
            method:"POST",
            baseURL: "http://localhost:4000",
url:"/contact/get-all-contact-and-message",
            data:{userId:JSON.parse(localStorage.getItem('id'))}
        })
        .then(res=>{

            this.props.updateChatLeft1(res.data.allUser)
            res.data.allUser.map((value,key)=>{
                if(value.id===this.props.match.params.id){
                    this.props.updateMessage(value.message)
                    return this.props.updateUserChat(value)
                }
            })
        })
        .catch(err=>{
            console.log(err);
        })        
    }
    UNSAFE_componentWillMount(){ 
       this.getAllContactAndMessage()
     }
    render() {

        if(!isAuth()){
            return <Redirect to="/signin"></Redirect>
        }
        return (
            <div id="discussions" className="tab-pane active show">
                     <div className="search">
                     <form className="form-inline position-relative">
                         <input type="search" className="form-control" id="conversations" placeholder="Search for conversations..." />
                         <button type="button" className="btn btn-link loop"><i className="material-icons">search</i></button>
                     </form>

                     </div>
                     <div className="list-group sort">
                     <button className="btn filterDiscussionsBtn active show" data-toggle="list" data-filter="all">All</button>
                     <button className="btn filterDiscussionsBtn" data-toggle="list" data-filter="read">Read</button>
                     <button className="btn filterDiscussionsBtn" data-toggle="list" data-filter="unread">Unread</button>
                     </div>						
                     <div className="discussions">
                     <h1>Discussions</h1>
                     <div className="list-group" id="chats" role="tablist">
                         {  this.props.chatLeft.map((value,key)=>{
                             if(key===0 ){
                                 return(
                                    <Link onClick={()=>this.getChatTab(value.id)} to={'/home/chat-left/'+value.id} key={key} data-id={value.id} className="filterDiscussions all single " id="list-chat-list">
                                <img className="avatar-md" src={value.avatar} data-toggle="tooltip" data-placement="top" title="Janette" alt="avatar" />
                                <div className="status">
                                    <i className="material-icons online">fiber_manual_record</i>
                                </div>
                                <div className="data">
                                    <h5>{value.name}</h5>
                                    <span>Mon</span>

                                    {                                       
                                        value.message.length>0 ? <p>{value.message[value.message.length - 1 ].text}</p>:<p></p>
                                    }
                                </div>
                                </Link>
                                 )
                             }
                             return(
                                <Link onClick={()=>this.getChatTab(value.id)} to={'/home/chat-left/'+value.id} key={key} data-id={value.id} className="filterDiscussions all single " id="list-chat-list">
                                <img className="avatar-md" src={value.avatar} data-toggle="tooltip" data-placement="top" title="Janette" alt="avatar" />
                                <div className="status">
                                    <i className="material-icons online">fiber_manual_record</i>
                                </div>
                                <div className="data">
                                    <h5>{value.name}</h5>
                                    <span>Mon</span>

                                    {                                       
                                        value.message.length>0 ? <p>{value.message[value.message.length - 1 ].text}</p>:<p></p>
                                    }
                                </div>
                                </Link>
                             )
                         })}						
                     </div>
                     </div>
                 </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        chatLeft: state.chatLeft
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateMessage: (message) => {
            dispatch({
                type:"UPDATE_MESSAGE",
                message:message
            })
        },
        updateUserChat: (userChat) => {
            dispatch({
                type:"UPDATE_USER_CHAT",
                userChat:userChat
            })
        },
        updateChatLeft1:(chatLeft)=>{
            dispatch({
                type: 'UPDATE_CHAT_LEFT',
                chatLeft:chatLeft
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatLeft);
