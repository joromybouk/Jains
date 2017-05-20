import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';
import WeightInput from './WeightInput';
import WeightInd from './WeightInd';
import map from 'lodash/map';
import { registerNewWeight, getWeights, removeWeight } from '../../../actions/weightActions';
require('../../css/styles.css');
require('../../css/records.css');
require('../../css/titles.css');
require('../../css/images.css');
require('../../css/buttons.css');
import Scale from '../../../images/scale.svg';

var LineChart = require('react-d3-basic').LineChart;

var randomData = [
  ];

class Weight extends React.Component{
	constructor(props){
		super(props);
		this.state={
			weights: [],
			text :'',
			showBin : false,
			showGraph : false,
		}
		this.getInitalWeights();
		this.onSubmit=this.onSubmit.bind(this);
		this.newWeightAdded = this.newWeightAdded.bind(this);
		this.removeWeight = this.removeWeight.bind(this);
		this.clickButton = this.clickButton.bind(this);
	} 
	onSubmit(e){
		e.preventDefault();
		var current = this.state.showBin;
		current = !current;
		this.setState({
			showBin : current,
		})
	}

	clickButton(e){
		e.preventDefault();
		var current = this.state.showGraph;
		current = !current;
		this.setState({
			showGraph : current,
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
			text = 'Start tracking your weight';
		}
		this.setState({
			weights: weights,
			text:text,
		})
		this.props.removeWeight((len-index-1));

	}

	newWeightAdded(weight){
		var weights = this.state.weights;
		weights.unshift(weight);
		this.setState({
			weights: weights,
			text: '',
		})
		this.props.registerNewWeight(weight);
		//store this newly added weight in database

	}

	pushweight(weight,index,data){
		data.push({
			"Weight":weight,
			"index" : index
		})
		return data;
	}



	render(){

		
		var showButton = false;

		randomData =[];

		
		var latestRecorded = 0;

		var actualLen = 0;

		if(this.state.weights.length > 0){
			
			var weightIndex = -1;
			var index = 6;

			var today = new Date();
			var date;
			var dd = today.getDate();
			var weightDate;

			while(index != 0){
				weightIndex += 1;

				if(weightIndex >= this.state.weights.length ){
					while(index != 0){
						randomData=this.pushweight(latestRecorded,index,randomData);
						index --;
					}
					break;
				}
				weightDate = this.state.weights[weightIndex].date.substring(0,2);
				if( (dd-6+index)%31 == weightDate){
					actualLen++;
					latestRecorded = this.state.weights[weightIndex].weight;
					randomData=this.pushweight(this.state.weights[weightIndex].weight,index,randomData);
					while(dd-6+index == weightDate){
						weightIndex += 1;

						if(weightIndex >= this.state.weights.length ){
							break;
						}
						weightDate = this.state.weights[weightIndex].date.substring(0,2);

					}
					weightIndex -= 1;
				}
				else{
					randomData=this.pushweight(latestRecorded,index,randomData);
				}
				index -= 1;
			}
		}
		if(actualLen > 1){
			showButton = true;
		}
	

		var showGraph = this.state.showGraph;

		var chartSeries = [
	      {
	      	name: 'Weight recorded this week',
	        field: 'Weight',
	        color: '#000080'
	      }
	    ],
	    width = 350,
		height = 200,
	    // set your x range
	    xRange = [0, width],
	    // set your label name
	    xLabel = "Date",
	    xScale = 'time',
	    yRange = [height/2, 0],	
	    // set your label name
	    x = function(d) {	
	      return d.index;
	    },



	     yDomain = d3.extent(randomData, function(d) {return d.Weight;})

		const weightList = this.state.weights;
		const remove = this.removeWeight;

		const weightsDisplay =(
			weightList.map(function(weight,i){
 					return <WeightInd removeWeight={remove} weight={weight} index={i} key={i} />;
 				})
		);


 		const noRecords = (
 			<div className= "records">
	 			<center>
	 				{this.state.text}
	 			</center>
 			</div>
 		);

 		const graph = (
 		<center>
			<div className = "chart">
				<LineChart
			      width= {width}
			      height= {height}
			      data= {randomData}
			      chartSeries= {chartSeries}
			      x= {x}
			      xScale={xScale}
			      yRange = {yRange}
			      yDomain= {yDomain}
			    />
			 </div>
		 </center>
		);

		var buttonText = "This week";
		if(showGraph){
			buttonText = "Hide"
		}

		const graphButton = (
			
			<center>
			<div>
				<button className = "graphbutton" onClick = {this.clickButton} >{buttonText}</button>
				{showGraph ? graph : null}

			</div>
			</center>
		);

		const makegap = (
			<div className="gap">
			</div>
		)

		return(
			<div>
				

				<center>
				<div className ="titles">
					<h1>Weight Records</h1>
				</div>

						<WeightInput newWeightAdded={this.newWeightAdded} />
						
						{showButton ? graphButton : null}

						{showButton ? null : makegap}
						{weightsDisplay}

						{noRecords}
						<div className = "weightimgdiv">
							<Scale className= "weightimage" />
						</div>
						
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
