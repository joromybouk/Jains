import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authAction';
import jwtDecode from 'jwt-decode';
import routes from './routes';
import rootReducer from './rootReducer';
import App from './components/App';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);


if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

render(
	<Provider store = {store}>
	<Router history={browserHistory} routes={routes} />
	</Provider>, document.getElementById('app'));