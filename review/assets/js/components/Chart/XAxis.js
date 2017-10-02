import React  from 'react';
import * as d3Axis from 'd3-axis'
import { select as d3Select } from 'd3-selection'
import Axis   from './axis';


export default class XAxis extends Axis {
	
	renderAxis() {
		const axisType = `axis${this.props.orient}`
		const axis = d3Axis[axisType]()
			.scale(this.props.scale)
			.tickValues(this.props.xticks.tickValues)
			.tickFormat((d, i) => this.props.xticks.tickFormat[i])
		d3Select(this.axisElement).call(axis)
	}

	render() {
		return (
			<g
				className={`Axis Axis-${this.props.orient}`}
				ref={(el) => { this.axisElement = el; }}
				transform={this.props.translate}
			/>
		)
	}
}