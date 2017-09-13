# Skeleton front and back-end structure to display a list of available cases.

## To setup locally:

### clone the repo
git clone git@bitbucket.org:ccgl/cnv_review.git
cd cnv_review

### install and compile resources
npm install --save-dev
./node_modules/.bin/webpack --config webpack.config.js

### apply initial migrations
python manage.py migrate

### run local server
python manage.py runserver


## Usage:
* API at http://127.0.0.1:8000/api/ serves the list of available cases.
* React frontend consumes the API and displays the list of cases at http://127.0.0.1:8000/review/