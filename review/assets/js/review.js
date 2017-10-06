var React = require('react')
var ReactDOM = require('react-dom')
import Review from './components/Review';

ReactDOM.render(<Review cnr_url='/api/cnx/SR-238/CGP-3615/' />, 
    document.getElementById('review_container'))
