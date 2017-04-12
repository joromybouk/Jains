import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import Exercises from './Exercises';
import { connect } from 'react-redux';

class MuscleInd extends React.Component{
	constructor(){
		super();
		this.state= {
			exercises: [],
			current:'',
		};
	}
	render(){
		const name = this.props.muscle.name;
		const exercises = this.props.muscle.exercises;
		
		const style = {
		   borderBottomStyle: 'solid',
		}
		const hideStyle = {
			display: 'none',
		}

		const exerciseDisp = (
				exercises.map(function(exercises,i){
 				return <Exercises exercises={exercises} key={i} />;
 			})
		)

	
		return(
			<div>
				<h1> { name } </h1>
				{exerciseDisp}
			</div>
			)
		}
	}

export default MuscleInd;


