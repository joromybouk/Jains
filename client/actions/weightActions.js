import axios from 'axios';
import jwtDecode from 'jwt-decode';

export function registerNewWeight(weightData){
	var email = (jwtDecode(localStorage.jwtToken).email);
	const toSend = {
		email: email,
		weightData: weightData,
	}
	return dispatch => {
		return axios.post('./api/addweight',toSend);
	}
}

export function getWeights(){
	var email = (jwtDecode(localStorage.jwtToken).email);
	const toSend = {
		email: email,
	}
	return dispatch => {
		return axios.post('./api/getweight',toSend);
	}
}

export function removeWeight(index){
	var email = (jwtDecode(localStorage.jwtToken).email);
	const toSend = {
		email: email,
		index: index,
	}
	return dispatch => {
		return axios.post('./api/removeweight',toSend);
	}
}

