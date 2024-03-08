from PIL import Image, ImageDraw
import requests
import json
import csv
from googleapiclient.discovery import build
from google.oauth2.service_account import Credentials
from googleapiclient.http import MediaFileUpload

# Fetching data from the provided URL
url = "https://0ee1d6b5-1234-4f5b-9b73-6c504c42fd15-00-bs9n3rjs4ihf.riker.replit.dev/alldata"
response = requests.get(url)

if response.status_code == 200:
    data = response.json()
else:
    print("Failed to fetch data from the URL")
    exit()

csv_file_path = "api_code/teamdata.csv"

# Defining all important variables
color = ''
target_number = "1678"
matches_1678 = {}
start_x, start_y = 0, 0  # Set initial start position

# Read the CSV file and extract matches for Team 1678
with open(csv_file_path, newline='') as csvfile:
    reader = csv.reader(csvfile)
    for i, row in enumerate(reader):
        team_number, *matches = row
        if team_number == target_number:
            matches_1678[target_number] = matches

# Initialize Google Sheets service
creds = Credentials.from_service_account_file('api_code/auto_visualizer/path-visualizer-416423-e17294f591e9.json')
service = build('sheets', 'v4', credentials=creds)
spreadsheet_id = '17r918d5YDvlpFe2qYwyBJHLqBSfRk5ylKCpdN8rFoBc'

# Create a Google Drive service
drive_service = build('drive', 'v3', credentials=creds)


# Define function to get start position based on robot position
def get_start_position(robot_position):
    if color == 'Blue':
        if robot_position == 'Left':
            return -170, -330
        elif robot_position == 'Middle':
            return 30, -330
        elif robot_position == 'Right':
            return 180, -330
    elif color == 'Red':
        if robot_position == 'Left':
            return -150, -330
        elif robot_position == 'Middle':
            return 30, -330
        elif robot_position == 'Right':
            return 180, -330
    return 0, 0


# Define function to draw path based on readable data
def draw_path(draw, start_pos, notes_taken):
    current_x, current_y = start_pos
    for note in notes_taken:
        current_x += 50  # Adjust this value as needed
        current_y += note * 10  # Adjust this value as needed
        draw.point((current_x, current_y), fill="white")


# Loop through each match for Team 1678
for match_index, match in enumerate(matches_1678.get(target_number, []), start=1):
    readable_data = []

    # Reading through the data for the current match
    if match in data:
        for entry in data[match]:
            if entry["autoteam"] == target_number:
                notescoring = entry["notescoring"]
                color = entry["alliance"]
                start = entry["robotposition"]
                start_x, start_y = get_start_position(start)
                for i in range(len(notescoring)):
                    temp = notescoring[i][0]
                    readable_data.append(temp)
                break
            else:
                print(f"Target name '{target_number}' not found in the data")
    else:
        print(f"Match '{match}' not found in the data")

    # Set up the background image based on the alliance color
    if color == 'Blue':
        background_image = Image.open("api_code/auto_visualizer/blue.png")
    elif color == 'Red':
        background_image = Image.open("api_code/auto_visualizer/red.png")

    # Draw the path on the image
    draw = ImageDraw.Draw(background_image)
    draw_path(draw, (start_x, start_y), readable_data)

    # Save the image with the path drawn
    image_path = f"team_{target_number}_path_{match}.png"
    background_image.save(image_path)

    # Continue with your Google Drive and Google Sheets integration...
