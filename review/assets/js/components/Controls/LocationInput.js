import React from 'react';

export default class LocationInput extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = { 
	    	vizLocation: '', 
	    	placeholder: 'chr1'
		};
	    this.handleFocus = this.handleFocus.bind(this);
	    this.handleBlur = this.handleBlur.bind(this);
	    this.handleChange = this.handleChange.bind(this);
	    this.handleKeyPress = this.handleKeyPress.bind(this);
	}


	shouldComponentUpdate(nextProps, nextState) {
	    const { vizLocation, placeholder } = this.state;
	    const changedLocation = vizLocation !== nextState.vizLocation;
	    const changedPlaceholder = placeholder !== nextState.placeholder;
	    return changedLocation || changedPlaceholder;
	}


	handleFocus(e) {
		this.setState({ placeholder: '' });
	}

	handleBlur(e) {
		this.setState({ placeholder: 'chr1' });
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
				   className="col-sm-12" 
				   placeholder={this.state.placeholder}
				   onFocus={this.handleFocus} 
				   onBlur={this.handleBlur} 
				/>
		);
	}

}