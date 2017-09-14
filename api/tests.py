from rest_framework import status
from rest_framework.test import APITestCase, APIRequestFactory
import json
from django.urls import reverse
from api.views import CaseViewSet
from api.models import Case


class TestListAndDetail(APITestCase):

    def setUp(self):
        with open('api/fixtures/cases.json') as data_file:    
            self.fixture_data = json.load(data_file)


    def test_case_detail(self):
        response = self.client.get('/api/api/CCGL-716/?format=json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response['content-type'], 'application/json')

        data = json.loads(response.content)
        TestOrderID = data['TestOrderID']
        PatientID = data['PatientID']

        self.assertEqual(TestOrderID, "CCGL-716")
        self.assertEqual(PatientID, "PA-760")


    def test_case_detail_viewset(self):
        request = APIRequestFactory().get("")
        case_detail = CaseViewSet.as_view({'get': 'retrieve'})
        response = case_detail(request, pk="CCGL-773")
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "CCGL-773")
        self.assertContains(response, "PA-820")


    def test_case_details_match_fixture_data(self):
        for case in self.fixture_data:
            fixture_TestOrderID = case['TestOrderID']
            fixture_PatientID = case['PatientID']

            url = '/api/api/' + fixture_TestOrderID + '/?format=json'
            response = self.client.get(url)
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response['content-type'], 'application/json')

            response_json = json.loads(response.content)
            self.assertEqual(response_json['TestOrderID'], fixture_TestOrderID)
            self.assertEqual(response_json['PatientID'], fixture_PatientID)


    def test_case_list_viewset(self):
        request = APIRequestFactory().get("")
        case_list = CaseViewSet.as_view({'get': 'list'})
        response = case_list(request)
        self.assertEqual(response.status_code, 200)
        for case in self.fixture_data:
            fixture_TestOrderID = case['TestOrderID']
            fixture_PatientID = case['PatientID']
            self.assertContains(response, fixture_TestOrderID)
            self.assertContains(response, fixture_PatientID)


class TestDisallowActions(APITestCase):
    def setUp(self):
        self.data_bad = {'TestOrderID': 'CCGL-1111', 'PatientID': 'PA-7777' }
        self.data_good = {'TestOrderID': 'CCGL-716', 'PatientID': 'PA-760' }


    def test_disallow_create_case(self):
        url = reverse('api:case-list')
        data = self.data_bad
        response = self.client.post(url, data, format='json')
        self.assertNotContains(response, data['TestOrderID'], status.HTTP_405_METHOD_NOT_ALLOWED)


    def test_disallow_update_case(self):
        TestOrderID = self.data_good['TestOrderID']
        url = reverse('api:case-detail', args=[TestOrderID])
        data = {'TestOrderID': TestOrderID, 'PatientID': self.data_bad['PatientID'] }
        response = self.client.put(url, data, format='json')

        self.assertEqual(response.status_code, 405)
        case = Case.objects.get(pk=TestOrderID)
        self.assertEqual(case.PatientID, self.data_good['PatientID'])


    def test_disallow_delete_case(self):
        TestOrderID = self.data_good['TestOrderID']
        response = self.client.delete(reverse('api:case-detail', args=[TestOrderID]))

        self.assertNotEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        case = Case.objects.get(pk=TestOrderID)
        self.assertEqual(case.PatientID, self.data_good['PatientID'])



