import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt from 'jsonwebtoken';
import { SET_CURRENT_USER } from './types'
// import {jwt_decode} from 'jwt_decode';

export function setCurrentUser(user){
	return {
		type: SET_CURRENT_USER,
		user
	}
}

export function login(userData){
	return dispatch => {
		return axios.post('./api/auth', userData).then(res=>{
			const token = res.data.token;
			localStorage.setItem('jwtToken',token);
			setAuthToken(token);
			dispatch(setCurrentUser(jwt.decode(token)));
			// var decoded = jwt_decode(token);
			// console.log(decoded);
		});
	}
}