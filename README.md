# Skeleton front and back-end structure to display a list of available cases.

## To setup locally:

### clone the repo
* git clone git@bitbucket.org:ccgl/cnv_review.git
* cd cnv_review

### install and compile resources
* npm install --save-dev
* ./node_modules/.bin/webpack --config review/webpack.config.js

### apply initial migrations
python manage.py migrate

### run local server
python manage.py runserver


## Usage:
* API at http://127.0.0.1:8000/api/ serves the list of available cases.
* API at http://localhost:8000/api/cnr/SR-238/CGP-3615/ serves CNR data points 
* API at http://localhost:8000/api/chromosome_lengths serves chromosome lengths
* React frontend consumes the API and displays the list of cases at http://localhost:8000/review/
* React/D3 graph for SR-238/CGP-3615 (specific case for now) at http://127.0.0.1:8000/review/review