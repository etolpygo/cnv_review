import React from 'react';

const renderLines = (props) => {
	return (coords) => {
		var stroke_width, x_position, x_end, log2 = coords.log2;
		if (props.atChromosome != '') {
			x_position = parseInt(coords.chrom_x_position);
			x_end = parseInt(coords.chrom_x_end);
			stroke_width = 4;
		}
		else {
			x_position = parseInt(coords.x_position);
			x_end = parseInt(coords.x_end);
			stroke_width: 2;
		}
		const line_id = coords.chromosome + '_' + parseInt(coords.chrom_x_position) + '-' + parseInt(coords.chrom_x_end);
		const lineProps = {
			x1: props.xScale(x_position),
			y1: props.yScale(log2),
			x2: props.xScale(x_end),
			y2: props.yScale(log2),
			strokeWidth: stroke_width,
			stroke: 'darkorange',
			fill: 'darkorange',
			key: line_id,
			id: line_id,
			clipPath: props.clipPath,
			strokeLinecap: "round"
		};
		return <line {...lineProps} />;
	};
};

export default (props) => {
    return (
	    <g className="cns_area">{ props.cns_data.map(renderLines(props)) }</g>
    )
}