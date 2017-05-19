import React from 'react';
import LoginForm from './LoginForm'
import { connect } from 'react-redux';
import { login } from '../../actions/authAction';
require ('../css/images.css');

var Logo = require('../../images/jainslogo.png');


class LoginPage extends React.Component{
	render(){
		const { login } = this.props;
		return(
			<div className = "row">
				<div className = "col-md-4 col-md-offset-4">

					<center>
						<div>
							<img src={Logo} className= "logosign" />
						</div>
					</center>
					
					<LoginForm login={login}/>
					

				</div>
			</div>
		);
	}
}
LoginPage.propTypes = {
	login: React.PropTypes.func.isRequired
}

export default connect(null, { login })(LoginPage);