from utils import mail
from flask_mail import Message


def send_mail(subject, sender, recipients, text_body, html_body):
    msg = Message(subject, sender, recipients, text_body, html_body)
    mail.send(msg)

    return "send mail success"


# def send_mail(Title, _from, _to, text_body, html_body):
#     with mail.connect() as conn:
#         subject = Title
#         sender = _from
#         recipients = [_to]

#         msg = Message(subject, sender, recipients, text_body, html_body)
#         conn.send(msg)

#         return "send mail success"
