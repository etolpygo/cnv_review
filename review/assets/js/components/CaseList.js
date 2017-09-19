import React  from 'react';

var CaseList = React.createClass({
    loadCases: function(){
        $.ajax({
            url: this.props.url,
            datatype: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this)
        })
    },

    getInitialState: function() {
        return {data: []};
    },

    componentDidMount: function() {
        this.loadCases();
        setInterval(this.loadCases, 
                    this.props.pollInterval)
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