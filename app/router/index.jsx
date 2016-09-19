import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

var requireLogin = (nextState, replace, next) => {
  if (!firebase.auth().currentUser){
    replace('/');
  }
  next();
};

var redirectIfLoggedIn = (nextState, replace, next) => {
  if (firebase.auth().currentUser){
    replace('/todos');
  }
  next();
};

export default (
  <Router history={hashHistory}>
    <Route path="/" onEnter={redirectIfLoggedIn}>
      <Route path="todos" component={TodoApp} onEnter={requireLogin}></Route>
      <IndexRoute component={Login}></IndexRoute>
    </Route>
  </Router>
);
