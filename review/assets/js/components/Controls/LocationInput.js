import React from 'react';

export default class LocationInput extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = { vizLocation: '' };

	    this.handleChange = this.handleChange.bind(this);
	    this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	handleChange(e) {
	    this.setState({ vizLocation: e.target.value });
	}

	handleKeyPress(e) {
	    if (e.key === 'Enter') {
	      this.props.updateLocationFilter(e.target.value);
	    }
	}

	render() {
		return(
			<input type="text" 
				   value={this.state.vizLocation} 
				   onChange={this.handleChange} 
				   onKeyPress={this.handleKeyPress}
				   className="col-xs-10" 
				   placeholder="chr1" 
				/>
		);
	}

}