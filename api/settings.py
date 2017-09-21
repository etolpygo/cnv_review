# settings specific to the api app

import os

API_ROOT = os.path.dirname(os.path.abspath(__file__))

api_staticfiles_dirs = (
    os.path.join(API_ROOT, 'static'), 
)