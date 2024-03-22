import turtle
from PIL import ImageGrab
import requests
import json
import csv
from googleapiclient.discovery import build
from google.oauth2.service_account import Credentials
from googleapiclient.http import MediaFileUpload

# Fetching data from the provided URL
url = "https://eft-knowing-horse.ngrok-free.app/"
response = requests.get(url)

if response.status_code == 200:
    data = response.json()
else:
    print("Failed to fetch data from the URL")
    exit()

csv_file_path = "api_code/teamdata.csv"

# Defining all important variables
scouter = turtle.Turtle()
color = 'green'
#target_numbers = ["114", "846", "841"]  # Add more team numbers if needed
matches_by_team = {}

scouter_color = 'green'
start = ''
scouter.speed(0)
scouter.hideturtle()

# Read the CSV file and extract matches for each team
with open(csv_file_path, newline='') as csvfile:
    reader = csv.reader(csvfile)
    for i, row in enumerate(reader):
        team_number, *matches = row
        matches_by_team[team_number] = matches


# Initialize Google Sheets service
creds = Credentials.from_service_account_file('api_code/auto_visualizer/path-visualizer-416423-e17294f591e9.json')
service = build('sheets', 'v4', credentials=creds)
spreadsheet_id = '1jraCpNwvo5_2YZJfHRzCBonktWJW7PVRIj4hTBmsz-Q'

# Create a Google Drive service
drive_service = build('drive', 'v3', credentials=creds)

# Define start_pos function
def start_pos(start_pos, scouter):
    scouter.setheading(90)
    if color == 'Blue':
       if start_pos == 'Left':
           
           scouter.penup()
           scouter.goto(-170, -330)
           scouter.pendown
           
           scouter.left(90)
       elif start_pos == 'Middle':
           
           scouter.penup()
           scouter.goto(30, -330)
           scouter.pendown
           
           scouter.left(90)
       elif start_pos == 'Right':
           
           scouter.penup()
           scouter.goto(180, -330)
           scouter.pendown
           
           scouter.left(90)
    elif color == 'Red':
       if start_pos == 'Left':
           
           scouter.penup()
           scouter.goto(-150, -330)
           scouter.pendown
           
           scouter.left(90)
       elif start_pos == 'Middle':
           
           scouter.penup()
           scouter.goto(30, -330)
           scouter.pendown
           
           scouter.left(90)
       elif start_pos == 'Right':
           
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

# Loop through each team and its matches
for team_number, matches in matches_by_team.items():
    # Check if the sheet already exists
    sheet_title = f'Team {team_number}'
    sheet_exists = False
    spreadsheet = service.spreadsheets().get(spreadsheetId=spreadsheet_id).execute()
    for sheet in spreadsheet['sheets']:
        if sheet['properties']['title'] == sheet_title:
            sheet_exists = True
            break

    # If the sheet doesn't exist, create a new one
    if not sheet_exists:
        requests = [
            {
                "addSheet": {
                    "properties": {
                        "title": sheet_title
                    }
                }
            }
        ]
        service.spreadsheets().batchUpdate(
            spreadsheetId=spreadsheet_id,
            body={"requests": requests}
        ).execute()

    # Loop through each match for the current team
    for match_index, match in enumerate(matches, start=1):
        readable_data = []

        # Reading through the data for the current match
        if match in data:
            for entry in data[match]:
                if entry is not None and entry.get("autoteam") == team_number:
                    # Accessing the note scoring for the target name
                    notescoring = entry.get("notescoring", [])
                    color = entry.get("alliance", "")
                    start = entry.get("robotposition", "")
                    for i in range(len(notescoring)):
                        temp = notescoring[i][0]
                        readable_data.append(temp)
                    break
                else:
                    print(f"Team number '{team_number}' not found in the data")
        else:
            print(f"Match '{match}' not found in the data")

        # Set up the background image based on the alliance color
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

        img_path = f"api_code/auto_visualizer/auto_paths/turtle_path_img_{match}.png"#api_code/auto_visualizer/turtle_path_img_{match}.png
        img.save(img_path)

        # Upload the image to Google Drive
        file_metadata = {'name': f'team_{team_number}_path_{match}.png', 'parents': ['1rEUiu_2Ub4B3VDty3PgcMH28w39_L9gi']}
        media = MediaFileUpload(img_path, mimetype='image/png')
        file = drive_service.files().create(body=file_metadata,
                                             media_body=media,
                                             fields='id').execute()

        # Get the URL of the uploaded image
        image_url = f"https://drive.google.com/uc?id={file.get('id')}"

        # Insert the image URL and match number into the corresponding sheet for the current team
        sheet_range_image = f"{sheet_title}!A{match_index}"  # Update the cell corresponding to the image
        sheet_range_match = f"{sheet_title}!B{match_index}"  # Update the cell corresponding to the match number
        values_image = [[f'=IMAGE("{image_url}")']]
        values_match = [[f'Match {match}']]
        body_image = {'values': values_image}
        body_match = {'values': values_match}

        # Update the image URL and match number into the corresponding cells
        result_image = service.spreadsheets().values().update(
            spreadsheetId=spreadsheet_id,
            range=sheet_range_image,
            valueInputOption='USER_ENTERED',
            body=body_image
        ).execute()

        result_match = service.spreadsheets().values().update(
            spreadsheetId=spreadsheet_id,
            range=sheet_range_match,
            valueInputOption='USER_ENTERED',
            body=body_match
        ).execute()

        print(f'Image and Match number updated in Google Sheets for Team {team_number}, Match {match} successfully!')

        # Clear the turtle's drawings for the next match
        scouter.clear()

# Close the turtle graphics window
turtle.done()
