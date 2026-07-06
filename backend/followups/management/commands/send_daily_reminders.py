from django.core.management.base import BaseCommand
from django.utils import timezone
from django.core.mail import send_mail
from django.conf import settings
from followups.models import FollowUp

class Command(BaseCommand):
    help = 'Sends daily email reminders for pending follow-ups scheduled for today.'

    def handle(self, *args, **options):
        today = timezone.localdate()
        
        # Get pending follow-ups for today
        followups = FollowUp.objects.filter(follow_up_date=today, status='pending').select_related('customer')
        
        if not followups.exists():
            self.stdout.write(self.style.SUCCESS("No pending follow-ups for today. No emails sent."))
            return

        emails_sent = 0
        admin_email = getattr(settings, 'DEFAULT_FROM_EMAIL', 'admin@example.com')

        for followup in followups:
            subject = f"Follow-up Reminder: {followup.customer.name}"
            message = f"""
Hello,

This is a daily reminder for your scheduled follow-up with {followup.customer.name}.

Date: {followup.follow_up_date}
Time: {followup.follow_up_time}
Priority: {followup.priority}

Notes: {followup.notes or "No notes provided"}

Please log in to your CRM dashboard to mark this follow-up as completed.

Best regards,
Your CRM System
            """
            
            try:
                send_mail(
                    subject,
                    message,
                    admin_email,    # From email
                    [admin_email],  # To email (the admin)
                    fail_silently=False,
                )
                self.stdout.write(self.style.SUCCESS(f"Sent reminder for {followup.customer.name} to {admin_email}"))
                emails_sent += 1
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"Failed to send email for {followup.customer.name}: {e}"))
                
        self.stdout.write(self.style.SUCCESS(f"\nSuccessfully sent {emails_sent} daily reminder(s)."))
