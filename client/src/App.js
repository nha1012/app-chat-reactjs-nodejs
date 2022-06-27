import React, { Component, useEffect } from "react"
import Home from "./component/Home"
import SignIn from "./component/SignIn"
import SignUp from "./component/SignUp"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import Chat from "./component/Chat"
import ChatLeft from "./component/slidebar/ChatLeft"

import usePushNotifications from "./usePushNotifications"

const App = () => {
  const {
    userConsent,
    pushNotificationSupported,
    userSubscription,
    onClickAskUserPermission,
    onClickSusbribeToPushNotification,
    onClickSendSubscriptionToPushServer,
    pushServerSubscriptionId,
    onClickSendNotification,
    error,
    loading,
  } = usePushNotifications()
  useEffect(() => {
    onClickAskUserPermission()
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home/chat-left/123"></Redirect>
        </Route>
        <Route path="/home" component={Home}></Route>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/home/*/:id" component={Chat} />
        <Route path="/home/chat-left" component={ChatLeft} />
      </Switch>
    </Router>
  )
}
export default App
