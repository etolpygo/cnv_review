import React from 'react';
import PropTypes from 'prop-types';

import LocationInput from './LocationInput';
import ErrorDisplay from './ErrorDisplay';

export default class Controls extends React.Component {

	constructor(props) {
	  	super(props);
	  	this.state = {
	  		input: '',
			chromosome: '',
			chromosomeLoc: '',
			isValidInput: true,
		}
		this.updateLocationFilter = this.updateLocationFilter.bind(this)
	}

	shouldComponentUpdate(nextProps, nextState) {
	    const { input, isValidInput  } = this.state;

	    const changedInput = input !== nextState.input;
	    const changedIsValidInput = isValidInput !== nextState.isValidInput;

	    return changedInput || changedIsValidInput;
	}

	componentDidUpdate() {
		if (this.state.isValidInput) {
	        this.sendUpdateToReview();
	    }
    }

    sendUpdateToReview() {
    	const { chromosome, chromosomeLoc  } = this.state;
    	this.props.updateDataFilter(chromosome, chromosomeLoc);
    }

    validateChromosome(chromosome) {
    	let allowedChromosomeValues = this.props.chromosomeLookup.labels;
    	return ((chromosome === '') || (allowedChromosomeValues.indexOf(chromosome) >= 0));
    }

    validateChromosomeLoc(chromosome, chromosomeLoc) {
    	// valid if empty
    	if (chromosomeLoc === '') { return true; }

    	let chromosomeLookup = this.props.chromosomeLookup;
    	let ind = parseInt(_.invert(chromosomeLookup.labels)[chromosome]);
    	let length = chromosomeLookup.lengths[ind];

    	// split by '-'
    	var res = chromosomeLoc.split("-");
    	// have two inputs
    	if (res.length !== 2) { console.log('not two elements'); return false; }

    	let start = parseInt(res[0]);
    	let end = parseInt(res[1]);

		// both inputs are numeric
    	if (!Number.isInteger(start) || (!Number.isInteger(end))) {
    		console.log('numbers not integers');
			return false;
		} 

		// second input larger than first
		if ((end <= start) || (start < 0)) { console.log('end is less than start or start is less than zero'); return false; }

    	// both inputs lower than given chromosome length
    	if (end > length) { console.log('end is more than length'); return false; }

    	return true;
    }


    updateLocationFilter(input) {
    	var res = input.split(":");
    	var chromosome = res[0];
    	var chromosomeLoc = res[1] ? res[1].replace(/,/g , '') : '';
        this.setState({
        	input: input,
        	chromosome: chromosome,
        	chromosomeLoc: chromosomeLoc,
        	isValidInput: (this.validateChromosome(chromosome) && this.validateChromosomeLoc(chromosome, chromosomeLoc))
        });
    }

	render() {
		return(
			<div>
				Go to:<br />
				<LocationInput updateLocationFilter={this.updateLocationFilter} />
				<br />
				<ErrorDisplay isValidInput={this.state.isValidInput}
							  enteredValue={this.state.input}
				/>
			</div>
		);
	}

}

Controls.propTypes = {
  updateDataFilter: PropTypes.func.isRequired,
  chromosomeLookup: PropTypes.object.isRequired
};