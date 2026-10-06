from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from itinerary_helper import generate_itinerary
from email_helper import send_email

app = FastAPI()

# Define the CORS middleware
origins = [
    "http://localhost:5173",  # Allow frontend running on localhost:5173
]

# Add CORSMiddleware to the FastAPI app
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Specify the allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Define a Pydantic model to accept the input parameters
class ItineraryRequest(BaseModel):
    city_name: str
    days_for_tour: Optional[int] = 3  # Default to 3 days if not provided
    places_per_day: Optional[int] = 3  # Default to 3 places per day if not provided

# Pydantic model for the request body
class EmailRequest(BaseModel):
    email: str
    subject: str
    message: str

# Define the endpoint that uses your generate_itinerary function
@app.post("/generate-itinerary/")
async def generate_itinerary_endpoint(request: ItineraryRequest):
    # Call the function to generate the itinerary
    itinerary = generate_itinerary(request.city_name, request.days_for_tour, request.places_per_day)
    
    return itinerary

# FastAPI endpoint to send email
@app.post("/send-email/")
async def send_email_endpoint(email_request: EmailRequest):
    print(email_request.email, email_request.subject, email_request.message)
    send_email(email_request.email, email_request.subject, email_request.message)
    return {"message": "Email sent successfully!"}


# Start the FastAPI server by running the following in the terminal:
# uvicorn your_file_name:app --reload
