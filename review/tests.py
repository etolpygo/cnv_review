from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from selenium import webdriver
import json

class ReviewTestCase(StaticLiveServerTestCase):
    def setUp(self):
        # Create a new instance of the Firefox driver
        self.driver = webdriver.Firefox() 
        # go to Review page
        self.base_url = self.live_server_url
        self.driver.get(self.base_url + "/review/")

    def tearDown(self):
        self.driver.close()

    def test_js_generated_content_is_present(self):
        assert 'Patient Cases' in self.driver.page_source

    def test_data_matches_fixtures(self):
        with open('api/fixtures/cases.json') as data_file:    
            fixture_data = json.load(data_file)
            for case in fixture_data:
                assert case['TestOrderID'] in self.driver.page_source
                assert case['PatientID'] in self.driver.page_source

