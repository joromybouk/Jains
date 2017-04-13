import Validator from 'Validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data){
	let errors = {};



	if(Validator.isEmpty(data.password + "" )){
		errors.password = 'This field is required';
	}
	

	if(Validator.isEmpty(data.newpassword + "" )){
		errors.newpassword = 'This field is required';
	}
	if( (data.newpassword + "" ).length < 6 ){
		errors.newpassword = 'Password must be at least 6 characters';
	}
	
	if(!Validator.equals(data.newpassword+ "" ,data.confirmnewpassword+ "" )){
		errors.confirmnewpassword = "Passwords must match";
	}
	if(Validator.isEmpty(data.confirmnewpassword + "" )){
		errors.confirmnewpassword = 'This field is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}

