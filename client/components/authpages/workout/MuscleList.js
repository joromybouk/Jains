import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import WorkoutPage from './exercisepage/WorkoutPage';
import ExerciseInput from './ExerciseInput';
import Exercise from './Exercise';
import { registerWorkoutInfo } from '../../../actions/workoutActions';
import { connect } from 'react-redux';
require('./styles.css');

class MuscleList extends React.Component{
	constructor(){
		super();
		this.state= {
			name: '',
			exercises: [],
			visible: false,
			newInput: false,
			current:'',
			
		};
		this.turnOff = this.turnOff.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.selectExercise = this.selectExercise.bind(this);
		this.showInput = this.showInput.bind(this);
		this.hideInput = this.hideInput.bind(this);
	}
	turnOff(e){
		e.preventDefault();
		this.setState({
			visible: false
		})
	}
	showInput(exerciseName){
		this.setState({
			newInput: true,
			current: exerciseName
		})
	}
	hideInput(){
		this.setState({
			newInput: false
		})
		
	}
	onSubmit(e){
		e.preventDefault();
		this.setState({
			visible: true
		})
	}
	
	selectExercise(exerciseName){
		var exercises = (this.state.exercises);
		if(!(exercises.indexOf(exerciseName) > -1)){
			exercises.push(exerciseName);
			this.setState({
				visible: false,
				exercises: exercises
			})
			//Add exercise to database
			
			this.props.registerWorkoutInfo(exerciseName,'exercises',this.props.muscle);
		}
		else{
			console.log("Exercise already exists");
		}
	}

	render(){
		const style = {
		   borderBottomStyle: 'solid',
		}

		const name = this.props.muscle;
		const vis = this.state.visible;
		const visInput = this.state.newInput;
		const exercises = this.state.exercises;
		const showInputFunc = this.showInput; 

		const none = (
			<div> </div>
		);
		const exercise_input = (
			<div>
				<ExerciseInput parent={this.state.current} grand={this.props.muscle} hideInput={this.hideInput}/>
			</div>
			
		);
		const exerciseDisp = (
 				exercises.map(function(exercises,i){
 					return <Exercise exercise={exercises} showInput={showInputFunc} key={i} />;
 				})
		);
		const exercliseList = (
	      	<div className = "app">
	 			<a className="root" onClick={this.turnOff}>&times;</a>
	 			<WorkoutPage selectExercise={this.selectExercise} muscleName = {name}/>
	 		</div>
    	);
		const empty = (
			<div>
				<div className= "root">
	 				<button onClick = {this.onSubmit} >+</button>
				</div>
				<div className= "root">
					<p>Add an exercise</p>
	 			</div>
			</div>
		);
		return(
			<div style={style}>
				<h1>{name}</h1>	
				{ exerciseDisp }
				{ visInput ? exercise_input : none}
				{ vis ? exercliseList : empty}
			</div>
			)
		}
	}

MuscleList.propTypes = {
	registerWorkoutInfo: React.PropTypes.func.isRequired
}
export default connect(null, { registerWorkoutInfo })(MuscleList);


