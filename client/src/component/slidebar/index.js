import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Settings from './Settings';
import Contact from './Contact';
import ChatLeft from './ChatLeft';
import { isAuth } from '../../helpers';

class index extends Component {
    render() {
        if(!isAuth()){
            return <Redirect to="/signin"></Redirect>
        }
        return (
            <div className="sidebar" id="sidebar">
                    <Route exact path="/home/" component={Contact}></Route>
                    <Route path="/home/setting/" component={Settings}></Route>
                    <Route path="/home/contact/" component={Contact}></Route>
                    <Route path="/home/chat-left/:id" component={ChatLeft}></Route>
            </div>
            
);
    }
}

export default index;