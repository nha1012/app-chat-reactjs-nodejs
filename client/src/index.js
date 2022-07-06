import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import allReducer from './redux/reducers/index';
import {createStore} from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
  } from "react-router-dom"
const store = createStore(allReducer, composeWithDevTools());
ReactDOM.render(
    <Provider store={store} >
        <Router>
        <App />     
        </Router>
    </Provider>
    , document.getElementById('root'));

