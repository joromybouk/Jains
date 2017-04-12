import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
require('../workout/styles.css');

class WeightInd extends React.Component{
	constructor(props){
		super(props);
	} 

	render(){
		const weight = this.props.weight.weight;
		const unit = this.props.weight.unit;
		const time = this.props.weight.time;
		const date = this.props.weight.date;
		return(
			<div>
				<p>{weight}{unit}{time}{date}</p>
			</div>
		);
	}
}


export default WeightInd;