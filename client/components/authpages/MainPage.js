import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import { registerNewWorkout } from '../../actions/workoutActions';

class MainPage extends React.Component{
	constructor(props){
    	super(props);
      	this.onSubmit = this.onSubmit.bind(this);
	 }

	onSubmit(e){
		e.preventDefault();
		browserHistory.push("/workout");
		this.props.registerNewWorkout();

	}
 	render(){
 		return(
 	<div>
		<div style={{display: 'inline-block'}}>
 				<button onClick = {this.onSubmit} >+</button>
		</div>

		<div style={{display: 'inline-block'}}>
				<p> Add a workout </p>
 		</div>
 	</div>
 		)
 	}
 }

MainPage.propTypes = {
	registerNewWorkout: React.PropTypes.func.isRequired
}

export default connect(null, { registerNewWorkout })(MainPage);
