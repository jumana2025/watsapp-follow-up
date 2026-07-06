from django.contrib.auth import get_user_model
from django.test import TestCase
from django.utils import timezone
from rest_framework.test import APIClient

from customers.models import Customer
from .models import FollowUp


class DashboardApiTests(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(username="tester", password="secret123")
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        self.customer = Customer.objects.create(
            name="Jane Doe",
            phone="1234567890",
            email="jane@example.com",
            company="Example Co",
            status="NEW",
        )

        FollowUp.objects.create(
            customer=self.customer,
            follow_up_date=timezone.localdate(),
            follow_up_time="10:00:00",
            status="pending",
            notes="Call back",
        )
        FollowUp.objects.create(
            customer=self.customer,
            follow_up_date=timezone.localdate(),
            follow_up_time="15:00:00",
            status="completed",
            notes="Done",
        )

    def test_dashboard_statistics_endpoint_returns_expected_counts(self):
        response = self.client.get("/api/followups/dashboard/statistics/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["total_customers"], 1)
        self.assertEqual(response.json()["total_followups"], 2)
        self.assertEqual(response.json()["pending_followups"], 1)
        self.assertEqual(response.json()["completed_followups"], 1)
        self.assertEqual(response.json()["today_followups"], 2)

    def test_completed_followups_endpoint_returns_completed_only(self):
        response = self.client.get("/api/followups/completed/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0]["status"], "completed")
