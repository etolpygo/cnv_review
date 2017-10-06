import * as d3 from 'd3';
import _ from 'lodash';

export const loadData = (cnr_url, callback = _.noop) => {
    d3.queue()
      .defer(d3.json, cnr_url)
      .defer(d3.json, '/api/chromosome_lengths')
      .await((error, cnr_data, chromosome_lengths) => {

          let chromosomes = {
            labels: chromosome_lengths.chromosomes,
            starts: chromosome_lengths.starts,
            lengths: chromosome_lengths.lengths
          };

          callback({
              cnr_data: cnr_data,
              chromosomeLookup: chromosomes,
              chartMin: chromosomes.starts[0],
              chartMax: chromosomes.starts[chromosomes.starts.length - 1]
          });
      });
};