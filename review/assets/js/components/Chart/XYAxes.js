import React    from 'react';
import Axis     from './Axis';
import * as d3  from "d3";
import _ from 'lodash';

export default (props) => {


  let xTopSettings = {
    translate: `translate(0, ${props.padding})`,
    scale: props.xScale,
    orient: 'Top'
  };
  let xBottomSettings = {
    translate: `translate(0, ${props.height - props.padding})`,
    scale: props.xScale,
    orient: 'Bottom'
  };

  if (props.atChromosome !== '') {
    var xSettings = {
      numTicks: 8,
      tickFormat: function(d) { return d3.format(".2s")(d) + 'b'; }  
    }
    xTopSettings = _.extend(xTopSettings, xSettings);
    xBottomSettings = _.extend(xBottomSettings, xSettings)
  }
  else {
    xBottomSettings.chromosomeLookup = props.chromosomeLookup;
    xTopSettings.chromosomeLookup = props.chromosomeLookup;
  }

  const yLeftSettings = {
    translate: `translate(${props.padding}, 0)`,
    scale: props.yScale,
    numTicks: 6,
    orient: 'Left'
  };
  const yRightSettings = {
    translate: `translate(${props.width - props.padding}, 0)`,
    scale: props.yScale,
    numTicks: 6,
    orient: 'Right'
  };

  return <g className="xy-axis">
    <Axis {...xBottomSettings} />
    <Axis {...xTopSettings} />
    <Axis {...yLeftSettings}/>
    <Axis {...yRightSettings}/>
  </g>
}