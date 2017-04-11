import React from 'react';
import map from 'lodash/map';
import classnames from 'classnames';
import validateInput from '../../../server/shared/validation/validateSignup';	
import TextField from '../generic/TextField';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';


class SignupForm extends React.Component{
	constructor(props){
    	super(props);
    	this.state ={
      		email : '',
      		password : '',
      		passwordConfirmation: '',
      		errors: {},
      		isLoading : false
      	}
      	this.onChange = this.onChange.bind(this);
      	this.onSubmit = this.onSubmit.bind(this);
	 }
	 onChange(e){
	 	//when a text field is modified, update the state
	 	this.setState({
	 		[e.target.name] : [e.target.value]
	 	})
	 }
	 isValid(){
	 	const {errors, isValid } = validateInput(this.state);
	 	if(!isValid){
	 		this.setState({errors});
	 	}
	 	return isValid;
	 }
	 onSubmit(e){
	 	e.preventDefault();
	 	if(this.isValid()){
		 	//reset error statuses when submission is made again
		 	this.setState({errors : {}, isLoading: true});
		 	//check for any possible errors with current input
		 	//if there are errors, they will be displayed on client via render
		 	//if there isn't, the client will be redirected to main page
		 	this.props.userRegisterRequest(this.state).then(
		 		() => {
		 			browserHistory.push('/');
		 		},
		 		({response})=>{this.setState({errors:response.data, isLoading: false})}
		 	);
	 	}
	}
	render(){
		const { errors } = this.state;
		return(
			<form onSubmit = {this.onSubmit}>
				<h1>Join the Jainers!</h1>
				
				<TextField 
				error={errors.email}
				label="Email"
				onChange={this.onChange}
				value={this.state.email}
				field="email"
				/>
				<TextField 
				error={errors.password}
				label="Password"
				onChange={this.onChange}
				value={this.state.password}
				field="password"
				type="password"
				/>
				<TextField 
				error={errors.passwordConfirmation}
				label="Password Confirmation"
				onChange={this.onChange}
				value={this.state.passwordConfirmation}
				field="passwordConfirmation"
				type="password"
				/>

				
				<div className="form-group">
				<button
					disabled={this.state.isLoading}
					className = "btn btn-primary btn-lg">
					Register
				</button>
				</div>
			</form>
		);
	}
}
SignupForm.propTypes = {
	userRegisterRequest: React.PropTypes.func.isRequired
}
export default SignupForm;