import React from 'react';
import map from 'lodash/map';
import classnames from 'classnames';
import validateInput from '../../../server/shared/validation/validateLogin';	
import TextField from '../generic/TextField';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

class LoginForm extends React.Component{
	constructor(props){
    	super(props);
    	this.state ={
      		email : '',
      		password : '',
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
		 	this.props.login(this.state).then(
		 		() => {
		 			browserHistory.push('/mainpage');
		 		},
		 		({response})=>{this.setState({errors:response.data, isLoading: false})}
		 	);
	 	}
	}
	render(){
		const { errors } = this.state;
		return(
			<form onSubmit = {this.onSubmit}>
				<h1>Log back in!</h1>
				
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
				
				<div className="form-group">
				<button
					disabled={this.state.isLoading}
					className = "btn btn-primary btn-lg">
					Log in
				</button>
				</div>
				
			</form>
		);
	}
}
LoginForm.propTypes = {
	login: React.PropTypes.func.isRequired
}
export default LoginForm;