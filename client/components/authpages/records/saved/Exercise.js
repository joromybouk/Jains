import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { deleteSet, deleteExercise } from '../../../../actions/workoutActions';
import { connect } from 'react-redux';
import ExerciseInput from '../../workout/ExerciseInput';
import Set from '../../workout/Set';

require('../../../css/styles.css');
require('../../../css/exercise.css');


class Exercise extends React.Component{
	constructor(props){
		super(props);
		this.state= {
			sets : this.setCurrentSet(),
			newInput: false,
			showBin: false,
		};
		this.onSubmit = this.onSubmit.bind(this);
		this.hideInput = this.hideInput.bind(this);
		this.removeSet = this.removeSet.bind(this);
		this.textClicked = this.textClicked.bind(this);
		this.deleteEntry = this.deleteEntry.bind(this);
	}

	setCurrentSet(){
		var list = [];
		var data = this.props.workoutData.muscles[this.props.muscleIndex];
	
		if(data && data.exercises && data.exercises[this.props.index]){
			var sets = data.exercises[this.props.index].sets;
			for(var i = 0 ; i < sets.length; i ++ ){
				list.push(sets[i]);
			}
		}
		return list;
	}

	onSubmit(e){
		e.preventDefault();
		this.setState({
			newInput: true
		})
	}
	hideInput(set){
		var stateSets = this.state.sets;
		stateSets.push(set);
		this.setState({
			newInput: false,
			sets: stateSets,
		})
	}
	removeSet(index){
		var sets = this.state.sets;
		if (index > -1) {
    		sets.splice(index, 1);
		}
		this.setState({
			sets: sets,
		})
		
		this.props.deleteSet(sets,this.props.muscle,this.props.exercise);
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
		this.props.removeExercise(this.props.index);
		this.props.deleteExercise(this.props.exercise,this.props.muscle);

	}
	render(){
		const name = this.props.exercise;
		const newInput = this.state.newInput;
		const grandPar = this.props.muscle;
		const sets = this.state.sets;
		const removeSet = this.removeSet;
		console.log("Sets = " + sets);
		const showBin = this.state.showBin;
		const bin = (<p onClick={this.deleteEntry}> &nbsp;&nbsp;&nbsp;&#128465;</p>);

		const exerciseTitle = (
		<div>
			<div className = "root">
				<p onClick={this.textClicked}>{name}:</p>
			</div>
			<div className = "root">
				<button 
				className = "addExerciseButton"
				onClick = {this.onSubmit}
				>+</button>
			</div>
			<div className="root">
				{showBin ? bin : null}
			</div>

		</div>
		);

		const exercise_input = (
			<div>
				<ExerciseInput parent={name} grand={grandPar} hideInput={this.hideInput}/>
			</div>
		);

		const exercise_sets = (
			sets.map(function(set,i){
 					return <Set set={set} removeSet={removeSet} index={i}  key={i} />;
 				})
		);

		return(	<div>
					{exerciseTitle}
					{exercise_sets}
					{ newInput ? exercise_input : null}
				</div>
			)
		}
	}

Exercise.propTypes = {
	deleteSet: React.PropTypes.func.isRequired,
	deleteExercise: React.PropTypes.func.isRequired,
}
export default connect(null, { deleteSet , deleteExercise })(Exercise);


