from django.db import models
from customers.models import Customer

class FollowUp(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    follow_up_date = models.DateField()
    follow_up_time = models.TimeField()
    status = models.CharField(
        max_length=20,
        choices=[
            ('pending', 'Pending'),
            ('completed', 'Completed'),
        ],
        default='pending'
    )
    priority = models.CharField(
        max_length=10,
        choices=[
            ('High', 'High'),
            ('Medium', 'Medium'),
            ('Low', 'Low'),
        ],
        default='Medium'
    )
    notes = models.TextField(blank=True)
    next_follow_up_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)