import React, { Component } from 'react';
import {  Redirect } from 'react-router-dom';
import { isAuth } from '../helpers';
import { connect } from 'react-redux';
import Axios from 'axios';
import { animateScroll } from "react-scroll";
import io from 'socket.io-client';
import Emoji from 'emoji-picker-react';
class Chat extends Component {
    constructor(props) {
        super(props);
        this.state={
            message:"",
            isChat:false,
            previewMessage:"",
            allMessage: this.props.allMessage,
            chatLeft : null,
            showEmoji: false,
            emoji:[]
        }
        this.socket = null;
    }
    getAllContactAndMessage(){
        Axios({
            method:"POST",
            url:"/contact/get-all-contact-and-message",
            data:{userId:JSON.parse(localStorage.getItem('id'))}
        })
        .then(res=>{
            this.setState({
                chatLeft: res.data.allUser
            })
            return this.props.updateChatLeft(res.data.allUser)
        })
        .catch(err=>{
            console.log(err);
        })        
    }
    UNSAFE_componentWillMount(){
        this.socket = io('http://localhost:4000');
        this.socket.emit('login', JSON.parse(localStorage.getItem('user')));
        this.socket.on('server-send-new-message-text', (response) => {
            let message = {
                isRead: false,
                    createdAt: 1584690041540,
                    updatedAt: null,
                    deletedAt: null,
                    _id: '5e7473c6f73a411a38825b91',
                    senderId: response._id,
                    receiverId: null,
                    text: response.message,
                    __v: 0
            }
            this.props.allMessage.push(message)
            this.setState({
                allMessage: this.props.allMessage
            })
            Axios({
                method:"POST",
                url:"/contact/get-all-contact-and-message",
                data:{userId:JSON.parse(localStorage.getItem('id'))}
            })
            .then(res=>{
                this.setState({
                    chatLeft: res.data.allUser
                })
                return this.props.updateChatLeft(res.data.allUser)
            })
            .catch(err=>{
                console.log(err);
            })
        })
    }
    socketsendMessage(senderId,receiverId,value){
        let data = {}
        data.senderId = senderId
        data.receiverId = receiverId
        data.message = value
        this.socket.emit('client-send-new-message-text', data)
    }
    scrollToBottom() {
        animateScroll.scrollToBottom({
          containerId: "content",
           duration: 200
        });
    }
    onChangeMessage = (event)=>{
       this.setState({
           message: event.target.value,
           isChat:true
       })
    }
    componentDidMount() {
        this.scrollToBottom();
    }
    componentDidUpdate() {
        this.scrollToBottom();
    }
    toggleEmoji=()=>{
        this.setState({
            showEmoji: !this.state.showEmoji
        })
    }
    clickEmoji=(e)=>{
        let newArr = [...this.state.emoji, e.target]
        this.setState({
            emoji: newArr
        })
    }
    onSubmitMessage=(event,senderId,receiverId)=>{
        event.preventDefault(event);
        if(this.state.isChat===true){
            Axios({
                method:"POST",
                url:"/message/create-message",
                data:{receiverId:receiverId, senderId:senderId, text:this.state.message}
            })
            .then(res=>{
                this.socketsendMessage(senderId,receiverId,this.state.message)
                this.getAllContactAndMessage()
                this.props.allMessage.push({
                    isRead: false,
                    createdAt: 1584690041540,
                    updatedAt: null,
                    deletedAt: null,
                    _id: '5e7473c6f73a411a38825b91',
                    senderId: senderId,
                    receiverId: receiverId,
                    text: this.state.message,
                    __v: 0
                  });
                this.setState({
                    message:"",
                    isChat:false,
                    previewMessage:this.state.message
                })
            })
            .catch(err=>{
                console.log(err);
            })
        } 
    }
    render() { 
        if(!isAuth()){
            return <Redirect to="/signin"></Redirect>
        }
        let arrMessage = this.props.allMessage
        return (
            <div>
                 <div className="chat" id="chat1">
            <div className="top">
                <div className="container">
                <div className="col-md-12">
                    <div className="inside">
                    <a href="/"><img className="avatar-md" src={this.props.userChat.avatar} data-toggle="tooltip" data-placement="top" title="Keith" alt="avatar" /></a>
                    <div className="status">
                        <i className="material-icons online">fiber_manual_record</i>
                    </div>
                    <div className="data">
                        <h5><a href="/">{this.props.userChat.name}</a></h5>
                        <span>Active now</span>
                    </div>
                    <button className="btn connect d-md-block d-none" name={1}><i className="material-icons md-30">phone_in_talk</i></button>
                    <button className="btn connect d-md-block d-none" name={1}><i className="material-icons md-36">videocam</i></button>
                    <button className="btn d-md-block d-none"><i className="material-icons md-30">info</i></button>
                    <div className="dropdown">
                        <button className="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="material-icons md-30">more_vert</i></button>
                        <div className="dropdown-menu dropdown-menu-right">
                        <button className="dropdown-item connect" name={1}><i className="material-icons">phone_in_talk</i>Voice Call</button>
                        <button className="dropdown-item connect" name={1}><i className="material-icons">videocam</i>Video Call</button>
                        <hr />
                        <button className="dropdown-item"><i className="material-icons">clear</i>Clear History</button>
                        <button className="dropdown-item"><i className="material-icons">block</i>Block Contact</button>
                        <button className="dropdown-item"><i className="material-icons">delete</i>Delete Contact</button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div className="content" id="content">
                <div className="container">
                <div className="col-md-12">
                    <div className="date">
                    <hr />
                    <span>Yesterday</span>
                    <hr />
                    </div>
                    {
                    
                    arrMessage.map((element,key) => {
                        if(element.senderId===JSON.parse(localStorage.getItem('id'))){
                            return (
                                <div key={key} className="message me">
                                <div className="text-main">
                                    <div className="text-group me">
                                    <div className="text me">
                                    <p>{element.text}</p>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            )
                        }
                        return(
                            <div key={key} className="message ">
                                <div className="text-main">
                                    <div className="text-group ">
                                    <div className="text ">
                                    <p>{element.text}</p>
                                    </div>
                                    </div>
                                </div>
                                </div>
                        )
                    })}
                </div>
                </div>
            </div>
            <div className="container">
                <div className="col-md-12">
                <div className="bottom" onSubmit={(event)=>this.onSubmitMessage(event, JSON.parse(localStorage.getItem('id')), this.props.userChat.id)}>
                    <form className="position-relative w-100">
                    <input className="form-control" onChange={(event)=>this.onChangeMessage(event)} placeholder="Start typing for reply..." rows={1} name="message" value={this.state.emoji } />
                    <button onClick={()=>this.toggleEmoji()} className="btn emoticons"><i className="material-icons">insert_emoticon</i></button>
                    <button onClick={(event)=>this.onSubmitMessage(event, JSON.parse(localStorage.getItem('id')), this.props.userChat.id)} type="submit" className="btn send"><i className="material-icons">send</i></button>
                    </form>
                    <label>
                    <input type="file" className="message-type"/>
                    <span className="btn attach d-sm-block d-none"><i className="material-icons">attach_file</i></span>
                    </label> 
                </div>
                <div>
                {this.state.showEmoji ? <Emoji onEmojiClick={(e)=>this.clickEmoji(e)}/> : null}
                </div>
                </div>
            </div>
            </div>
            </div>
           
          
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        allMessage: state.allMessage,
        userChat : state.userChat
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateMessage: (message) => {
            dispatch({
                type:"UPDATE_MEASSAGE",
                message:message
            })
        },
        addNewMessage: (message) => {
            dispatch({
                type:"ADD_NEW_MEASSAGE",
                message:message
            })
        },
        updateChatLeft: (chatLeft) => {
            dispatch({
                type:"UPDATE_CHAT_LEFT",
                chatLeft:chatLeft
            })
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Chat);