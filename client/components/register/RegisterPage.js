import React from 'react';
import SignupForm from './SignupForm'
import { connect } from 'react-redux';
import { userRegisterRequest } from '../../actions/registerActions';

class RegisterPage extends React.Component{
	render(){
		const {userRegisterRequest } = this.props;


		return(
			<div className = "row">
				<div className = "col-md-4 col-md-offset-4">
					<SignupForm userRegisterRequest={userRegisterRequest}/>
				</div>
			</div>
		);
	}
}

RegisterPage.propTypes = {
	userRegisterRequest: React.PropTypes.func.isRequired
}

export default connect(null, { userRegisterRequest })(RegisterPage);