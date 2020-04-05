import React, { Component } from 'react';
import Navigation from './Navigation';
import Addfriend from './Addfriends';
import Chat from './Chat';
import {isAuth} from '../helpers';
import { Redirect} from 'react-router-dom';
import Slidebar from './slidebar/index'
import io from 'socket.io-client';
import {connect} from 'react-redux';
class Home extends Component {
    constructor(props) {
        super(props);
        this.socket= null;
    }
    UNSAFE_componentWillMount() {
        const local = localStorage.getItem('user')
        this.props.updateInfoUser(JSON.parse(local))
        this.socket = io('http://localhost:4000');
    
     }
    render() {
        if(!isAuth()){
            return <Redirect to="/signin"></Redirect>
        }
            return (
                <div id="mode-theme" className="dark">
                    <div>
                        <main>

                           <div className="layout">
                            {/* Start of Navigation */}
                            <Navigation ></Navigation>
                            {/* End of Navigation */}
                            {/* Start of Sidebar */}
                            <Slidebar></Slidebar>
                            {/* End of Sidebar */}
                            {/* Start of Add Friends */}
                            <Addfriend></Addfriend>
                            {/* End of Add Friends */}
                            <div className="main">
                                <div className="tab-content" id="nav-tabContent">
                                {/* Start of Babble */}
                                <div className="babble tab-pane fade active show" id="list-chat" role="tabpanel" aria-labelledby="list-chat-list">
                                    {/* Start of Chat */}
                                 <Chat></Chat>
                                    {/* End of Chat */}
                                </div>
                                {/* End of Babble */}
                                </div>
                            </div>
                            </div>
                        </main>
                        </div>
    
                </div>
            );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        state: state
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateInfoUser:(info)=>{
            dispatch({
                type:"UPDATE_INFO_USER",
                info:info
            })
        }
    }
}
export default connect(mapStateToProps,  mapDispatchToProps)(Home);