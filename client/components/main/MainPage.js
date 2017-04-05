import React from 'react';
import { connect } from 'react-redux';
import { userRegisterRequest } from '../../actions/registerActions';

class MainPage extends React.Component{
	render(){
		//const {userRegisterRequest } = this.props;
		return(
			<div className = "row">
				<div className = "col-md-4 col-md-offset-4">
					<h1>
						BOB
					</h1>
				</div>
			</div>
		);
	}
}
// RegisterPage.propTypes = {
// 	userRegisterRequest: React.PropTypes.func.isRequired
// }
export default MainPage;
// export default connect(null, { userRegisterRequest })(RegisterPage);