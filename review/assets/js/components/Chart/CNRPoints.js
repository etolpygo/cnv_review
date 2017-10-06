import React from 'react';

const renderCircles = (props) => {
	return (coords) => {
		const rgbaVal = "rgba(50, 50, 50, " + coords.weight + ")";
		const circleProps = {
			cx: props.xScale(coords.x_position),
			cy: props.yScale(coords.log2),
			r: 2,
			strokeWidth: 1,
			stroke: rgbaVal,
			fill: rgbaVal,
			key: coords.absoluteStart,
			clipPath: props.clipPath
		};
		return <circle {...circleProps} />;
	};
};

export default (props) => {
    return (
	    <g className="area">{ props.cnr_data.map(renderCircles(props)) }</g>
    )
}