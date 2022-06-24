import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import axios from "axios"
import { authenticate, isAuth } from "../helpers"
import { connect } from "react-redux"
class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      redirect: false,
      id: "",
    }
  }
  onChangeLoggin = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  onSubmitLoggin = e => {
    e.preventDefault()
    const { email, password } = this.state
    axios({
      baseURL: "http://localhost:4000",
      method: "POST",
      url: "/signin",
      data: { email, password },
    })
      .then(res => {
        authenticate(res, () => {
          this.props.changeId(res.data.user._id)
          this.setState({
            password: "",
            redirect: true,
          })
        })
      })
      .catch(err => {
        console.log("chua gui")
        console.log(err)
      })
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/"></Redirect>
    }
    return (
      <main>
        {isAuth() ? <Redirect to="/" /> : null}
        <div className="layout">
          {/* Start of Sign In */}
          <div className="main order-md-1">
            <div className="start">
              <div className="container">
                <div className="col-md-12">
                  <div className="content">
                    <h1>Sign in to Swipe</h1>
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
                    <p>or use your email account:</p>
                    <form onSubmit={e => this.onSubmitLoggin(e)}>
                      <div className="form-group">
                        <input
                          onChange={e => this.onChangeLoggin(e)}
                          type="email"
                          name="email"
                          id="inputEmail"
                          className="form-control"
                          placeholder="Email Address"
                          required
                        />
                        <button className="btn icon">
                          <i className="material-icons">mail_outline</i>
                        </button>
                      </div>
                      <div className="form-group">
                        <input
                          onChange={e => this.onChangeLoggin(e)}
                          type="password"
                          name="password"
                          id="inputPassword"
                          className="form-control"
                          placeholder="Password"
                          required
                        />
                        <button className="btn icon">
                          <i className="material-icons">lock_outline</i>
                        </button>
                      </div>
                      <button type="submit" className="btn button">
                        Sign In
                      </button>
                      <div className="callout">
                        <span>
                          Don't have account?{" "}
                          <a href="sign-up.html">Create Account</a>
                        </span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End of Sign In */}
          {/* Start of Sidebar */}
          <div className="aside order-md-2">
            <div className="container">
              <div className="col-md-12">
                <div className="preference">
                  <h2>Hello, Friend!</h2>
                  <p>
                    Enter your personal details and start your journey with
                    Swipe today.
                  </p>
                  <Link to="/signup" className="btn button">
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* End of Sidebar */}
        </div>{" "}
        {/* Layout */}
      </main>
    )
  }
}
const mapStateToProps = state => {
  return {
    id: state,
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeId: id => {
      dispatch({
        type: "CHANGE_ID",
        id: id,
      })
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
