import React, { Component } from 'react';

class Addfriends extends Component {
    render() {
        return (
            <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="requests">
                <div className="title">
                <h1>Add your friends</h1>
                <button type="button" className="btn" data-dismiss="modal" aria-label="Close"><i className="material-icons">close</i></button>
                </div>
                <div className="content">
                <form>
                    <div className="form-group">
                    <label htmlFor="user">Username:</label>
                    <input type="text" className="form-control" id="user" placeholder="Add recipient..." required />
                    <div className="user" id="contact">
                        <img className="avatar-sm" src="/dist/img/avatars/avatar-female-5.jpg" alt="avatar" />
                        <h5>Keith Morris</h5>
                        <button className="btn"><i className="material-icons">close</i></button>
                    </div>
                    </div>
                    <div className="form-group">
                    <label htmlFor="welcome">Message:</label>
                    <input className="text-control" id="welcome" placeholder="Send your welcome message..." defaultValue={"Hi Keith, I'd like to add you as a contact."} />
                    </div>
                    <button type="submit" className="btn button w-100">Send Friend Request</button>
                </form>
                </div>
            </div>
            </div>
        </div>
        );
    }
}

export default Addfriends;