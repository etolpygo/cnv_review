import React from 'react';

export default class LocationInput extends React.Component {

	constructor(props) {
	    super(props);
	    this.handleKeyPress = this.handleKeyPress.bind(this);
	  }

	handleKeyPress(e) {
	    if (e.key === 'Enter') {
	      this.props.updateLocationFilter(e.target.value);
	    }
	}

	render() {
		return(
			<input type="text" className="col-xs-10" placeholder="chr1" onKeyPress={this.handleKeyPress} />
		);
	}

}