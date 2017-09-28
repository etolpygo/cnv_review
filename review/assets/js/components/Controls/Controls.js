import React from 'react';

import LocationInput from './LocationInput';


export default class Controls extends React.Component {

	constructor(props) {
	  	super(props);
	  	this.state = {
			absLoc: '*',
			chromosome: '*',
			chromosomeLoc: '*'
		}
	}

	componentDidUpdate() {
        this.sendUpdateToReview();
    }

    sendUpdateToReview() {
    	this.props.updateDataFilter(
	    	{
	    		chromosome: this.state.chromosome	
	    	}
    	);
    }

    updateLocationFilter(chromosome) {
        this.setState({chromosome: chromosome});
    }

	render() {
		return(
			<div>
				Go to:<br />
				<LocationInput updateLocationFilter={this.updateLocationFilter.bind(this)} />
			</div>
		);
	}

}