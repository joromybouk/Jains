import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import map from 'lodash/map';
import classnames from 'classnames';
import TextField from '../generic/TextField'
import validateInput from '../../../server/shared/validation/validatePassChange';
import { changePass } from '../../actions/authAction';

class SettingsMain extends React.Component{
	constructor(props){
		super(props);
    	this.state ={
      		password : '',
      		newpassword : '',
      		confirmnewpassword:'',
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
		 	this.props.changePass(this.state).then(
		 		() => {
		 			console.log("Password succesfuly changed");
		 		},
		 		({response})=>{this.setState({errors:response.data, isLoading: false})}
		 	);
	 	}
	}
	render(){
		const { errors } = this.state;
		return(
			<div>
				<center>
					<h1>Account Settings</h1>
				</center>
				<form onSubmit = {this.onSubmit}>

				<TextField 
				error={errors.password}
				label="Password"
				onChange={this.onChange}
				value={this.state.password}
				field="password"
				type="password"
				/>
				<TextField 
				error={errors.newpassword}
				label="New Password"
				onChange={this.onChange}
				value={this.state.newpassword}
				field="newpassword"
				type="password"
				/>
				<TextField 
				error={errors.confirmnewpassword}
				label="Confirm New Password"
				onChange={this.onChange}
				value={this.state.confirmnewpassword}
				field="confirmnewpassword"
				type="password"
				/>
				
				<div className="form-group">
				<button
					disabled={this.state.isLoading}
					className = "btn btn-primary btn-lg">
					Change
				</button>
				</div>
				
			</form>
			</div>
		);
	}
}
SettingsMain.propTypes = {
	changePass: React.PropTypes.func.isRequired
}

export default connect(null, { changePass })(SettingsMain);
