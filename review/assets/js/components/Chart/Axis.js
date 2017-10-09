import React from 'react';
import * as d3Axis from 'd3-axis'
import { select as d3Select } from 'd3-selection'

export default class Axis extends React.Component {
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {

    const axisType = `axis${this.props.orient}`;
    
    let axis = d3Axis[axisType]().scale(this.props.scale);

    if (this.props.chromosomeLookup) {
      axis = axis.tickValues(this.props.chromosomeLookup.padded_starts).tickFormat((d, i) => this.props.chromosomeLookup.labels[i]);
    }
    else if (this.props.numTicks) {
      axis = axis.ticks(this.props.numTicks);
      if (this.props.tickFormat) {
        axis = axis.tickFormat(this.props.tickFormat);
      }
    }

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