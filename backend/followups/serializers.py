from rest_framework import serializers
from .models import FollowUp


class FollowUpSerializer(serializers.ModelSerializer):

    customer_name = serializers.ReadOnlyField(source="customer.name")
    customer_phone = serializers.ReadOnlyField(source="customer.phone")

    class Meta:
        model = FollowUp
        fields = "__all__"

class TodayFollowUpSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source="customer.name", read_only=True)
    customer_phone = serializers.CharField(source="customer.phone", read_only=True)
    customer_company = serializers.CharField(source="customer.company", read_only=True)
    customer_product_service = serializers.CharField(source="customer.product_service", read_only=True)

    class Meta:
        model = FollowUp
        fields = [
            "id",
            "customer_name",
            "customer_phone",
            "customer_company",
            "customer_product_service",
            "follow_up_date",
            "follow_up_time",
            "status",
            "priority",
            "notes",
            "next_follow_up_date",
        ]