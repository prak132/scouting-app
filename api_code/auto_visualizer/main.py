import turtle
from PIL import ImageGrab
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
scouter = turtle.Turtle()
color = ''
target_number = "1678"
matches_1678 = {}
scouter_color = 'green'
start = ''
scouter.speed(0)
scouter.hideturtle()

# Read the CSV file and extract matches for Team 1678
with open(csv_file_path, newline='') as csvfile:
    reader = csv.reader(csvfile)
    for i, row in enumerate(reader):
        #print(f"Row {i}: {row}")  # Print out each row to debug
        team_number, *matches = row
        if team_number == target_number:
            matches_1678[target_number] = matches

# Initialize Google Sheets service
creds = Credentials.from_service_account_file('api_code/auto_visualizer/path-visualizer-416423-e17294f591e9.json')
service = build('sheets', 'v4', credentials=creds)
spreadsheet_id = '17r918d5YDvlpFe2qYwyBJHLqBSfRk5ylKCpdN8rFoBc'

# Create a Google Drive service
drive_service = build('drive', 'v3', credentials=creds)



# Define start_pos function
def start_pos(start_pos, scouter):
    scouter.setheading(90)
    if color == 'Blue':
       if start_pos == 'Left':
           scouter.color('white')
           scouter.penup()
           scouter.goto(-170, -330)
           scouter.pendown
           turtle.pencolor('white')
           scouter.left(90)
       elif start_pos == 'Middle':
           scouter.color('white')
           scouter.penup()
           scouter.goto(30, -330)
           scouter.pendown
           
           scouter.left(90)
       elif start_pos == 'Right':
           scouter.color('white')
           scouter.penup()
           scouter.goto(180, -330)
           scouter.pendown
           
           scouter.left(90)
    elif color == 'Red':
       if start_pos == 'Left':
           scouter.color('white')
           scouter.penup()
           scouter.goto(-150, -330)
           scouter.pendown
           
           scouter.left(90)
       elif start_pos == 'Middle':
           scouter.color('white')
           scouter.penup()
           scouter.goto(30, -330)
           scouter.pendown
           
           scouter.left(90)
       elif start_pos == 'Right':
           scouter.color('white')
           scouter.penup()
           scouter.goto(180, -330)
           scouter.pendown
           
           scouter.left(90)

# Define notes function
def notes(notes_taken, scouter):
    scouter.setheading(90)
    if color == 'Blue':
       for i in notes_taken:
           if i == 0:
               scouter.penup()
               scouter.pendown()
               scouter.width(3)
               scouter.pencolor(scouter_color)
               scouter.goto(-210, 190)
               scouter.forward(10)
               r = 10
               scouter.circle(r)
               scouter.penup()
           elif i == 1:
               scouter.penup()
               scouter.pendown()
               scouter.width(3)
               scouter.pencolor(scouter_color)
               scouter.goto(-105, 190)
               scouter.forward(10)
               r = 10
               scouter.circle(r)
               scouter.penup()
           elif i == 2:
               scouter.penup()
               scouter.pendown()
               scouter.width(3)
               scouter.pencolor(scouter_color)
               scouter.goto(5, 190)
               scouter.forward(10)
               r = 10
               scouter.circle(r)
               scouter.penup()
           elif i == 3:
               scouter.penup()
               scouter.pendown()
               scouter.width(3)
               scouter.pencolor(scouter_color)
               scouter.goto(115, 190)
               scouter.forward(10)
               r = 10
               scouter.circle(r)
               scouter.penup()
           elif i == 4:
               scouter.penup()
               scouter.pendown()
               scouter.width(3)
               scouter.pencolor(scouter_color)
               scouter.goto(225, 190)
               scouter.forward(10)
               r = 10
               scouter.circle(r)
               scouter.penup()
          
           elif i == 7:
               scouter.penup()
               scouter.pendown()
               scouter.width(3)
               scouter.pencolor(scouter_color)
               scouter.goto(-5, -245)
               scouter.forward(10)
               r = 10
               scouter.circle(r)
               scouter.penup()
           elif i == 6:
               scouter.penup()
               scouter.pendown()
               scouter.width(3)
               scouter.pencolor(scouter_color)
               scouter.goto(-95, -245)
               scouter.forward(10)
               r = 10
               scouter.circle(r)
               scouter.penup()
           elif i == 5:
               scouter.penup()
               scouter.pendown()
               scouter.width(3)
               scouter.pencolor(scouter_color)
               scouter.goto(-180, -245)
               scouter.forward(10)
               r = 10
               scouter.circle(r)
               scouter.penup()
    elif color == 'Red':
       for i in notes_taken:
           if i == 0:
               scouter.penup()
               scouter.pendown()
               scouter.width(3)
               scouter.pencolor(scouter_color)
               scouter.goto(-205, 185)
               scouter.forward(10)
               r = 10
               scouter.circle(r)
               scouter.penup()
           elif i == 1:
               scouter.penup()
               scouter.pendown()
               scouter.width(3)
               scouter.pencolor(scouter_color)
               scouter.goto(-100, 185)
               scouter.forward(10)
               r = 10
               scouter.circle(r)
               scouter.penup()
           elif i == 2:
               scouter.penup()
               scouter.pendown()
               scouter.width(3)
               scouter.pencolor(scouter_color)
               scouter.goto(10, 185)
               scouter.forward(10)
               r = 10
               scouter.circle(r)
               scouter.penup()
           elif i == 3:
               scouter.penup()
               scouter.pendown()
               scouter.width(3)
               scouter.pencolor(scouter_color)
               scouter.goto(120, 185)
               scouter.forward(10)
               r = 10
               scouter.circle(r)
               scouter.penup()
           elif i == 4:
               scouter.penup()
               scouter.pendown()
               scouter.width(3)
               scouter.pencolor(scouter_color)
               scouter.goto(225, 185)
               scouter.forward(10)
               r = 10
               scouter.circle(r)
               scouter.penup()
          
           elif i == 5:
               scouter.penup()
               scouter.pendown()
               scouter.width(3)
               scouter.pencolor(scouter_color)
               scouter.goto(15, -245)
               scouter.forward(10)
               r = 10
               scouter.circle(r)
               scouter.penup()
           elif i == 6:
               scouter.penup()
               scouter.pendown()
               scouter.width(3)
               scouter.pencolor(scouter_color)
               scouter.goto(105, -245)
               scouter.forward(10)
               r = 10
               scouter.circle(r)
               scouter.penup()
           elif i == 7:
               scouter.penup()
               scouter.pendown()
               scouter.width(3)
               scouter.pencolor(scouter_color)
               scouter.goto(195, -245)
               scouter.forward(10)
               r = 10
               scouter.circle(r)
               scouter.penup()

wn = turtle.Screen()
wn.setup(800, 1340)
# Loop through each match for Team 1678
for match_index, match in enumerate(matches_1678.get(target_number, []), start=1):
    readable_data = []

    # Reading through the data for the current match
    if match in data:
        for entry in data[match]:
            if entry["autoteam"] == target_number:
                # Accessing the note scoring for the target name
                notescoring = entry["notescoring"]
                color = entry["alliance"]
                start = entry["robotposition"]
                for i in range(len(notescoring)):
                    temp = notescoring[i][0]
                    readable_data.append(temp)
                break
            else:
                print(f"Target name '{target_number}' not found in the data")
    else:
        print(f"Match '{match}' not found in the data")

    # Set up the turtle screen
      # Adjusted to match the image dimensions

    # Set up the background image based on the alliance color (Assuming background images are loaded here)
    if color == 'Blue':
       try:
           wn.bgpic("api_code/auto_visualizer/blue.png")
       except Exception as e:
           print("Error loading background image:", e)
    elif color == 'Red':
       try:
           wn.bgpic("api_code/auto_visualizer/red.png")
       except Exception as e:
           print("Error loading background image:", e)



    # Set starting position and draw notes
    start_pos(start, scouter)
    notes(readable_data, scouter)

    scouter.setheading(90)

    # Saving the image after the turtle finishes its work
    canvas = turtle.getcanvas()
    canvas.update()
    img = ImageGrab.grab(bbox=(canvas.winfo_rootx(),
                               canvas.winfo_rooty(),
                               canvas.winfo_rootx() + canvas.winfo_width(),
                               canvas.winfo_rooty() + canvas.winfo_height()))

    img_path = f"turtle_path_img_{match}.png"
    img.save(img_path)

    # Upload the image to Google Drive
    file_metadata = {'name': f'team_{target_number}_path_{match}.png', 'parents': ['1rEUiu_2Ub4B3VDty3PgcMH28w39_L9gi']}
    media = MediaFileUpload(img_path, mimetype='image/png')
    file = drive_service.files().create(body=file_metadata,
                                         media_body=media,
                                         fields='id').execute()

    # Get the URL of the uploaded image
    image_url = f"https://drive.google.com/uc?id={file.get('id')}"

    # Insert the image URL into Google Sheets
    sheet_range = f'A{match_index}'
    values = [[f'{image_url}']]
    body = {'values': values}
    result = service.spreadsheets().values().update(
        spreadsheetId=spreadsheet_id, range=sheet_range,
        valueInputOption='USER_ENTERED', body=body).execute()

    print(f'Image uploaded and linked in Google Sheets for Match {match} successfully!')

    file_metadata = {'name': f'team_{target_number}_path_{match}.png', 'parents': ['1rEUiu_2Ub4B3VDty3PgcMH28w39_L9gi']}
    media = MediaFileUpload(img_path, mimetype='image/png')
    file = drive_service.files().create(body=file_metadata,
                                         media_body=media,
                                         fields='id').execute()

    # Get the URL of the uploaded image
    image_url = f"https://drive.google.com/uc?id={file.get('id')}"

    # Insert the image URL into Google Sheets using Google Apps Script
    


    # Clear the turtle's drawings for the next match
    scouter.clear()

# Close the turtle graphics window
turtle.done()
