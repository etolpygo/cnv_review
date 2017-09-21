import React  from 'react';
import Axis   from './axis';

export default (props) => {
  const xTopSettings = {
    translate: `translate(0, ${props.padding})`,
    scale: props.xScale,
    orient: 'Top'
  };
  const xBottomSettings = {
    translate: `translate(0, ${props.height - props.padding})`,
    scale: props.xScale,
    orient: 'Bottom'
  };
  const yLeftSettings = {
    translate: `translate(${props.padding}, 0)`,
    scale: props.yScale,
    orient: 'Left'
  };
  const yRightSettings = {
    translate: `translate(${props.width - (props.padding * 2)}, 0)`,
    scale: props.yScale,
    orient: 'Right'
  };

  return <g className="xy-axis">
    <Axis {...xBottomSettings}/>
    <Axis {...xTopSettings}/>
    <Axis {...yLeftSettings}/>
    <Axis {...yRightSettings}/>
  </g>
}