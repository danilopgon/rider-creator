from utils.mail import mail
from flask_mail import Message

def send_mail(Title, _from, _to, text_body, html_body):
    subject = Title
    sender = (_from)
    recipients=[_to]
    text_body = text_body
    html_body = html_body
    
    msg = Message(subject, sender, recipients, text_body, html_body)
    mail.send(msg)
    
    return 'send mail success'

send_mail('title', 'from', 'to', 'text', 'html')