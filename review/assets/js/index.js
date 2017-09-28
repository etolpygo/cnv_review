var React = require('react')
var ReactDOM = require('react-dom')
import CaseList from './components/CaseList';

ReactDOM.render(<CaseList url='/api/api/?format=json' />, 
    document.getElementById('cases_container'))
