var React = require('react')
var ReactDOM = require('react-dom')
import Chart from './components/Chart';

ReactDOM.render(<Chart url='/api/cnr/SR-238/CGP-3615/' />, 
    document.getElementById('review_container'))
