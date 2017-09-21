import React from 'react';

const renderLines = (props) => {

  return (coords, index) => {
    const lineProps = {
      x1: props.xScale(coords.absoluteStart),
      y1: props.yScale(coords.log2),
      x2: props.xScale(coords.absoluteEnd),
      y2: props.yScale(coords.log2),
      strokeWidth: 1,
      stroke: 'black',
      fill: 'black',
      key: index
    };
    return <line {...lineProps} />;
  };
};

export default (props) => {
  return <g>{ props.data.map(renderLines(props)) }</g>
}