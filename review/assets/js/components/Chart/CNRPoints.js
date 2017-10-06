import React from 'react';

const renderCircles = (props) => {
	return (coords) => {
		const rgbaVal = "rgba(0, 0, 0, " + coords.weight + ")";
		const absoluteCenter = ((parseInt(coords.absoluteStart) + parseInt(coords.absoluteEnd)) / 2);

		const circleProps = {
			cx: props.xScale(absoluteCenter),
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