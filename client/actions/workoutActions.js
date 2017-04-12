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
export function retrieveRecords(numRecords){
	var email = (jwtDecode(localStorage.jwtToken).email);
	const toSend = {
		email: email,
		num : numRecords,
	}
	return dispatch => {
		return axios.post('./api/records',toSend);
	}
}
export function deleteSet(set, grandParent, parent){
	var email = (jwtDecode(localStorage.jwtToken).email);
	const toSend = {
		set: set,
		email: email,
		parent: parent,
		grandParent: grandParent,
	}
	return dispatch => {
		return axios.post('./api/deleteset' ,toSend);
	}
}
export function deleteExercise(exercise,parent){
	var email = (jwtDecode(localStorage.jwtToken).email);
	const toSend = {
		email: email,
		exercise: exercise,
		muscle: parent,
	}
	return dispatch => {
		return axios.post('./api/deleteexercise' ,toSend);
	}
}
export function deleteMusle(muscle){
	var email = (jwtDecode(localStorage.jwtToken).email);
	const toSend = {
		email: email,
		muscle: muscle,
	}
	return dispatch => {
		return axios.post('./api/deletemuscle' ,toSend);
	}
}

