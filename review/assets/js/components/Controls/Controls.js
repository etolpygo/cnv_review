import React from 'react';

import LocationInput from './LocationInput';


export default class Controls extends React.Component {

	render() {
		return(
			<div>
				Go to:<br />
				<LocationInput />
			</div>
		);
	}

}