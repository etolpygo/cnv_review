import React from 'react';
import Plot from './Chart/Plot';
import * as d3      from "d3";
import 'bootstrap/dist/css/bootstrap.css';

import { loadData } from './DataHandling';

const styles = {
  width   : 750,
  height  : 400,
  padding : 30,
};


export default class Review extends React.Component {

   constructor(props) {
	  super(props);
	  this.state = {
		zoomTransform: null
	  }
	  this.zoom = d3.zoom()
				  // only zoom in, e.g. between 1x and 5000x
				  .scaleExtent([1, 5000])
				  // restrict panning to edges of the graph
				  .translateExtent([[styles.padding, styles.padding], [(styles.width-styles.padding), (styles.height - styles.padding * 2)]])
    			  .extent([[styles.padding, styles.padding], [(styles.width-styles.padding), (styles.height - styles.padding * 2)]])
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
		this.setState({ 
			zoomEvent: e
		});
	}

	render() {
		let chartArea;
		if (this.state.cnr_data && this.state.xticks) {
			chartArea = (
				<div>
					<div ref="svg">
						<Plot {...this.state} {...styles} /> 
					</div>
					<div>Scroll up to zoom in; scroll down to zoom out.</div>
				</div>
			);
		}
		else {
			chartArea = (
				<div>Loading.... </div>
			);
		}
		return (
			<div className="appWrapper">
				<div className="sideBar">
					some sort of controls go here
				</div>
				<div className="graphContainer">
					{chartArea} 
				</div>
			</div>
		);
	}
}