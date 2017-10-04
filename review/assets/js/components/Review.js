import React from 'react';
import * as d3      from "d3";
import _ from 'lodash';
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
			goToLoc: {
				chromosome: '',
				chromosomeLoc: ''
		    }
		}
		this.zoom = d3.zoom()
					  // only zoom in, e.g. between 1x and 70000000x
					  .scaleExtent([1, 70000000])
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
	    const { cnr_data, goToLoc, zoomEvent } = this.state;

	    const changedData = (cnr_data && cnr_data.length) !== (nextState.cnr_data && nextState.cnr_data.length);
	    const changedFilters = Object.keys(goToLoc)
	                                 .some(
	                                    k => goToLoc[k] !== nextState.goToLoc[k]
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

	resetZoom() {
		d3.select(this.refs.svg).call(this.zoom.transform, d3.zoomIdentity);
	}

	updateDataFilter(chromosome, chromosomeLoc) {
		this.resetZoom();

		let chromosomeFilter, chartMin, chartMax;

		let chromosomeLookup = this.state.chromosomeLookup

    	if (chromosome !== '') {
	    	chromosomeFilter = (d) => d.chromosome === chromosome;
	    	let ind = parseInt(_.invert(chromosomeLookup.names)[chromosome]);
	    	if (chromosomeLoc !== '') {
	    		// validated by Controls
	    		let cLoc = chromosomeLoc.split("-");
	    		let chromosomeLocStart = parseInt(cLoc[0]);
	    		let chromosomeLocEnd = parseInt(cLoc[1]);
	    		chartMin = chromosomeLookup.starts[ind] + chromosomeLocStart - 40; // some padding
	    		chartMax = chromosomeLookup.starts[ind] + chromosomeLocEnd + 40; // some padding

	    		console.log('chromosome ' + chromosome + ' starts at ' + chromosomeLookup.starts[ind]);
	    		console.log('chromosome ' + chromosome + ' ends at ' + chromosomeLookup.starts[ind + 1]);
	    		console.log('start is ' + chromosomeLocStart);
	    		console.log('end is ' + chromosomeLocEnd);
	    	}
	    	else {
		    	chartMin = chromosomeLookup.starts[ind];
		    	chartMax = chromosomeLookup.starts[ind + 1] ? chromosomeLookup.starts[ind + 1] : chromosomeLookup.starts[chromosomeLookup.starts.length - 1];
		    }
	    }
	    else {
	    	chromosomeFilter = () => true;
	    	chartMin = chromosomeLookup.starts[0];
	    	chartMax = chromosomeLookup.starts[chromosomeLookup.starts.length - 1];
	    }

	    this.setState({
	      	goToLoc: { 
	      		chromosome: chromosome, 
	      		chromosomeLoc: chromosomeLoc
	      	},
	      	chromosomeFilter: chromosomeFilter,
	      	chartMin: chartMin,
	      	chartMax: chartMax
	    });
	}

	render() {
		let chartArea;
		let controlsArea;

		if (this.state.cnr_data && this.state.chromosomeLookup) {
			const filteredCNR = this.state.cnr_data.filter(this.state.chromosomeFilter)

			chartArea = (
				<div>
					<div ref="svg">
						<Plot 	cnr_data={filteredCNR} 
								zoomEvent={this.state.zoomEvent}
								chromosomeLookup={this.state.chromosomeLookup}
								chartMin={this.state.chartMin}
								chartMax={this.state.chartMax}
							{...styles} /> 
					</div>
					<div>Scroll up to zoom in; scroll down to zoom out.</div>
				</div>
			);
			controlsArea = (
				<Controls updateDataFilter={this.updateDataFilter}
						  chromosomeLookup={this.state.chromosomeLookup}
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