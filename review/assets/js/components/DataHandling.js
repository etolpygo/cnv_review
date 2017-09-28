import * as d3 from 'd3';
import _ from 'lodash';

export const loadData = (cnr_url, callback = _.noop) => {
    d3.queue()
      .defer(d3.json, cnr_url)
      .defer(d3.json, '/api/chromosome_lengths')
      .await((error, cnr_data, chromosome_lengths) => {

          let xTicks = {
            tickValues: chromosome_lengths.starts,
            tickFormat: chromosome_lengths.chromosomes
          };

          callback({
              cnr_data: cnr_data,
              xticks: xTicks
          });
      });
};