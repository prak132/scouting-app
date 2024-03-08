from PIL import Image, ImageDraw
import requests
import json
import csv

# Fetching data from the provided URL
url = "https://0ee1d6b5-1234-4f5b-9b73-6c504c42fd15-00-bs9n3rjs4ihf.riker.replit.dev/alldata"
response = requests.get(url)

if response.status_code == 200:
    data = response.json()
else:
    print("Failed to fetch data from the URL")
    exit()

csv_file_path = "teamdata.csv"

# Defining all important variables
color = ''
target_number = "1678"
matches_1678 = {}
scouter_color = 'green'
start = ''

# Read the CSV file and extract matches for Team 1678
with open(csv_file_path, newline='') as csvfile:
    reader = csv.reader(csvfile)
    for i, row in enumerate(reader):
        #print(f"Row {i}: {row}")  # Print out each row to debug
        team_number, *matches = row
        if team_number == target_number:
            matches_1678[target_number] = matches

# Initialize Google Sheets service
"""
creds = Credentials.from_service_account_file('api_code/auto_visualizer/path-visualizer-416423-e17294f591e9.json')
service = build('sheets', 'v4', credentials=creds)
spreadsheet_id = '17r918d5YDvlpFe2qYwyBJHLqBSfRk5ylKCpdN8rFoBc'

# Create a Google Drive service
drive_service = build('drive', 'v3', credentials=creds)
"""
# Define start_pos function
def start_pos(start_pos, draw, color):
    if color == 'Blue':
        if start_pos == 'Left':
            draw.arc((-170, -330, -160, -320), 0, 360, fill='white', width=3)
        elif start_pos == 'Middle':
            draw.arc((30, -330, 40, -320), 0, 360, fill='white', width=3)
        elif start_pos == 'Right':
            draw.arc((180, -330, 190, -320), 0, 360, fill='white', width=3)
    elif color == 'Red':
        if start_pos == 'Left':
            draw.arc((-150, -330, -140, -320), 0, 360, fill='white', width=3)
        elif start_pos == 'Middle':
            draw.arc((30, -330, 40, -320), 0, 360, fill='white', width=3)
        elif start_pos == 'Right':
            draw.arc((180, -330, 190, -320), 0, 360, fill='white', width=3)

# Define notes function
def notes(notes_taken, draw, color):
    if color == 'Blue':
        for i in notes_taken:
            draw.arc((-210 + 110 * i, 190, -200 + 110 * i, 200), 0, 360, fill='green', width=3)
    elif color == 'Red':
        for i in notes_taken:
            draw.arc((-205 + 110 * i, 185, -195 + 110 * i, 195), 0, 360, fill='green', width=3)

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

    image = Image.new('RGB', (800, 1340), color='white')
    draw = ImageDraw.Draw(image)

    # Set up the turtle screen
    # Adjusted to match the image dimensions

    # Set up the background image based on the alliance color (Assuming background images are loaded here)
    if color == 'Blue':
        try:
            background = Image.open("blue.png")
            image.paste(background, (0, 0))
        except Exception as e:
            print("Error loading background image:", e)
    elif color == 'Red':
        try:
            background = Image.open("red.png")
            image.paste(background, (0, 0))
        except Exception as e:
            print("Error loading background image:", e)

    # Set starting position and draw notes
    start_pos(start, draw, color)
    notes(readable_data, draw, color)

    # Save the image after drawing
    img_path = f"pillow_path_img_{match}.png"
    image.save(img_path)

    # Upload the image to Google Drive
    """
    file_metadata = {'name': f'team_{target_number}_path_{match}.png', 'parents': ['1rEUiu_2Ub4B3VDty3PgcMH28w39_L9gi']}
    media = MediaFileUpload(img_path, mimetype='image/png')
    file = drive_service.files().create(body=file_metadata,
                                         media_body=media,
                                         fields='id').execute()

    # Get the URL of the uploaded image
    image_url = f"https://drive.google.com/uc?id={file.get('id')}"
    """

    """
    # Insert the image URL into Google Sheets
    sheet_range = f'A{match_index}'
    values = [[f'{image_url}']]
    body = {'values': values}
    result = service.spreadsheets().values().update(
        spreadsheetId=spreadsheet_id, range=sheet_range,
        valueInputOption='USER_ENTERED', body=body).execute()
    """

    print(f'Image uploaded and linked in Google Sheets for Match {match} successfully!')
