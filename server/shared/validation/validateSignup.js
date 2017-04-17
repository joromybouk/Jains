var validator = require('validator');
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data){
	let errors = {};

	if(!(validator.isEmail(data.email + ""))){
		errors.email = 'Invalid email';
	}
	if(validator.isEmpty(data.email + "")){
		errors.email = 'This field is required';
	}
	if( (data.password + "" ).length < 6 ){
		errors.password = 'Password must be at least 6 characters';
	}
	if(validator.isEmpty(data.password + "" )){
		errors.password = 'This field is required';
	}
	if(validator.isEmpty(data.passwordConfirmation + "" )){
		errors.passwordConfirmation = 'This field is required';
	}
	if(!validator.equals(data.password+ "" ,data.passwordConfirmation+ "" )){
		errors.passwordConfirmation = "Passwords must match";
	}
	if(validator.isEmpty(data.timezone + "" )){
		errors.timezone = 'This field is required';
	}
	

	return {
		errors,
		isValid: isEmpty(errors)
	}
}

