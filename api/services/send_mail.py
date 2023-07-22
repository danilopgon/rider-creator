from utils import mail
from flask_mail import Message


def send_mail(subject, sender, recipients, body, html):
    msg = Message()
    msg.subject = subject
    msg.sender = sender
    msg.recipients = recipients
    msg.body = body
    msg.html = html
    mail.send(msg)
    return "Mensaje enviado"
