import * as redux from 'redux';
import thunk from 'redux-thunk';

import {authReducer} from 'app/reducers/reducers.jsx';

export var configure = (initialState = {auth : {
  token : undefined,
  user : undefined,
  isLoggedIn : false
}}) => {
  var reducer = redux.combineReducers({
    auth : authReducer
  });

  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
}
