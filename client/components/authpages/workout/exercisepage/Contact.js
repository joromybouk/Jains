import React from 'react';
import ReactDOM from 'react-dom';


class Contact extends React.Component{
	constructor(props){
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
	}
	onSubmit(e){
		this.props.selectExercise(this.props.contact.name);
	}

	render(){
		const style = {
			backgroundColor: '#6aa7e7',
			borderStyle: 'solid',
		};
		

		return(
			<li onClick={this.onSubmit} style = {style}>
			{this.props.contact.name} {this.props.contact.phone}
			</li>
			)
		}
	}

	export default Contact;

