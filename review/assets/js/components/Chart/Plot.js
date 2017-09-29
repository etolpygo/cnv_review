import React        from 'react';
import * as d3      from "d3";
import DataPoints   from './DataPoints';
import XYAxes       from './XYaxes';

const xMax   = (data)  => d3.max(data, (d) => Number(d.absoluteEnd));
const xMin   = (data)  => d3.min(data, (d) => Number(d.absoluteStart));

const yMax   = (data)  => d3.max(data, (d) => Number(d.log2));
const yMin   = (data)  => d3.min(data, (d) => Number(d.log2));


export default class Plot extends React.Component {
	constructor(props) {
	  super(props);
	  this.updateD3(props);
	}

	componentWillUpdate(nextProps) {
	  this.updateD3(nextProps);
	}

	updateD3(props) {

		const { cnr_data, zoomEvent } = props;

		this.xScale = d3.scaleLinear()
			.domain([xMin(cnr_data), xMax(cnr_data)])
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
			<DataPoints {...this.props} {...scales} clipPath="url(#chartClip)" />
			<XYAxes {...this.props} {...scales} />
			
	  	</svg>
	  )
	}



}