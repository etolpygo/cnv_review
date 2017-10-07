import React from 'react';

const renderLines = (props) => {
	return (coords) => {
		const lineProps = {
			x1: props.xScale(coords),
			y1: props.yScale(-4),
			x2: props.xScale(coords),
			y2: props.yScale(4),
			strokeWidth: 1,
			stroke: 'yellow',
			fill: 'yellow',
			key: coords,
			clipPath: props.clipPath
		};
		return <line {...lineProps} />;
	};
};

export default (props) => {
    return (
	    <g className="chromosomeTicks">{ props.padded_starts.map(renderLines(props)) }</g>
    )
}