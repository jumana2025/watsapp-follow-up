from rest_framework import serializers
from .models import Customer
import re


class CustomerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customer
        fields = "__all__"

    def validate_name(self, value):
        value = value.strip()

        if len(value) < 3:
            raise serializers.ValidationError(
                "Name must contain at least 3 characters."
            )

        return value

    def validate_phone(self, value):

        if not value.isdigit():
            raise serializers.ValidationError(
                "Phone number must contain only digits."
            )

        if len(value) != 10:
            raise serializers.ValidationError(
                "Phone number must be exactly 10 digits."
            )

        customer = Customer.objects.filter(phone=value)

        if self.instance:
            customer = customer.exclude(pk=self.instance.pk)

        if customer.exists():
            raise serializers.ValidationError(
                "Phone number already exists."
            )

        return value

    def validate_email(self, value):

        value = value.strip().lower()

        email_regex = r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'

        if not re.match(email_regex, value):
            raise serializers.ValidationError(
                "Enter a valid email address."
            )

        return value

    def validate_company(self, value):
        return value.strip()