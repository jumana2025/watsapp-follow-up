from django.urls import path
from .views import (
    FollowUpListCreateView,
    FollowUpDetailView
)

urlpatterns = [

    path("", FollowUpListCreateView.as_view()),

    path("<int:pk>/", FollowUpDetailView.as_view()),

]