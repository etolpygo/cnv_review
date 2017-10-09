# Skeleton front and back-end structure to display a list of available cases.

## To setup locally:

### clone the repo
* git clone git@bitbucket.org:ccgl/cnv_review.git
* cd cnv_review

### install python resources
* pip install -r requirements.txt

### install and compile js resources
* npm install --save-dev
* ./node_modules/.bin/webpack --config review/webpack.config.js

### apply initial migrations
python manage.py migrate

### run local server
python manage.py runserver


## Usage:
* API at http://127.0.0.1:8000/api/ serves the list of available cases.
* API at http://localhost:8000/api/cnx/SR-238/CGP-3615/cnr serves CNR data points 
* API at http://localhost:8000/api/cnx/SR-238/CGP-3615/cns serves CNS segments
* API at http://localhost:8000/api/chromosome_lengths serves chromosome lengths
* React frontend consumes the API and displays the list of cases at http://localhost:8000/review/
* React/D3 graph for SR-260/CGP-3933 (specific case for now) at http://127.0.0.1:8000/review/review