import React, { Component } from 'react';
import {Link,Redirect } from "react-router-dom";
import axios from 'axios';  
import {isAuth} from '../helpers'
import {ToastsContainer, ToastsStore,ToastsContainerPosition} from 'react-toasts';
class SignUp extends Component {  
    constructor(props, context) {
        super(props, context);
        this.state={
            email:"",
            password:"",
            name:"",
            redirect:false
        }
    }
    onChangeHandle=(event)=>{   
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    onSubmitHandle=(event)=>{
        event.preventDefault()
        const { name, email, password } = this.state;   
        axios({
            method: 'POST',
            baseURL: "http://localhost:4000",
url: '/signup',
            data: { name, email, password }
        })
            .then(res=>{
                ToastsStore.success("Bạn đã đăng ký thành công")
                this.setState({
                    redirect:true
                })
            })
            .catch(err=>{
                ToastsStore.error("Email không chính xác hoặc đã được sử dụng")
            })
    }
    render() {
        if(this.state.redirect){
            return <Redirect to={{
                pathname: '/signin',
            }} />
        }
        return (
            <main>
                {isAuth() ? <Redirect to="/" /> : null}
                <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT}/>
                <div className="layout">
                {/* Start of Sign Up */}
                <div className="main order-md-2">
                    <div className="start">
                    <div className="container">
                        <div className="col-md-12">
                        <div className="content">
                            <h1>Create Account</h1>
                            <div className="third-party">
                            <button className="btn item bg-blue">
                                <i className="material-icons">pages</i>
                            </button>
                            <button className="btn item bg-teal">
                                <i className="material-icons">party_mode</i>
                            </button>
                            <button className="btn item bg-purple">
                                <i className="material-icons">whatshot</i>
                            </button>
                            </div>
                            <p>or use your email for registration:</p>
                            <form onSubmit= {(e)=>this.onSubmitHandle(e)} className="signup">
                            <div className="form-parent">
                                <div className="form-group">
                                <input  onChange= {(e)=>this.onChangeHandle(e)} type="text" id="inputName" className="form-control" name="name" placeholder="Username" required />
                                <button className="btn icon"><i className="material-icons">person_outline</i></button>
                                </div>
                                <div className="form-group">
                                <input  onChange= {(e)=>this.onChangeHandle(e)} name="email" type="email" id="inputEmail" className="form-control" placeholder="Email Address" required />
                                <button className="btn icon"><i className="material-icons">mail_outline</i></button>
                                </div>
                            </div>
                            <div className="form-group">
                                <input  onChange= {(e)=>this.onChangeHandle(e)} name="password" type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                                <button className="btn icon"><i className="material-icons">lock_outline</i></button>
                            </div>
                            <button type="submit" className="btn button" formAction="index-2.html">Sign Up</button>
                            <div className="callout">
                                <span>Already a member? <a href="sign-in.html">Sign In</a></span>
                            </div>
                            </form>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                {/* End of Sign Up */}
                {/* Start of Sidebar */}
                <div className="aside order-md-1">
                    <div className="container">
                    <div className="col-md-12">
                        <div className="preference">
                        <h2>Welcome Back!</h2>
                        <p>To keep connected with your friends please login with your personal info.</p>
                        <Link to="/signin" className="btn button signin">Sign In</Link>
                        </div>
                    </div>
                    </div>
                </div>
                {/* End of Sidebar */}
                </div> {/* Layout */}
            </main>
          
        );
    }
}

export default SignUp;
