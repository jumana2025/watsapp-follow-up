from django.db import models


class Customer(models.Model):
    STATUS_CHOICES = [
        ("NEW", "NEW"),
        ("CONTACTED", "CONTACTED"),
        ("FOLLOWUP", "FOLLOWUP"),
        ("INTERESTED", "INTERESTED"),
        ("NOT_INTERESTED", "NOT_INTERESTED"),
        ("CLOSED", "CLOSED"),
    ]

    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=10, unique=True)
    email = models.EmailField()
    company = models.CharField(max_length=100)
    product_service = models.CharField(max_length=200, blank=True)
    lead_source = models.CharField(max_length=100, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="NEW")
    created_at = models.DateTimeField(auto_now_add=True)

