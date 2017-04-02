import React from 'react';
import { Route , IndexRoute } from 'react-router';

import App from './components/App';
import LoginPage from './components/signin/LoginPage';
import RegisterPage from './components/register/RegisterPage';
export default(
	<Route path="/" component={App} >
		<IndexRoute component={LoginPage}/>
		<Route path = "register" component = {RegisterPage} />
	</Route>
)