import React from 'react';
import Plot from './Plot';
import * as d3      from "d3";

const styles = {
  width   : 1000,
  height  : 500,
  padding : 50,
};


export default class Chart extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
        zoomTransform: null
      }
      this.zoom = d3.zoom()
                  .scaleExtent([0, 3100000000])
                  .on("zoom", this.zoomed.bind(this))
   }
   componentDidMount() {
      this.loadData();
      d3.select(this.refs.svg)
        .call(this.zoom);
   }

   componentDidUpdate() {
      d3.select(this.refs.svg)
        .call(this.zoom)
    }

    zoomed() {
      this.setState({ 
        zoomTransform: d3.event.transform
      });
    }

   loadData() {
      $.ajax({
          url: this.props.url,
          datatype: 'json',
          cache: true,
          success: function(data) {
              this.setState({data: data});
          }.bind(this)
      });
      $.ajax({
          url: '/api/chromosome_lengths',
          datatype: 'json',
          cache: true,
          success: function(d) {
            var xticks = {
              tickValues: d.starts,
              tickFormat: d.chromosomes
            }
            this.setState({xticks: xticks});
          }.bind(this)
      });
   }

  render() {
    const { zoomTransform } = this.state;
    return (
      <div ref="svg">
        <Plot {...this.state} {...styles} zoomTransform={zoomTransform} /> 
      </div>
    )
  }
}