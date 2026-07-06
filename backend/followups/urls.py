from django.urls import path
from .views import (
    CompletedFollowUpsAPIView,
    DashboardStatisticsAPIView,
    FollowUpListCreateView,
    FollowUpDetailView,
    TodayFollowUpsAPIView,
    SendEmailReminderAPIView,
    ExportFollowUpsCSVAPIView,
)

urlpatterns = [
    path("", FollowUpListCreateView.as_view(), name="followup-list-create"),
    path("export/", ExportFollowUpsCSVAPIView.as_view(), name="export-followups"),
    path("today/", TodayFollowUpsAPIView.as_view(), name="today-followups"),
    path("completed/", CompletedFollowUpsAPIView.as_view(), name="completed-followups"),
    path(
        "dashboard/statistics/",
        DashboardStatisticsAPIView.as_view(),
        name="dashboard-statistics",
    ),
    path(
        "send-reminder/",
        SendEmailReminderAPIView.as_view(),
        name="send-email-reminder",
    ),
    path("<int:pk>/", FollowUpDetailView.as_view(), name="followup-detail"),
]