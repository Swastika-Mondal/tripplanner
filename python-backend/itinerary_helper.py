import google.generativeai as genai
import json
import requests
from myutils.images_downloader import downloader
import os
from dotenv import load_dotenv

load_dotenv("api.env")

genai.configure(api_key=os.getenv("GEMINI_API"))

# Initialize the model
model = genai.GenerativeModel(model_name="gemini-1.5-flash")

def create_prompt(city_name, days_for_tour=1, places_per_day=3):
    # Prompt text to guide the LLM
    prompt = f"""
    You are a knowledgeable travel planner assistant with extensive information about places of interest in different cities. 
    Please create a detailed tour plan for a user.

    City: {city_name}
    Number of Days: {days_for_tour}
    Places per Day: {places_per_day}

    Your task:
    - Create an itinerary that evenly distributes popular and interesting places over {days_for_tour} days.
    - Each day should include approximately {places_per_day} places to visit.
    - Minimize travel distance by arranging nearby places together where possible.
    - Provide a brief description of each day's plan, ensuring that it is enjoyable and optimized for travel efficiency.
    - give location in this form only "38.8097, 88.6729" not with degree, and N, E etc.

    Format the output in JSON with the following structure:
    {{
        "City": "{city_name} with short description",
        "Itinerary": [
            {{
                "Heading": "Day 1: Historical Heritage and Vibrant Culture",
                "Places": [
                {{"visit_place": "Red Fort", "loc": "28.659, 72.494", time: "Morning", "description": "This UNESCO World Heritage Site is a must-see for its grandeur and historical significance. Witness the impressive Mughal architecture and soak in the atmosphere of this iconic landmark."}},
                ...
                ],
                "Description": "Begin your tour at Place 1, move to Place 2 for scenic views, and end the day exploring Place 3."
            }},
            ...
        ]
    }}
    """
    return prompt


def process_string_to_json(raw_string):
    try:
        json_str = json.loads(raw_string.split('```')[1][4:].replace("```json", "").replace("```", ""))
    except:
        json_str = {"message": "some error is occurred".title()}

    return json_str

def get_images_cdn(search_query, no_of_image=5):
    return downloader.get_cdn_links(
        query=search_query,
        limit=no_of_image,
    )

def add_images_to_itinerary(itinerary, city_name, no_of_image_per_place=5):

    for day in itinerary['Itinerary']:
        for place in day['Places']: 
            search_query = f"{city_name} {place['visit_place']}"
            place['Images'] = get_images_cdn(search_query, no_of_image_per_place)
        
    return itinerary

def generate_itinerary_using_gemini(prompt):
    response = model.generate_content([prompt])
    itinerary = process_string_to_json(response.text)
    return itinerary

def generate_itinerary(city_name, days_for_tour=3, places_per_day=3):
    prompt = create_prompt(city_name, days_for_tour, places_per_day)
    itinerary = generate_itinerary_using_gemini(prompt=prompt)
    itinerary = add_images_to_itinerary(itinerary=itinerary, city_name=city_name, no_of_image_per_place=5)
    return itinerary