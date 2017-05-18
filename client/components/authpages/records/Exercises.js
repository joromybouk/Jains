import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Set from './Set';

require('../../css/titles.css');

class Exercises extends React.Component{
	constructor(){
		super();
		this.state= {
			exercises: [],
			current:'',
		};
	}
	render(){
		const name = this.props.exercises.name;
		const sets = this.props.exercises.sets;

		const exercise_sets = (
			sets.map(function(set,i){
 					return <Set set={set} key={i} index={i}/>;
 				})
		);

		return(
			<div>
				<div className ="exercisetitle">
					<h3> { name }: </h3>
				</div>
					{exercise_sets}
				
			</div>
			)
		}
	}

export default Exercises;


