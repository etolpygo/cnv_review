import React from 'react';

const renderLines = (props) => {
	return (coords) => {
		const rgbaVal = "rgba(0, 0, 0, " + coords.weight + ")";
		const lineProps = {
			x1: props.xScale(coords.absoluteStart),
			y1: props.yScale(coords.log2),
			x2: props.xScale(coords.absoluteEnd),
			y2: props.yScale(coords.log2),
			strokeWidth: 2,
			stroke: rgbaVal,
			fill: rgbaVal,
			key: coords.absoluteStart,
			clipPath: props.clipPath
		};
		return <line {...lineProps} />;
	};
};

export default (props) => {
  return <g className="area">{ props.cnr_data.map(renderLines(props)) }</g>
}