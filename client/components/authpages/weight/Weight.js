import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import WeightInput from './WeightInput';
import WeightInd from './WeightInd';
import map from 'lodash/map';
require('../workout/styles.css');

class Weight extends React.Component{
	constructor(props){
		super(props);
		this.state={
			weights: [],
		}
		this.newWeightAdded = this.newWeightAdded.bind(this);
	} 

	newWeightAdded(weight){
		weights = this.state.weights;
		console.log(weights);
		weights.push(weight);
		this.setState({
			weights: weights,
		})
		//store this newly added weight in database
	}
	render(){
		console.log(this.state.weights);
		const weightList = this.state.weights;

		const weightsDisplay =(
			weightList.map(function(weight,i){
 					return <WeightInd weight={weight} index={i} key={i} />;
 				})
		);

		return(
			<div>
				<center>
					<h1>Weight Records</h1>
						<WeightInput newWeightAdded={this.newWeightAdded} />

				</center>
			</div>
		);
	}
}


export default Weight;