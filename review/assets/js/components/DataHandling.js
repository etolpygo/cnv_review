import * as d3 from 'd3';
import _ from 'lodash';

export const loadData = (cnx_url, callback = _.noop) => {
    const cnr_url = cnx_url + 'cnr';
    const cns_url = cnx_url + 'cns';
    d3.queue()
      .defer(d3.json, cnr_url)
      .defer(d3.json, cns_url)
      .defer(d3.json, '/api/chromosome_lengths')
      .await((error, cnr_data, cns_data, chromosome_lengths) => {

          let chromosomes = {
            labels: chromosome_lengths.chromosomes,
            padded_starts: chromosome_lengths.padded_starts,
            padded_lengths: chromosome_lengths.padded_lengths,
            lengths: chromosome_lengths.lengths
          };

          callback({
              cnr_data: cnr_data,
              cns_data: cns_data,
              chromosomeLookup: chromosomes,
              chartMin: chromosomes.padded_starts[0],
              chartMax: chromosomes.padded_starts[chromosomes.padded_starts.length - 1] + chromosomes.padded_lengths[chromosomes.padded_lengths.length - 1]
          });
      });
};