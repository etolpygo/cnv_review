import React from 'react';
import PropTypes from 'prop-types';

export default function ErrorDisplay(props) {

	if (props.isValidInput) {
		return null;
    } else {
		let errorMessage = (
			<div className="errorMessage">
				Invalid input: {props.enteredValue}.
			</div>
		);

		return errorMessage;
	}
}

ErrorDisplay.propTypes = {
  isValidInput: PropTypes.bool.isRequired,
  enteredValue: PropTypes.string
};

