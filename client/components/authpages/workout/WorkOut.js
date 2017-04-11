import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import MuscleList from './MuscleList';
import includes from 'lodash';
import { registerWorkoutInfo } from '../../../actions/workoutActions';

require('./styles.css');
// <MuscleList muscles={this.state.muscles} />
class Workout extends React.Component{
	constructor(props){
    	super(props);
    	this.state ={
    		muscles : [],
      		visible : false,
      	}
      	this.turnOff = this.turnOff.bind(this);
      	this.onSubmit = this.onSubmit.bind(this);
	 }

	turnOff(e){
		e.preventDefault();
		this.setState({
			visible: false
		})
	}

	addMuscle(musclename){
		musclename = musclename.charAt(0).toUpperCase() + musclename.slice(1);
		var muscles = (this.state.muscles);
		if(!(muscles.indexOf(musclename) > -1)){
			muscles.push(musclename);
			this.setState({
				visible: false,
				muscles: muscles
			})
			//Add muscle to database
			this.props.registerWorkoutInfo(musclename,'muscles', 'none');
		}
		
	}

	onSubmit(e){
		e.preventDefault();
		this.setState({
			visible: true
		})
	}
 	render(){
 		const vis = this.state.visible;
 		const muscles = this.state.muscles;
 		const muscleList = (
	      	<div className = "app">
	 			
	 			<div className="root">
	 			<a className="root" onClick={this.turnOff}>&times;</a>
	 			<ul>
				    <li><a onClick={() => this.addMuscle("abdominals")}>abdominals</a></li>
				    <li><a onClick={() => this.addMuscle("chest")}>chest</a></li>
				    <li><a onClick={() => this.addMuscle("back")}>back</a></li>
				    <li><a onClick={() => this.addMuscle("biceps")}>biceps</a></li>
				 </ul>
				 </div>
	 		</div>
    	);
    	const empty = (
    		<div>
    			<div className= "root">
	 				<button onClick = {this.onSubmit} >+</button>
				</div>
				<div className= "root">
					<p>Add a muscle</p>
	 			</div>
    		</div>
    	);

 		return(
 			<div>
 			{
 				muscles.map(function(muscles,i){
 					return <MuscleList muscle={muscles} key={i} />;
 				})
 			}
 			{ vis ? muscleList : empty}
 		</div>
 		)
 	}
 }	
Workout.propTypes = {
	registerWorkoutInfo: React.PropTypes.func.isRequired
}
export default connect(null, { registerWorkoutInfo })(Workout);
