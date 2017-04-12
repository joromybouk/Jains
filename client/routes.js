import React from 'react';
import { Route , IndexRoute } from 'react-router';

import App from './components/App';
import LoginPage from './components/signin/LoginPage';
import RegisterPage from './components/register/RegisterPage';
import MainPage from './components/authpages/MainPage';
import WorkOut from './components/authpages/workout/WorkOut';
import WorkoutPage from './components/authpages/workout/exercisepage/WorkoutPage';
import Main from './components/authpages/records/saved/Main';
import Weight from './components/authpages/weight/Weight';
function requireAuth(nextState, replace){
	if (!localStorage.jwtToken) {
		replace({
      	pathname: '/login'
    })
  	}
}

export default(
	<Route path="/" component={App} >
		<IndexRoute component={MainPage} onEnter={requireAuth}/>
		<Route path = "login" component = {LoginPage} />
		<Route path = "register" component = {RegisterPage} />
		<Route path = "mainpage" component = {MainPage} onEnter={requireAuth}/>
		<Route path = "workout" component = {WorkOut} onEnter={requireAuth}/>
		<Route path = "exercises" component = {WorkoutPage} onEnter={requireAuth}/>
		<Route path = "workoutprev" component = {Main} onEnter={requireAuth}/>
		<Route path = "weight" component = {Weight} onEnter={requireAuth}/>
	</Route>
)