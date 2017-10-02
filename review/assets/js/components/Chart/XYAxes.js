import React  from 'react';
import Axis   from './Axis';
import XAxis   from './XAxis';

export default (props) => {

  const xTopSettings = {
    translate: `translate(0, ${props.padding})`,
    scale: props.xScale,
    orient: 'Top',
    xticks: props.xticks
  };
  const xBottomSettings = {
    translate: `translate(0, ${props.height - props.padding})`,
    scale: props.xScale,
    orient: 'Bottom',
    xticks: props.xticks
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
    <XAxis {...xBottomSettings} />
    <XAxis {...xTopSettings} />
    <Axis {...yLeftSettings}/>
    <Axis {...yRightSettings}/>
  </g>
}