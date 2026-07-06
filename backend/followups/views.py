from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.utils import timezone
from django.core.mail import send_mail
from django.conf import settings
from .models import FollowUp
from .serializers import FollowUpSerializer
from customers.models import Customer
from .serializers import TodayFollowUpSerializer
from rest_framework.response import Response
from rest_framework import status

class FollowUpListCreateView(generics.ListCreateAPIView):
    queryset = FollowUp.objects.all().order_by("-created_at")
    serializer_class = FollowUpSerializer
    permission_classes = [IsAuthenticated]


class FollowUpDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = FollowUp.objects.all()
    serializer_class = FollowUpSerializer
    permission_classes = [IsAuthenticated]


class DashboardStatisticsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = timezone.localdate()
        
        # Calculate pipeline data
        pipeline = {
            "new": Customer.objects.filter(status="NEW").count(),
            "interested": Customer.objects.filter(status="INTERESTED").count(),
            "not_interested": Customer.objects.filter(status="NOT_INTERESTED").count(),
            "closed": Customer.objects.filter(status="CLOSED").count(),
        }
        
        # Calculate lead sources
        from django.db.models import Count
        lead_sources_qs = Customer.objects.values("lead_source").annotate(count=Count("id"))
        lead_sources = [{"name": item["lead_source"] or "Unknown", "value": item["count"]} for item in lead_sources_qs]

        data = {
            "total_customers": Customer.objects.count(),
            "total_followups": FollowUp.objects.count(),
            "pending_followups": FollowUp.objects.filter(status="pending").count(),
            "completed_followups": FollowUp.objects.filter(status="completed").count(),
            "today_followups": FollowUp.objects.filter(follow_up_date=today).count(),
            "pipeline": pipeline,
            "lead_sources": lead_sources,
        }

        return Response(data)

class TodayFollowUpsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = timezone.localdate()

        followups = (
            FollowUp.objects
            .filter(follow_up_date=today)
            .select_related("customer")
            .order_by("follow_up_time")
        )

        serializer = TodayFollowUpSerializer(followups, many=True)

        return Response(serializer.data)

class CompletedFollowUpsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        followups = (
            FollowUp.objects
            .filter(status="completed")
            .select_related("customer")
            .order_by("-follow_up_date", "-follow_up_time")
        )

        serializer = TodayFollowUpSerializer(followups, many=True)

        return Response(serializer.data)


class SendEmailReminderAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        followup_id = request.data.get("followup_id")
        customer_email = request.data.get("customer_email")
        customer_name = request.data.get("customer_name")
        followup_date = request.data.get("followup_date")
        followup_time = request.data.get("followup_time")

        if not all([followup_id, customer_email, customer_name]):
            return Response(
                {"error": "Missing required fields"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            subject = f"Follow-up Reminder for {customer_name}"
            message = f"""
            Hi {customer_name},

            This is a reminder about your scheduled follow-up.
            Date: {followup_date}
            Time: {followup_time}

            Please respond at your earliest convenience.

            Best regards,
            FollowUp CRM Team
            """

            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [customer_email],
                fail_silently=False,
            )

            return Response(
                {"message": f"Reminder email sent to {customer_email}"},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


import csv
from django.http import HttpResponse

class ExportFollowUpsCSVAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Create the HttpResponse object with the appropriate CSV header.
        response = HttpResponse(
            content_type='text/csv',
            headers={'Content-Disposition': 'attachment; filename="followups.csv"'},
        )

        writer = csv.writer(response)
        # Write the header row
        writer.writerow(['ID', 'Customer Name', 'Customer Email', 'Follow-up Date', 'Follow-up Time', 'Status', 'Priority', 'Notes'])

        # Query the followups for this user/admin
        followups = FollowUp.objects.all().select_related('customer').order_by('-follow_up_date')

        for followup in followups:
            writer.writerow([
                followup.id,
                followup.customer.name,
                followup.customer.email,
                followup.follow_up_date,
                followup.follow_up_time,
                followup.status,
                followup.priority,
                followup.notes,
            ])

        return response
