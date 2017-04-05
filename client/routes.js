import React from 'react';
import { Route , IndexRoute } from 'react-router';

import App from './components/App';
import LoginPage from './components/signin/LoginPage';
import RegisterPage from './components/register/RegisterPage';
import MainPage from './components/main/MainPage';
export default(
	<Route path="/" component={App} >
		<IndexRoute component={LoginPage}/>
		<Route path = "login" component = {LoginPage} />
		<Route path = "register" component = {RegisterPage} />
		<Route path = "mainpage" component = {MainPage} />
	</Route>
)