import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import WeightInput from './WeightInput';
import WeightInd from './WeightInd';
import map from 'lodash/map';
import { registerNewWeight, getWeights, removeWeight } from '../../../actions/weightActions';
require('../workout/styles.css');

class Weight extends React.Component{
	constructor(props){
		super(props);
		this.state={
			weights: [],
			text :'',
			showBin : false,
		}
		this.getInitalWeights();
		this.onSubmit=this.onSubmit.bind(this);
		this.newWeightAdded = this.newWeightAdded.bind(this);
		this.removeWeight = this.removeWeight.bind(this);
	} 
	onSubmit(e){
		e.preventDefault();
		var current = this.state.showBin;
		current = !current;
		this.setState({
			showBin : current,
		})
	}
	
	getInitalWeights(){
		this.props.getWeights().then(
			(response)=>{
				this.setState({weights:response.data.weights, text: response.data.text})

			},
			(response)=>{}
		);
	}

	removeWeight(index){

		var weights = this.state.weights;
		var len = weights.length;
		if (index > -1) {
    		weights.splice(index, 1);
		}
		var text = '';
		if(weights.length == 0){
			text = 'Keep track of your weight!';
		}
		this.setState({
			weights: weights,
			text:text,
		})
		this.props.removeWeight((len-index-1));

	}

	newWeightAdded(weight){
		var weights = this.state.weights;
		weights.push(weight);
		this.setState({
			weights: weights,
			text: '',
		})
		this.props.registerNewWeight(weight);
		//store this newly added weight in database

	}
	render(){
		const weightList = this.state.weights;
		const remove = this.removeWeight;
		weightList.reverse();

		const weightsDisplay =(
			weightList.map(function(weight,i){
 					return <WeightInd removeWeight={remove} weight={weight} index={i} key={i} />;
 				})
		);
		const findRecordStyle = {
 			marginTop: '150px'
 		}

 		const noRecords = (
 			<div style= {findRecordStyle}>
	 			<center>
	 				{this.state.text}
	 			</center>
 			</div>
 		);

		return(
			<div>
				<center>
					<h1>Weight Records</h1>
						<WeightInput newWeightAdded={this.newWeightAdded} />
						{weightsDisplay}
						{noRecords}

				</center>
			</div>
		);
	}
}

Weight.propTypes = {
	registerNewWeight: React.PropTypes.func.isRequired,
	getWeights:React.PropTypes.func.isRequired,
	removeWeight:React.PropTypes.func.isRequired,
}
export default connect(null, { registerNewWeight, getWeights, removeWeight })(Weight);