import React        from 'react';
import * as d3      from "d3";
import DataPoints   from './DataPoints';
import XYAxis       from './XYaxis';

const xMax   = (data)  => d3.max(data, (d) => d[0]);
const xMin   = (data)  => d3.min(data, (d) => d[0]);

const yMax   = (data)  => d3.max(data, (d) => d[1]);
const yMin   = (data)  => d3.min(data, (d) => d[1]);

// Returns a function that "scales" X coordinates from the data to fit the chart
const xScale = (props) => {
  return d3.scaleLinear()
    .domain([xMin(props.data), xMax(props.data)])
    .range([props.padding, props.width - props.padding * 2]);
};

// Returns a function that "scales" Y coordinates from the data to fit the chart
const yScale = (props) => {
  return d3.scaleLinear()
    .domain([yMin(props.data), yMax(props.data)])
    .range([props.height - props.padding, props.padding]);
};

export default (props) => {
  const scales = { xScale: xScale(props), yScale: yScale(props) };
  return <svg width={props.width} height={props.height}>
    <DataPoints {...props} {...scales} />
    <XYAxis {...props} {...scales} />
  </svg>
}