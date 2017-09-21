# settings specific to the review app

import os

REVIEW_ROOT = os.path.dirname(os.path.abspath(__file__))

review_staticfiles_dirs = (
    #This lets Django's collectstatic store our bundles
    os.path.join(REVIEW_ROOT, 'assets'), 
)

WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'bundles/',
        'STATS_FILE': os.path.join(REVIEW_ROOT, 'webpack-stats.json'),
    }
}