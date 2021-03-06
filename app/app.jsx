var React = require('react');
var ReactDOM = require('react-dom');
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Route, Router, hashHistory, IndexRoute} from 'react-router';
import {Provider} from 'react-redux';
var store = require('app/store/configureStore.jsx').configure();

import Main from 'app/components/Main.jsx';
import Login from 'app/components/Login.jsx';
import SignUp from 'app/components/SignUp.jsx';
import Home from 'app/components/Home.jsx';
import Products from 'app/components/Products.jsx';

injectTapEventPlugin();

var requireLogin = (nextState, replace, next) => {
  if(!store.getState().auth.isLoggedIn){
    const token = localStorage.getItem('token');
    if(!token){
      replace('/');
      next();
    }else if (token) {
      axios.get('/isvalidtoken', {
        headers: {
          "x-access-token": token
        }
      }).then((response) => {
        if(response.data.message === 'success'){
          next();
        }else{
          replace('/');
          next();
        }
      }).catch((err) => {
        replace('/');
        next();
      });
    }
  }else{
    next();
  }
};

var redirectIfLoggedIn = (nextState, replace, next) => {
  const token = localStorage.getItem('token');
  if (token) {
    axios.get('/isvalidtoken', {
      headers: {
        "x-access-token": token
      }
    }).then((response) => {
      if(response.data.message === 'success'){
        console.log(response.data);
        replace('/dashboard');
        next();
      }else{
        next();
      }
    }).catch((err) => {
      console.log(err);
      next();
    });
  }else{
    next();
  }
  // if (store.getState().auth.isLoggedIn){
  //   replace('/dashboard');
  // }
  // next();
};

function handleChange() {
  if(store.getState().auth.isLoggedIn){
    hashHistory.push('/dashboard');
  }else if (!store.getState().auth.isLoggedIn) {
    hashHistory.push('/');
  }
};
var unsubscribe = store.subscribe(handleChange);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={hashHistory}>
        <Route path="/">
          <Route path="dashboard" component={Main} onEnter={requireLogin}>
            <Route path="products" component={Products} onEnter={requireLogin}></Route>
            <IndexRoute component={Home}></IndexRoute>
          </Route>
          <Route path="signup" component={SignUp} onEnter={redirectIfLoggedIn}></Route>
          <IndexRoute component={Login} onEnter={redirectIfLoggedIn}></IndexRoute>
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
);
