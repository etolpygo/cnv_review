var React = require('react')
var ReactDOM = require('react-dom')
import CaseList    from './components/CaseList.js';

ReactDOM.render(<CaseList url='/api/api/?format=json' pollInterval={1000} />, 
    document.getElementById('cases_container'))
