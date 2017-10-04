import React from 'react';

export default function ZeroAxis(props) {

	const lineProps = {
		x1: props.xScale(props.chartMin),
		y1: props.yScale(-0.002),
		x2: props.xScale(props.chartMax),
		y2: props.yScale(-0.002),
		strokeWidth: 1,
		stroke: "black",
		fill: "none",
		vectorEffect: "non-scaling-stroke",
		clipPath: props.clipPath,
		className: "zero-axis"
	};

  	return <line {...lineProps} />;
}