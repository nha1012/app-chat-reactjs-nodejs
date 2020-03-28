import React, { Component } from 'react';
import {signout} from '../helpers';
import { Redirect, Link } from 'react-router-dom';
class Navigation extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            redirect : false
        }
    }
    onClickHandle=(e)=>{
        e.preventDefault();
        signout(()=>{
            this.setState({
                redirect:true
            })
        })
    }
    render() {
        if(this.state.redirect){
            return <Redirect to='/signin'></Redirect>
        }
        return (
            <div className="navigation">
                            <div className="container">
                            <div className="inside">
                                <div className="nav nav-tab menu">
                                <button className="btn"><img className="avatar-xl" src={JSON.parse(localStorage.getItem('user')).avatar} alt="avatar" /></button>
                                <Link to="/home/contact" ><i className="material-icons">account_circle</i></Link>
                                <Link to="/home/chat-left/id" className="active"><i className="material-icons">chat_bubble_outline</i></Link>                               
                                <Link to="/home/setting" ><i className="material-icons">settings</i></Link>
                                <button onClick={(e)=>this.onClickHandle(e)} className="btn power"><i className="material-icons">power_settings_new</i></button>
                                </div>
                            </div>
                            </div>
                        </div>
        );
    }
}

export default Navigation;