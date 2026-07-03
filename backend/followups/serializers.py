from rest_framework import serializers
from .models import FollowUp


class FollowUpSerializer(serializers.ModelSerializer):

    customer_name = serializers.ReadOnlyField(source="customer.name")

    class Meta:
        model = FollowUp
        fields = "__all__"
        