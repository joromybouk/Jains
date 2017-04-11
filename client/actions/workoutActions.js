import axios from 'axios';
import jwtDecode from 'jwt-decode';
	//SELECT email,date,info from workouts where email is 'test3@live.co.uk';
export function registerNewWorkout(){
	var email = (jwtDecode(localStorage.jwtToken).email);
	const toSend = {
		email: email
	}
	return dispatch => {
		return axios.post('./api/workouts',toSend);
	}
}
export function registerWorkoutInfo(name, api, parent){
	var email = (jwtDecode(localStorage.jwtToken).email);
	const toSend = {
		email: email,
		name: name,
		parent: parent,
	}
	return dispatch => {
		return axios.post('./api/'+ api ,toSend);
	}
}
export function registerSet(setState, grandParent, parent){
	var email = (jwtDecode(localStorage.jwtToken).email);
	const toSend = {
		email: email,
		reps: setState.reps,
		weight: setState.weight,
		unit: setState.unit,
		parent: parent,
		grandParent: grandParent,

	}
	return dispatch => {
		return axios.post('./api/set' ,toSend);
	}
}
