import React, { Component } from 'react';
import {connect} from 'react-redux';
import { isAuth } from '../../helpers';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
class Settings extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            file: {},
            isChangeFile:false,
            avatar:JSON.parse(localStorage.getItem('user')).avatar||null
        }
    }
    
    changeFileHandle=(event)=>{
        const file = event.target.files[0]
        this.setState({
            file:file,
            isChangeFile:true
        })
    }
    onClickToUpdate=(event)=>{
        event.preventDefault();
        let form = new FormData()
        form.append("avatar",this.state.file)

        axios({
            method:"POST",
            baseURL: "http://localhost:4000",
url:"/user/update",
            data :form
        })
        .then(res=>{
            this.setState({
                avatar:res.data.newAvatar
            })
        })
        .catch(err=>{
            console.log(err);
        })
    }
    render() {
        if(!isAuth()){
            return <Redirect to="/signin"></Redirect>
        }
        return (
                 <div className="tab-pane active show" id="settings">			
                        <div className="settings">
                                    <div className="profile">
                                        <img className="avatar-xl" src={this.state.avatar} alt="avatar" />
                                        <h1><a href="/">{this.props.user.name}</a></h1>
                                    </div>
                                    <div className="categories" id="accordionSettings">
                                        <h1>Settings</h1>
                                        {/* Start of My Account */}
                                        <div className="category">
                                        <a href="/" className="title collapsed" id="headingOne" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            <i className="material-icons md-30 online">person_outline</i>
                                            <div className="data">
                                            <h5>My Account</h5>
                                            <p>Update your profile details</p>
                                            </div>
                                            <i className="material-icons">keyboard_arrow_right</i>
                                        </a>
                                        <div className="collapse" id="collapseOne" aria-labelledby="headingOne" data-parent="#accordionSettings">
                                            <div className="content">
                                            <div className="upload">
                                                <div className="data">
            
                                                <label>
                                                    <input type="file" onChange={(e)=>this.changeFileHandle(e)}/>
                                                    <span className="btn button">Upload avatar</span>
                                                </label>
                                                </div>
                                                <p>For best results, use an image at least 256px by 256px in either .jpg or .png format!</p>
                                            </div>
                                            <form>
                                                <button onClick={(e)=>this.onClickToUpdate(e)} type="submit" className="btn button w-100">Apply</button>
                                            </form>
                                            </div>
                                        </div>
                                        </div>
                                        {/* End of My Account */}
                                        {/* Start of Chat History */}
                                        <div className="category">
                                        <a href="/" className="title collapsed" id="headingTwo" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                            <i className="material-icons md-30 online">mail_outline</i>
                                            <div className="data">
                                            <h5>Chats</h5>
                                            <p>Check your chat history</p>
                                            </div>
                                            <i className="material-icons">keyboard_arrow_right</i>
                                        </a>
                                        <div className="collapse" id="collapseTwo" aria-labelledby="headingTwo" data-parent="#accordionSettings">
                                            <div className="content layer">
                                            <div className="history">
                                                <p>When you clear your conversation history, the messages will be deleted from your own device.</p>
                                                <p>The messages won't be deleted or cleared on the devices of the people you chatted with.</p>
                                                <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="same-address" />
                                                <label className="custom-control-label" htmlFor="same-address">Hide will remove your chat history from the recent list.</label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="save-info" />
                                                <label className="custom-control-label" htmlFor="save-info">Delete will remove your chat history from the device.</label>
                                                </div>
                                                <button type="submit" className="btn button w-100">Clear blah-blah</button>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                        {/* End of Chat History */}
                                        {/* Start of Notifications Settings */}
                                        <div className="category">
                                        <a href="/" className="title collapsed" id="headingThree" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                                            <i className="material-icons md-30 online">notifications_none</i>
                                            <div className="data">
                                            <h5>Notifications</h5>
                                            <p>Turn notifications on or off</p>
                                            </div>
                                            <i className="material-icons">keyboard_arrow_right</i>
                                        </a>
                                        <div className="collapse" id="collapseThree" aria-labelledby="headingThree" data-parent="#accordionSettings">
                                            <div className="content no-layer">
                                            <div className="set">
                                                <div className="details">
                                                <h5>Desktop Notifications</h5>
                                                <p>You can set up Swipe to receive notifications when you have new messages.</p>
                                                </div>
                                                <label className="switch">
                                                <input type="checkbox" defaultChecked />
                                                <span className="slider round" />
                                                </label>
                                            </div>
                                            <div className="set">
                                                <div className="details">
                                                <h5>Unread Message Badge</h5>
                                                <p>If enabled shows a red badge on the Swipe app icon when you have unread messages.</p>
                                                </div>
                                                <label className="switch">
                                                <input type="checkbox" defaultChecked />
                                                <span className="slider round" />
                                                </label>
                                            </div>
                                            <div className="set">
                                                <div className="details">
                                                <h5>Taskbar Flashing</h5>
                                                <p>Flashes the Swipe app on mobile in your taskbar when you have new notifications.</p>
                                                </div>
                                                <label className="switch">
                                                <input type="checkbox" />
                                                <span className="slider round" />
                                                </label>
                                            </div>
                                            <div className="set">
                                                <div className="details">
                                                <h5>Notification Sound</h5>
                                                <p>Set the app to alert you via notification sound when you have unread messages.</p>
                                                </div>
                                                <label className="switch">
                                                <input type="checkbox" defaultChecked />
                                                <span className="slider round" />
                                                </label>
                                            </div>
                                            <div className="set">
                                                <div className="details">
                                                <h5>Vibrate</h5>
                                                <p>Vibrate when receiving new messages (Ensure system vibration is also enabled).</p>
                                                </div>
                                                <label className="switch">
                                                <input type="checkbox" />
                                                <span className="slider round" />
                                                </label>
                                            </div>
                                            <div className="set">
                                                <div className="details">
                                                <h5>Turn On Lights</h5>
                                                <p>When someone send you a text message you will receive alert via notification light.</p>
                                                </div>
                                                <label className="switch">
                                                <input type="checkbox" />
                                                <span className="slider round" />
                                                </label>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                        {/* End of Notifications Settings */}
                                        {/* Start of Connections */}
                                        <div className="category">
                                        <a href="/" className="title collapsed" id="headingFour" data-toggle="collapse" data-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                                            <i className="material-icons md-30 online">sync</i>
                                            <div className="data">
                                            <h5>Connections</h5>
                                            <p>Sync your social accounts</p>
                                            </div>
                                            <i className="material-icons">keyboard_arrow_right</i>
                                        </a>
                                        <div className="collapse" id="collapseFour" aria-labelledby="headingFour" data-parent="#accordionSettings">
                                            <div className="content">
                                            <div className="app">
                                                <img src="/dist/img/integrations/slack.svg" alt="app" />
                                                <div className="permissions">
                                                <h5>Skrill</h5>
                                                <p>Read, Write, Comment</p>
                                                </div>
                                                <label className="switch">
                                                <input type="checkbox" defaultChecked />
                                                <span className="slider round" />
                                                </label>
                                            </div>
                                            <div className="app">
                                                <img src="/dist/img/integrations/dropbox.svg" alt="app" />
                                                <div className="permissions">
                                                <h5>Dropbox</h5>
                                                <p>Read, Write, Upload</p>
                                                </div>
                                                <label className="switch">
                                                <input type="checkbox" defaultChecked />
                                                <span className="slider round" />
                                                </label>
                                            </div>
                                            <div className="app">
                                                <img src="/dist/img/integrations/drive.svg" alt="app" />
                                                <div className="permissions">
                                                <h5>Google Drive</h5>
                                                <p>No permissions set</p>
                                                </div>
                                                <label className="switch">
                                                <input type="checkbox" />
                                                <span className="slider round" />
                                                </label>
                                            </div>
                                            <div className="app">
                                                <img src="/dist/img/integrations/trello.svg" alt="app" />
                                                <div className="permissions">
                                                <h5>Trello</h5>
                                                <p>No permissions set</p>
                                                </div>
                                                <label className="switch">
                                                <input type="checkbox" />
                                                <span className="slider round" />
                                                </label>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                        {/* End of Connections */}
                                        {/* Start of Appearance Settings */}
                                        <div className="category">
                                        <a href="/" className="title collapsed" id="headingFive" data-toggle="collapse" data-target="#collapseFive" aria-expanded="true" aria-controls="collapseFive">
                                            <i className="material-icons md-30 online">colorize</i>
                                            <div className="data">
                                            <h5>Appearance</h5>
                                            <p>Customize the look of Swipe</p>
                                            </div>
                                            <i className="material-icons">keyboard_arrow_right</i>
                                        </a>
                                        <div className="collapse" id="collapseFive" aria-labelledby="headingFive" data-parent="#accordionSettings">
                                            <div className="content no-layer">
                                            <div className="set">
                                                <div className="details">
                                                <h5>Turn Off Lights</h5>
                                                <p>The dark mode is applied to core areas of the app that are normally displayed as light.</p>
                                                </div>
                                                <label className="switch">
                                                <input type="checkbox" />
                                                <span className="slider round mode" />
                                                </label>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                        {/* End of Appearance Settings */}
                                        {/* Start of Language */}
                                        <div className="category">
                                        <a href="/" className="title collapsed" id="headingSix" data-toggle="collapse" data-target="#collapseSix" aria-expanded="true" aria-controls="collapseSix">
                                            <i className="material-icons md-30 online">language</i>
                                            <div className="data">
                                            <h5>Language</h5>
                                            <p>Select preferred language</p>
                                            </div>
                                            <i className="material-icons">keyboard_arrow_right</i>
                                        </a>
                                        <div className="collapse" id="collapseSix" aria-labelledby="headingSix" data-parent="#accordionSettings">
                                            <div className="content layer">
                                            <div className="language">
                                                <label htmlFor="country">Language</label>
                                                <select className="custom-select" id="country" required>
                                                <option value>Select an language...</option>
                                                <option>English, UK</option>
                                                <option>English, US</option>
                                                </select>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                        {/* End of Language */}
                                        {/* Start of Privacy & Safety */}
                                        <div className="category">
                                        <a href="/" className="title collapsed" id="headingSeven" data-toggle="collapse" data-target="#collapseSeven" aria-expanded="true" aria-controls="collapseSeven">
                                            <i className="material-icons md-30 online">lock_outline</i>
                                            <div className="data">
                                            <h5>Privacy &amp; Safety</h5>
                                            <p>Control your privacy settings</p>
                                            </div>
                                            <i className="material-icons">keyboard_arrow_right</i>
                                        </a>
                                        <div className="collapse" id="collapseSeven" aria-labelledby="headingSeven" data-parent="#accordionSettings">
                                            <div className="content no-layer">
                                            <div className="set">
                                                <div className="details">
                                                <h5>Keep Me Safe</h5>
                                                <p>Automatically scan and delete direct messages you receive from everyone that contain explict content.</p>
                                                </div>
                                                <label className="switch">
                                                <input type="checkbox" />
                                                <span className="slider round" />
                                                </label>
                                            </div>
                                            <div className="set">
                                                <div className="details">
                                                <h5>My Friends Are Nice</h5>
                                                <p>If enabled scans direct messages from everyone unless they are listed as your friend.</p>
                                                </div>
                                                <label className="switch">
                                                <input type="checkbox" defaultChecked />
                                                <span className="slider round" />
                                                </label>
                                            </div>
                                            <div className="set">
                                                <div className="details">
                                                <h5>Everyone can add me</h5>
                                                <p>If enabled anyone in or out your friends of friends list can send you a friend request.</p>
                                                </div>
                                                <label className="switch">
                                                <input type="checkbox" defaultChecked />
                                                <span className="slider round" />
                                                </label>
                                            </div>
                                            <div className="set">
                                                <div className="details">
                                                <h5>Friends of Friends</h5>
                                                <p>Only your friends or your mutual friends will be able to send you a friend reuqest.</p>
                                                </div>
                                                <label className="switch">
                                                <input type="checkbox" defaultChecked />
                                                <span className="slider round" />
                                                </label>
                                            </div>
                                            <div className="set">
                                                <div className="details">
                                                <h5>Data to Improve</h5>
                                                <p>This settings allows us to use and process information for analytical purposes.</p>
                                                </div>
                                                <label className="switch">
                                                <input type="checkbox" />
                                                <span className="slider round" />
                                                </label>
                                            </div>
                                            <div className="set">
                                                <div className="details">
                                                <h5>Data to Customize</h5>
                                                <p>This settings allows us to use your information to customize Swipe for you.</p>
                                                </div>
                                                <label className="switch">
                                                <input type="checkbox" />
                                                <span className="slider round" />
                                                </label>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                        {/* End of Privacy & Safety */}
                                        {/* Start of Logout */}
                                        <div className="category">
                                        <a href="sign-in.html" className="title collapsed">
                                            
                                            <i className="material-icons md-30 online">power_settings_new</i>
                                            <div className="data">
                                            <h5>Power Off</h5>
                                            <p>Log out of your account</p>
                                            </div>
                                            <i className="material-icons">keyboard_arrow_right</i>
                                        </a>
                                        </div>
                                        {/* End of Logout */}
                                    </div>
                                    </div>
                                </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.info
    }
}
export default connect(mapStateToProps)(Settings);
