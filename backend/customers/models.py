from django.db import models


class Customer(models.Model):
    STATUS_CHOICES = [
        ("NEW", "NEW"),
        ("CONTACTED", "CONTACTED"),
        ("FOLLOWUP", "FOLLOWUP"),
        ("INTERESTED", "INTERESTED"),
        ("NOT_INTERESTED", "NOT_INTERESTED"),
    ]

    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=10, unique=True)
    email = models.EmailField()
    company = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="NEW")
    created_at = models.DateTimeField(auto_now_add=True)

