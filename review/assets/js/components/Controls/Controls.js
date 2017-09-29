import React from 'react';
import PropTypes from 'prop-types';

import LocationInput from './LocationInput';


export default class Controls extends React.Component {

	constructor(props) {
	  	super(props);
	  	this.state = {
			absLoc: '*',
			chromosome: '*',
			chromosomeLoc: '*'
		}
		this.updateLocationFilter = this.updateLocationFilter.bind(this)
	}

	componentDidUpdate() {
        this.sendUpdateToReview();
    }

    sendUpdateToReview() {
    	const chromosome = this.state.chromosome;
    	let chromosomeFilter;
    	if (chromosome !== '*') {
	    	chromosomeFilter = (d) => d.chromosome === chromosome;
	    }
	    else {
	    	chromosomeFilter = () => true;
	    }
    	this.props.updateDataFilter(chromosomeFilter, { chromosome: chromosome }
    	);
    }

    updateLocationFilter(chromosome) {
        this.setState({chromosome: chromosome});
    }

	render() {
		return(
			<div>
				Go to:<br />
				<LocationInput updateLocationFilter={this.updateLocationFilter} 
							   allowedChromosomeValues={this.props.allowedChromosomeValues}
				/>
			</div>
		);
	}

}

Controls.propTypes = {
  updateDataFilter: PropTypes.func.isRequired,
  allowedChromosomeValues: PropTypes.array.isRequired
};