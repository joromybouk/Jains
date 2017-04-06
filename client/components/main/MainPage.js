import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class MainPage extends React.Component{
	render(){
		
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
MainPage.propTypes={
  auth: React.PropTypes.object.isRequired
}

function mapStateToProps(state){
  return{
    auth: state.auth
  };
}
export default connect(mapStateToProps)(MainPage);