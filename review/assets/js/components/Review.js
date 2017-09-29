import React from 'react';
import * as d3      from "d3";
import 'bootstrap/dist/css/bootstrap.css';

import { loadData } from './DataHandling';
import Plot from './Chart/Plot';
import Controls from './Controls';

const styles = {
  width   : 750,
  height  : 400,
  padding : 30,
};


export default class Review extends React.Component {

   constructor(props) {
		super(props);
		this.state = {
			zoomEvent: {
				transform: null
			},
			chromosomeFilter: () => true,
			filteredBy: {
				absLoc: '*',
				chromosome: '*',
				chromosomeLoc: '*'
		    }
		}
		this.zoom = d3.zoom()
					  // only zoom in, e.g. between 1x and 5000x
					  .scaleExtent([1, 5000])
					  // restrict panning to edges of the graph
					  .translateExtent([[styles.padding, styles.padding], [(styles.width-styles.padding), (styles.height - styles.padding * 2)]])
	    			  .extent([[styles.padding, styles.padding], [(styles.width-styles.padding), (styles.height - styles.padding * 2)]])
					  .on("zoom", this.zoomed.bind(this));

		this.updateDataFilter = this.updateDataFilter.bind(this)
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

	shouldComponentUpdate(nextProps, nextState) {
	    const { cnr_data, filteredBy, zoomEvent } = this.state;

	    const changedData = (cnr_data && cnr_data.length) !== (nextState.cnr_data && nextState.cnr_data.length);
	    const changedFilters = Object.keys(filteredBy)
	                                 .some(
	                                    k => filteredBy[k] !== nextState.filteredBy[k]
	                                 );
	    const changedZoom = zoomEvent.transform !== nextState.zoomEvent.transform

	    return changedData || changedFilters || changedZoom;
	}

	zoomed() {
		var e = d3.event;
		this.setState({ 
			zoomEvent: e
		});
	}

	updateDataFilter(chromosomeFilter, filteredBy) {
	    this.setState({
	      	filteredBy: filteredBy,
	      	chromosomeFilter: chromosomeFilter
	    });
	}

	render() {
		let chartArea;
		let controlsArea;

		if (this.state.cnr_data && this.state.xticks) {
			const filteredCNR = this.state.cnr_data.filter(this.state.chromosomeFilter)

			chartArea = (
				<div>
					<div ref="svg">
						<Plot 	cnr_data={filteredCNR} 
								zoomEvent={this.state.zoomEvent}
								xticks={this.state.xticks}
							{...styles} /> 
					</div>
					<div>Scroll up to zoom in; scroll down to zoom out.</div>
				</div>
			);
			controlsArea = (
				<Controls updateDataFilter={this.updateDataFilter} 
						  allowedChromosomeValues={this.state.allowedChromosomeValues}
				/>
			);
		}
		else {
			chartArea = (
				<div>Loading.... </div>
			);
			controlsArea = (
				<div></div>
			);
		}
		return (
			<div className="appWrapper">
				<div className="sideBar">
					{controlsArea}
				</div>
				<div className="graphContainer">
					{chartArea} 
				</div>
			</div>
		);
	}
}