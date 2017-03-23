import React from 'react';
import { Route , IndexRoute } from 'react-router';

import App from './components/App';
import Greetings from './components/Greetings';
import RegisterPage from './components/register/RegisterPage';
export default(
	<Route path="/" component={App} >
		<IndexRoute component={Greetings}/>
		<Route path = "register" component = {RegisterPage} />
	</Route>
)