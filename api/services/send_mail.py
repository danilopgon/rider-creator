
from flask_mail import Message, Mail

mail = Mail()

def send_mail(Title, _from, _to, text_body, html_body):
    subject = Title
    sender = (_from)
    recipients=[_to]
    text_body = text_body
    html_body = html_body
    
    msg = Message(subject, sender, recipients, text_body, html_body)
    mail.send(msg)
    
    return 'send mail success'

