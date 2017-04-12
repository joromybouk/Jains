import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';


class Set extends React.Component{

	render(){

		const rep = this.props.set.reps;
		const weight = this.props.set.weight;
		const unit = this.props.set.unit;

		return(	
				<p>{weight}{unit} x {rep}</p>
			)
		}
	}


export default Set;
