from django.urls import path
from .views import CustomerListCreateView, CustomerRetrieveUpdateDeleteView

urlpatterns = [
    path("", CustomerListCreateView.as_view(), name="customer-list"),
    path("<int:pk>/", CustomerRetrieveUpdateDeleteView.as_view(), name="customer-detail"),
]