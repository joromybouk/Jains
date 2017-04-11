import axios from 'axios';
import { login } from './authAction';

export function userRegisterRequest(userData){
	return dispatch => {
		return axios.post('./api/users', userData);
	}
}