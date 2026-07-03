from django.db import models
from customers.models import Customer

class FollowUp(models.Model):
    STATUS_CHOICES = [
        ("PENDING", "PENDING"),
        ("COMPLETED", "COMPLETED"),
        ("MISSED", "MISSED"),
    ]
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="followups")
    followup_date = models.DateField()
    notes = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="PENDING")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return  f"{self.customer.name} - {self.followup_date}"
