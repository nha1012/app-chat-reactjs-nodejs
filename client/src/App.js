import React, { Component } from 'react';
import Home from './component/Home';
import SignIn from './component/SignIn';
import SignUp from './component/SignUp';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import Chat from './component/Chat';
import ChatLeft from './component/slidebar/ChatLeft';
class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={

        }
    }
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/home/chat-left/123"></Redirect>
                    </Route>
                    <Route path="/home" component={Home}></Route>
                    <Route path="/signin" component={SignIn}/>
                    <Route path="/signup" component={SignUp}/>
                    <Route path="/home/*/:id" component={Chat}/>
                    <Route path="/home/chat-left" component={ChatLeft}/>
                </Switch>
          </Router>
        );
    }
}
export default App;