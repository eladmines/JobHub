import smtplib
import ssl
from email.message import EmailMessage
from datetime import datetime, timedelta

def send_email(link):
    email_sender = "***********"
    email_password = "***********"
    email_receiver = "***********"

    subject = "test"
    body = link


    em = EmailMessage()
    em['From'] = email_sender
    em['To'] = email_receiver
    em['Subject'] = subject
    em.set_content(body)

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
        smtp.login(email_sender, email_password)
        smtp.sendmail(email_sender, email_receiver, em.as_string())

