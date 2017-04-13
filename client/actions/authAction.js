import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt from 'jsonwebtoken';
import { SET_CURRENT_USER } from './types';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';

export function setCurrentUser(user){
	return {
		type: SET_CURRENT_USER,
		user
	}
}
export function logout(){
	return dispatch =>{
		localStorage.removeItem('jwtToken');
		setAuthToken(false);
		dispatch(setCurrentUser({}));
		browserHistory.push("/login");
	}
}
export function login(userData){
	return dispatch => {
		return axios.post('./api/auth', userData).then(res=>{
			const token = res.data.token;
			localStorage.setItem('jwtToken',token);
			setAuthToken(token);
			dispatch(setCurrentUser(jwt.decode(token)));
		});
	}
}

export function changePass(userData){
	var email = (jwtDecode(localStorage.jwtToken).email);
	const toSend = {
		email: email,
		user: userData,
	}
	return dispatch => {
		return axios.post('./api/changepass',toSend);
	}
}




