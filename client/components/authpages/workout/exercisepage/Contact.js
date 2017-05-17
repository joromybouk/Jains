import React from 'react';
import ReactDOM from 'react-dom';
require('../../../css/exercise.css');

class Contact extends React.Component{
	constructor(props){
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
	}
	onSubmit(e){
		this.props.selectExercise(this.props.contact.name);
	}

	render(){
		

		return(
			<li onClick={this.onSubmit} className = "exerciseList">
				<p>
					{this.props.contact.name} {this.props.contact.phone}
				</p>
			</li>
			)
		}
	}

	export default Contact;

