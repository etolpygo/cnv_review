import React from 'react';

const renderCircles = (props) => {
	return (coords) => {
		const rgbaVal = "rgba(100, 100, 100, " + coords.weight + ")";
		var x_position;
		if (props.atChromosome != '') {
			x_position = parseInt(coords.chrom_x_position);
		}
		else {
			x_position = parseInt(coords.x_position);
		}
		const circ_id = coords.chromosome + '_' + parseInt(coords.chrom_x_position);
		const circleProps = {
			cx: props.xScale(x_position),
			cy: props.yScale(coords.log2),
			r: 2,
			strokeWidth: 1,
			stroke: rgbaVal,
			fill: rgbaVal,
			key: circ_id,
			id: circ_id,
			clipPath: props.clipPath
		};
		return <circle {...circleProps} />;
	};
};

export default (props) => {
    return (
	    <g className="cnr_area">{ props.cnr_data.map(renderCircles(props)) }</g>
    )
}