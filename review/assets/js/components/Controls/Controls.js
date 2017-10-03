import React from 'react';
import PropTypes from 'prop-types';

import LocationInput from './LocationInput';
import ErrorDisplay from './ErrorDisplay';

export default class Controls extends React.Component {

	constructor(props) {
	  	super(props);
	  	this.state = {
			chromosome: '',
			chromosomeLoc: '',
			isValidInput: true,
		}
		this.updateLocationFilter = this.updateLocationFilter.bind(this)
	}

	shouldComponentUpdate(nextProps, nextState) {
	    const { chromosome, chromosomeLoc, isValidInput  } = this.state;

	    const changedChromosome = chromosome !== nextState.chromosome;
	    const changedChromosomeLoc = chromosomeLoc !== nextState.chromosomeLoc;
	    const changedIsValidInput = isValidInput !== nextState.isValidInput;

	    return changedChromosome || changedChromosomeLoc || changedIsValidInput;
	}

	componentDidUpdate() {
		if (this.state.isValidInput) {
	        this.sendUpdateToReview();
	    }
    }

    sendUpdateToReview() {
    	const chromosome = this.state.chromosome;
    	this.props.updateDataFilter(chromosome);
    }

    validateChromosome(chromosome) {
    	let allowedChromosomeValues = this.props.allowedChromosomeValues;
    	return ((chromosome === '') || (allowedChromosomeValues.indexOf(chromosome) >= 0));
    }

    updateLocationFilter(chromosome) {
        this.setState({
        	chromosome: chromosome,
        	isValidInput: this.validateChromosome(chromosome)
        });
    }

	render() {
		return(
			<div>
				Go to:<br />
				<LocationInput updateLocationFilter={this.updateLocationFilter} />
				<br />
				<ErrorDisplay isValidInput={this.state.isValidInput}
							  enteredValue={this.state.chromosome}
				/>
			</div>
		);
	}

}

Controls.propTypes = {
  updateDataFilter: PropTypes.func.isRequired,
  allowedChromosomeValues: PropTypes.array.isRequired
};