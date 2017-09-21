import React        from 'react';
import * as d3      from "d3";
import DataPoints   from './DataPoints';
import XYAxis       from './XYaxis';

const xMax   = (data)  => d3.max(data, (d) => Number(d.absoluteEnd));
const xMin   = (data)  => d3.min(data, (d) => Number(d.absoluteStart));

const yMax   = (data)  => d3.max(data, (d) => Number(d.log2));
const yMin   = (data)  => d3.min(data, (d) => Number(d.log2));

// Returns a function that "scales" X coordinates from the data to fit the chart
const xScale = (props) => {
  if (props.data) {
    return d3.scaleLinear()
      .domain([xMin(props.data), xMax(props.data)])
      .range([props.padding, (props.width - props.padding * 2)]);
  }
};

// Returns a function that "scales" Y coordinates from the data to fit the chart
const yScale = (props) => {
  if (props.data) {
    return d3.scaleLinear()
      .domain([yMin(props.data), yMax(props.data)])
      .range([props.height - props.padding, props.padding]);
  }
};

export default (props) => {

  const scales = { xScale: xScale(props), yScale: yScale(props) };


  if (props.data) {
    return <svg width={props.width} height={props.height}>
      <DataPoints {...props} {...scales} />
      <XYAxis {...props} {...scales} />
    </svg>
  }
  else {
    return (<div>Loading.... </div>)
  }



}