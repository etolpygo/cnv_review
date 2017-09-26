import React        from 'react';
import * as d3      from "d3";
import DataPoints   from './DataPoints';
import XYAxes       from './XYaxes';

const xMax   = (data)  => d3.max(data, (d) => Number(d.absoluteEnd));
const xMin   = (data)  => d3.min(data, (d) => Number(d.absoluteStart));

const yMax   = (data)  => d3.max(data, (d) => Number(d.log2));
const yMin   = (data)  => d3.min(data, (d) => Number(d.log2));


export default class Plot extends React.Component {
    constructor(props) {
      super(props);
      this.updateD3(props);
    }

    componentWillUpdate(nextProps) {
      this.updateD3(nextProps);
    }

    updateD3(props) {
      const { cnr_data, zoomTransform } = props;
   
      if (cnr_data) {
        this.xScale = d3.scaleLinear()
              .domain([xMin(cnr_data), xMax(cnr_data)])
              .range([props.padding, (props.width - props.padding * 2)]);

        this.yScale = d3.scaleLinear()
              .domain([yMin(cnr_data), yMax(cnr_data)])
              .range([props.height - props.padding, props.padding]);
      }
   
      if (zoomTransform) {
        this.xScale.domain(zoomTransform.rescaleX(this.xScale).domain());
      }
    }

    render() {
      if (this.props.cnr_data && this.props.xticks) {
        const scales = { xScale: this.xScale, yScale: this.yScale };
        return <svg width={this.props.width} height={this.props.height} ref="plot">
          <DataPoints {...this.props} {...scales} />
          <XYAxes {...this.props} {...scales} />
        </svg>
      }
      else {
        return (<div>Loading.... </div>)
      }
    }



}