var validator = require('validator');
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data){
	let errors = {};



	if(validator.isEmpty(data.password + "" )){
		errors.password = 'This field is required';
	}
	

	if(validator.isEmpty(data.newpassword + "" )){
		errors.newpassword = 'This field is required';
	}
	if( (data.newpassword + "" ).length < 6 ){
		errors.newpassword = 'Password must be at least 6 characters';
	}
	
	if(!validator.equals(data.newpassword+ "" ,data.confirmnewpassword+ "" )){
		errors.confirmnewpassword = "Passwords must match";
	}
	if(validator.isEmpty(data.confirmnewpassword + "" )){
		errors.confirmnewpassword = 'This field is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}

