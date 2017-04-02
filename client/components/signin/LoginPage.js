import React from 'react';
import LoginForm from './LoginForm'
import { connect } from 'react-redux';
import { userRegisterRequest } from '../../actions/registerActions';

class LoginPage extends React.Component{
	render(){
		const {userRegisterRequest } = this.props;
		return(
			<div className = "row">
				<div className = "col-md-4 col-md-offset-4">
					<LoginForm userRegisterRequest={LoginForm}/>
				</div>
			</div>
		);
	}
}
LoginPage.propTypes = {
	userRegisterRequest: React.PropTypes.func.isRequired
}

export default connect(null, { userRegisterRequest })(LoginPage);