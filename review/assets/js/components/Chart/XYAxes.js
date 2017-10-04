import React  from 'react';
import Axis   from './Axis';

export default (props) => {

  const xTopSettings = {
    translate: `translate(0, ${props.padding})`,
    scale: props.xScale,
    orient: 'Top',
    chromosomeLookup: props.chromosomeLookup
  };
  const xBottomSettings = {
    translate: `translate(0, ${props.height - props.padding})`,
    scale: props.xScale,
    orient: 'Bottom',
    chromosomeLookup: props.chromosomeLookup
  };
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