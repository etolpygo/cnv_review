import React from 'react';
import Plot from './Plot';
import * as d3      from "d3";

import { loadData } from './DataHandling';

const styles = {
	width   : 1000,
	height  : 500,
	padding : 50,
};


export default class Chart extends React.Component {
	
  constructor(props) {
		super(props);
		this.state = {
      zoomTransform: null
    }
		this.zoom = d3.zoom()
								.scaleExtent([1, 50000])
								.on("zoom", this.zoomed.bind(this))
  }

	componentWillMount() {
		loadData(this.props.cnr_url, data => this.setState(data));
	}

  componentDidMount() {
		d3.select(this.refs.svg)
			.call(this.zoom);
  }

  componentDidUpdate() {
		d3.select(this.refs.svg)
			.call(this.zoom)
	}

	zoomed() {
		this.setState({ 
			zoomTransform: d3.event.transform
		});
	}

	render() {
		const { zoomTransform } = this.state;
		return (
			<div ref="svg">
				<Plot {...this.state} {...styles} zoomTransform={zoomTransform} /> 
			</div>
		)
	}
}