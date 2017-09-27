import React  from 'react';
import Axis   from './Axis';
import XAxis   from './XAxis';

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
    translate: `translate(${props.width - props.padding}, 0)`,
    scale: props.yScale,
    orient: 'Right'
  };

  const xtickSettings = props.xticks;

  return <g className="xy-axis">
    <XAxis {...xBottomSettings} {...xtickSettings} />
    <XAxis {...xTopSettings} {...xtickSettings} />
    <Axis {...yLeftSettings}/>
    <Axis {...yRightSettings}/>
  </g>
}