import React  from 'react';
import Axis   from './axis';

export default (props) => {
  const xSettings = {
    translate: `translate(0, ${props.height - props.padding})`,
    scale: props.xScale,
    orient: 'Bottom'
  };
  const ySettings = {
    translate: `translate(${props.padding}, 0)`,
    scale: props.yScale,
    orient: 'Left'
  };
  const xTopSettings = {
    translate: `translate(0, ${props.padding})`,
    scale: props.xScale,
    orient: 'Top'
  };

  return <g className="xy-axis">
    <Axis {...xSettings}/>
    <Axis {...xTopSettings}/>
    <Axis {...ySettings}/>
  </g>
}