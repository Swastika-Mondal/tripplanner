from fastapi import HTTPException
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from dotenv import load_dotenv
load_dotenv('api.env')
import os

# Email settings
smtp_server = 'smtp.gmail.com'
smtp_port = 587  # Use 465 for SSL
sender_email = os.getenv('SERVER_EMAIL')
password = os.getenv('SERVER_EMAIL_PASS') # Use App Password if 2FA is enabled

# Function to send an email
def send_email(email: str, subject: str, message: str):
    try:
        # Set up the SMTP server
        receiver_email = email
        # Create the email message
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = receiver_email
        msg['Subject'] = subject

        # Attach the body with the email
        msg.attach(MIMEText(message, 'plain'))

        # Connect to Gmail's SMTP server
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()  # Secure the connection

        # Log in to the email server
        server.login(sender_email, password)

        # Send the email
        text = msg.as_string()
        server.sendmail(sender_email, receiver_email, text)

        # Close the connection to the server
        server.quit()
        
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Failed to send email.")