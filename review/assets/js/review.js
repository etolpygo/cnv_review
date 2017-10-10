var React = require('react')
var ReactDOM = require('react-dom')
import Review from './components/Review';

ReactDOM.render(<Review cnx_url='/api/cnx/SR-260/CGP-3933/' />, 
    document.getElementById('review_container'))
