import React from 'react';
import Plot from './Plot';
import * as d3      from "d3";

import { loadData } from './DataHandling';

const styles = {
  width   : 750,
  height  : 400,
  padding : 50,
};


export default class Chart extends React.Component {

   constructor(props) {
	  super(props);
	  this.state = {
		zoomTransform: null
	  }
	  this.zoom = d3.zoom()
				  // only zoom in, e.g. between 1x and 5000x
				  .scaleExtent([1, 5000])

				  // .translateExtent([[0, 0], [(styles.width - styles.padding * 2), (styles.height - styles.padding * 2)]])
				  //.extent([[0, 0], [(styles.width - styles.padding * 2), (styles.height - styles.padding * 2)]])
				  // .translateExtent([[0, 0], [styles.width, styles.height]])
				  // .extent([[0, 0], [styles.width, styles.height]])
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
		var e = d3.event;
		// var tx = Math.min(0, Math.max(e.transform[0], styles.width - styles.width * e.scale));
		this.setState({ 
		zoomEvent: e
		});
	}

	render() {
		if (this.state.cnr_data && this.state.xticks) {
			return (
				<div ref="svg">
					<Plot {...this.state} {...styles} /> 
					<span>Scroll up to zoom in; scroll down to zoom out.</span>
				</div>
			);
		}
		else {
			return (<div>Loading.... </div>);
		}
	}
}