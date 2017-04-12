import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import WorkoutPage from '../../workout/exercisepage/WorkoutPage';
import Exercise from './Exercise';
import { registerWorkoutInfo, deleteMusle } from '../../../../actions/workoutActions';
import { connect } from 'react-redux';
require('../../workout/styles.css');

class MuscleList extends React.Component{
	constructor(props){
		super(props);
		this.state= {
			name: '',
			exercises: this.setCurrentExercises(),
			visible: false,
			hideAll : false,
			current:'',
			showBin: false,
			
		};
		this.turnOff = this.turnOff.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.selectExercise = this.selectExercise.bind(this);	
		this.removeExercise = this.removeExercise.bind(this);	
		this.textClicked = this.textClicked.bind(this);	
		this.deleteEntry = this.deleteEntry.bind(this);	
	}
	setCurrentExercises(){
		var list = [];
		var exercises = this.props.muscleData.muscles[this.props.index];
		if(exercises){
			exercises = exercises.exercises;
			for(var i = 0 ; i < exercises.length; i ++ ){
				list.push(exercises[i].name);
			}
		}
		return list;
	}
	turnOff(e){
		e.preventDefault();
		this.setState({
			visible: false,
			hideAll: false,
		})
		this.props.optionOn();
	}
	
	onSubmit(e){
		e.preventDefault();
		this.setState({
			visible: true,
			hideAll : true,
		})
		this.props.optionOff();
	}
	selectExercise(exerciseName){
		var exercises = (this.state.exercises);
		if(!(exercises.indexOf(exerciseName) > -1)){

			exercises = exercises.concat([exerciseName]);
			this.setState({
				visible: false,
				hideAll: false,
				exercises: exercises
			})
			//Add exercise to database
			this.props.optionOn();
			this.props.registerWorkoutInfo(exerciseName,'exercises',this.props.muscle);
		}
		else{
			console.log("Exercise already exists");
		}
	}
	textClicked(e){
		e.preventDefault();
		var binState = this.state.showBin;
		binState = !binState;
		this.setState({
			showBin : binState,	
		})
	}
	deleteEntry(e){
		e.preventDefault();
		this.props.removeMuscle(this.props.index);
		this.props.deleteMusle(this.props.muscle);
	}

	removeExercise(index){

		var exercises = this.state.exercises;
		if (index > -1) {
    		exercises.splice(index, 1);
		}
		this.setState({
			exercises: exercises,
		})
	}

	render(){
		const style = {
		   borderBottomStyle: 'solid',
		}
		const hideStyle = {
			display: 'none',
		}

		const name = this.props.muscle;
		const vis = this.state.visible;
		const visInput = this.state.visible;
		const exercises = this.state.exercises;
		const showInputFunc = this.showInput; 
		const hideBool = this.state.hideAll;
		const removeExercise = this.removeExercise;
		const workoutData = this.props.muscleData;
		const muscleIndex = this.props.index;
		var styleToChoose; 

		const showBin = this.state.showBin;
		const bin = (<h1 onClick={this.deleteEntry}> &nbsp;&nbsp;&nbsp;&#128465;</h1>);

		if(hideBool){
			styleToChoose = hideStyle;
		}
		const exerciseDisp = (
 				exercises.map(function(exercises,i){
 					return <Exercise exercise={exercises} removeExercise={removeExercise} workoutData={workoutData} index={i} muscleIndex={muscleIndex} muscle={name} key={i} />;
 				})
		);
		const exercliseList = (
	      	<div className = "app">
	 			<a className="root" onClick={this.turnOff}>&times;</a>
	 			<WorkoutPage selectExercise={this.selectExercise} muscleName = {name}/>
	 		</div>
    	);
		const addEx = (
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
				<div style={styleToChoose}>
					<div className="root">
						<h1 onClick={this.textClicked}>{name}</h1>
					</div>
					<div className="root">
						{showBin ? bin : null}
					</div>
					{ exerciseDisp }
				</div>
				<div>
					{ vis ? exercliseList : addEx}
				</div>
			</div>
			)
		}
	}

MuscleList.propTypes = {
	registerWorkoutInfo: React.PropTypes.func.isRequired,
	deleteMusle: React.PropTypes.func.isRequired,
}
export default connect(null, { registerWorkoutInfo, deleteMusle})(MuscleList);


