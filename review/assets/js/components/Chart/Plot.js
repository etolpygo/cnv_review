import React        		from 'react';
import * as d3      		from "d3";
import CNRPoints   			from './CNRPoints';
import CNSLines 			from './CNSLines';
import XYAxes       		from './XYaxes';
import ZeroAxis     		from './ZeroAxis';
import ChromosomeLines    	from './ChromosomeLines';

export default class Plot extends React.Component {
	constructor(props) {
		super(props);
		this.updateD3(props);
	}

	componentWillUpdate(nextProps) {
		this.updateD3(nextProps);
	}

	updateD3(props) {

		const { zoomEvent, chartMin, chartMax } = props;

		this.xScale = d3.scaleLinear()
			.domain([chartMin, chartMax])
			.range([props.padding, (props.width - props.padding)]);

		this.yScale = d3.scaleLinear()
			.domain([-4, 4])
			.range([props.height - props.padding, props.padding]);

		if (zoomEvent.transform) {
			this.xScale.domain(zoomEvent.transform.rescaleX(this.xScale).domain());
		}
	}

	render() {
		const scales = { xScale: this.xScale, yScale: this.yScale };
		const atChromosome = this.props.atChromosome;

		let chromosomeLines;
		if (atChromosome === '') {
			chromosomeLines = (<ChromosomeLines padded_starts={this.props.chromosomeLookup.padded_starts}
								 				clipPath="url(#chartClip)"
								 				{...scales} />);
		}
		else {
			chromosomeLines = <span />;
		}

		return (
			<svg width={this.props.width} height={this.props.height} ref="plot">
				<defs>
					<clipPath id="chartClip">
						<rect x={this.props.padding}
							  y={this.props.padding}
							  width={(this.props.width - this.props.padding * 2)} 
							  height={(this.props.height - this.props.padding * 2)} 
						/>
					</clipPath>
				</defs>
				<CNRPoints cnr_data={this.props.cnr_data} 
						   clipPath="url(#chartClip)"
						   atChromosome={atChromosome}
						   {...scales}  />
				<CNSLines cns_data={this.props.cns_data} 
						  clipPath="url(#chartClip)"
						  atChromosome={atChromosome}
						  {...scales}  />
				<ZeroAxis chartMin={this.props.chartMin}
						  chartMax={this.props.chartMax}
						  clipPath="url(#chartClip)"
						  {...scales}  />
				{chromosomeLines}
				<XYAxes padding={this.props.padding} 
						height={this.props.height}
						width={this.props.width}
						chromosomeLookup={this.props.chromosomeLookup}
						atChromosome={atChromosome}
						{...scales} />
			</svg>
		)
	}
}