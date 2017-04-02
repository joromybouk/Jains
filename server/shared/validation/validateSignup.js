import Validator from 'Validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data){
	let errors = {};

	if(!(Validator.isEmail(data.email + ""))){
		errors.email = 'Invalid email';
	}
	if(Validator.isEmpty(data.email + "")){
		errors.email = 'This field is required';
	}
	if( (data.password + "" ).length < 6 ){
		errors.password = 'Password must be at least 6 characters';
	}
	if(Validator.isEmpty(data.password + "" )){
		errors.password = 'This field is required';
	}
	if(Validator.isEmpty(data.passwordConfirmation + "" )){
		errors.passwordConfirmation = 'This field is required';
	}
	if(!Validator.equals(data.password+ "" ,data.passwordConfirmation+ "" )){
		errors.passwordConfirmation = "Passwords must match";
	}
	if(Validator.isEmpty(data.timezone + "" )){
		errors.timezone = 'This field is required';
	}
	

	return {
		errors,
		isValid: isEmpty(errors)
	}
}

