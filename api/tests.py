from rest_framework.test import APITestCase, APIRequestFactory
import json
from api.views import CaseViewSet


class SimpleAPITest(APITestCase):

    def test_case_details(self):
        response = self.client.get('/api/api/CCGL-716/?format=json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response['content-type'], 'application/json')

        data = json.loads(response.content)
        TestOrderID = data['TestOrderID']
        PatientID = data['PatientID']

        self.assertEqual(TestOrderID, "CCGL-716")
        self.assertEqual(PatientID, "PA-760")


    def test_responses_match_fixture_data(self):
        with open('api/fixtures/cases.json') as data_file:    
            fixture_data = json.load(data_file)

            for case in fixture_data:
                fixture_TestOrderID = case['TestOrderID']
                fixture_PatientID = case['PatientID']
                url = '/api/api/' + fixture_TestOrderID + '/?format=json'
                response = self.client.get(url)
                self.assertEqual(response.status_code, 200)
                self.assertEqual(response['content-type'], 'application/json')

                response_json = json.loads(response.content)
                response_TestOrderID = response_json['TestOrderID']
                response_PatientID = response_json['PatientID']

                self.assertEqual(response_TestOrderID, fixture_TestOrderID)
                self.assertEqual(response_PatientID, fixture_PatientID)


    def test_case_list(self):
        response = self.client.get('/api/api/?format=json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response['content-type'], 'application/json')

        data = json.loads(response.content)

        # TODO test the data contents somehow
        self.fail("finish me")



    def test_viewset_retrieve(self):
        request = APIRequestFactory().get("")
        case_detail = CaseViewSet.as_view({'get': 'retrieve'})
        response = case_detail(request, pk="CCGL-773")
        self.assertEqual(response.status_code, 200)


    def test_viewset_list(self):
        request = APIRequestFactory().get("")
        case_list = CaseViewSet.as_view({'get': 'list'})
        response = case_list(request)
        self.assertEqual(response.status_code, 200)



