from rest_framework import generics
from .models import FollowUp
from .serializers import FollowUpSerializer


class FollowUpListCreateView(generics.ListCreateAPIView):

    serializer_class = FollowUpSerializer

    def get_queryset(self):
        queryset = FollowUp.objects.select_related("customer").all().order_by("followup_date")
        customer_id = self.request.query_params.get("customer")

        if customer_id:
            queryset = queryset.filter(customer_id=customer_id)

        return queryset


class FollowUpDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = FollowUp.objects.all()

    serializer_class = FollowUpSerializer