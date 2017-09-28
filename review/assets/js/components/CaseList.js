import React  from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

var CaseList = React.createClass({
    loadCases: function(callback = _.noop){
        d3.queue()
          .defer(d3.json, this.props.url)
          .await((error, cases_data) => {

              callback({
                  data: cases_data
              });
          });
    },

    getInitialState: function() {
        return {data: []};
    },

    componentWillMount: function() {
        this.loadCases(data => this.setState(data));
    }, 

    render: function() {
        if (this.state.data) {
            var caseNodes = this.state.data.map(function(it){
                return <li> {it.TestOrderID}: {it.PatientID} </li>
            })
        }
        return (
            <div>
                <h1>Patient Cases</h1>
                <ul>
                    {caseNodes}
                </ul>
            </div>
        )
    }
});

export default CaseList;