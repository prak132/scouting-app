import turtle
from PIL import ImageGrab
import requests
import json
import csv
import random
import time

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
scouter_color = ['green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green']
scouter_color_index = -1
target_number = "1678"
start = ''

matches_1678 = {}

# Read the CSV file and extract matches for Team 1678
with open(csv_file_path, newline='') as csvfile:
    reader = csv.reader(csvfile)
    for row in reader:
        team_number, *matches = row
        if team_number == target_number:
            matches_1678[target_number] = matches
            

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
            scouter.pencolor('white')
            scouter.left(90)
        elif start_pos == 'r=Right':
            scouter.color('white')
            scouter.penup()
            scouter.goto(180, -330)
            scouter.pendown
            scouter.pencolor('white')
            scouter.left(90)
    elif color == 'Red':
        if start_pos == 'Left':
            scouter.color('white')
            scouter.penup()
            scouter.goto(-150, -330)
            scouter.pendown
            turtle.pencolor('white')
            scouter.left(90)
        elif start_pos == 'Middle':
            scouter.color('white')
            scouter.penup()
            scouter.goto(30, -330)
            scouter.pendown
            scouter.pencolor('white')
            scouter.left(90)
        elif start_pos == 'Right':
            scouter.color('white')
            scouter.penup()
            scouter.goto(180, -330)
            scouter.pendown
            scouter.pencolor('white')
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
                scouter.pencolor(scouter_color[scouter_color_index])
                scouter.goto(-210, 190)
                scouter.forward(10)
                r = 10
                scouter.circle(r)
                scouter.penup()
            elif i == 1:
                scouter.penup()
                scouter.pendown()
                scouter.width(3)
                scouter.pencolor(scouter_color[scouter_color_index])
                scouter.goto(-105, 190)
                scouter.forward(10)
                r = 10
                scouter.circle(r)
                scouter.penup()
            elif i == 2:
                scouter.penup()
                scouter.pendown()
                scouter.width(3)
                scouter.pencolor(scouter_color[scouter_color_index])
                scouter.goto(5, 190)
                scouter.forward(10)
                r = 10
                scouter.circle(r)
                scouter.penup()
            elif i == 3:
                scouter.penup()
                scouter.pendown()
                scouter.width(3)
                scouter.pencolor(scouter_color[scouter_color_index])
                scouter.goto(115, 190)
                scouter.forward(10)
                r = 10
                scouter.circle(r)
                scouter.penup()
            elif i == 4:
                scouter.penup()
                scouter.pendown()
                scouter.width(3)
                scouter.pencolor(scouter_color[scouter_color_index])
                scouter.goto(225, 190)
                scouter.forward(10)
                r = 10
                scouter.circle(r)
                scouter.penup()
            
            elif i == 7:
                scouter.penup()
                scouter.pendown()
                scouter.width(3)
                scouter.pencolor(scouter_color[scouter_color_index])
                scouter.goto(-5, -245)
                scouter.forward(10)
                r = 10
                scouter.circle(r)
                scouter.penup()
            elif i == 6:
                scouter.penup()
                scouter.pendown()
                scouter.width(3)
                scouter.pencolor(scouter_color[scouter_color_index])
                scouter.goto(-95, -245)
                scouter.forward(10)
                r = 10
                scouter.circle(r)
                scouter.penup()
            elif i == 5:
                scouter.penup()
                scouter.pendown()
                scouter.width(3)
                scouter.pencolor(scouter_color[scouter_color_index])
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
                scouter.pencolor(scouter_color[scouter_color_index])
                scouter.goto(-205, 185)
                scouter.forward(10)
                r = 10
                scouter.circle(r)
                scouter.penup()
            elif i == 1:
                scouter.penup()
                scouter.pendown()
                scouter.width(3)
                scouter.pencolor(scouter_color[scouter_color_index])
                scouter.goto(-100, 185)
                scouter.forward(10)
                r = 10
                scouter.circle(r)
                scouter.penup()
            elif i == 2:
                scouter.penup()
                scouter.pendown()
                scouter.width(3)
                scouter.pencolor(scouter_color[scouter_color_index])
                scouter.goto(10, 185)
                scouter.forward(10)
                r = 10
                scouter.circle(r)
                scouter.penup()
            elif i == 3:
                scouter.penup()
                scouter.pendown()
                scouter.width(3)
                scouter.pencolor(scouter_color[scouter_color_index])
                scouter.goto(120, 185)
                scouter.forward(10)
                r = 10
                scouter.circle(r)
                scouter.penup()
            elif i == 4:
                scouter.penup()
                scouter.pendown()
                scouter.width(3)
                scouter.pencolor(scouter_color[scouter_color_index])
                scouter.goto(225, 185)
                scouter.forward(10)
                r = 10
                scouter.circle(r)
                scouter.penup()
            
            elif i == 5:
                scouter.penup()
                scouter.pendown()
                scouter.width(3)
                scouter.pencolor(scouter_color[scouter_color_index])
                scouter.goto(15, -245)
                scouter.forward(10)
                r = 10
                scouter.circle(r)
                scouter.penup()
            elif i == 6:
                scouter.penup()
                scouter.pendown()
                scouter.width(3)
                scouter.pencolor(scouter_color[scouter_color_index])
                scouter.goto(105, -245)
                scouter.forward(10)
                r = 10
                scouter.circle(r)
                scouter.penup()
            elif i == 7:
                scouter.penup()
                scouter.pendown()
                scouter.width(3)
                scouter.pencolor(scouter_color[scouter_color_index])
                scouter.goto(195, -245)
                scouter.forward(10)
                r = 10
                scouter.circle(r)
                scouter.penup()

# Loop through each match for Team 1678
for match in matches_1678.get(target_number, []):
    readable_data = []

    # Reading through the data for the current match
    if match in data:
        for entry in data[match]:
            if entry["autoteam"] == target_number:
                # Accessing the note scoring for the target name
                notescoring = entry["notescoring"]
                color = entry["alliance"]
                start = entry["robotposition"]
                scouter_color_index+=1
                for i in range(len(notescoring)):
                    temp = notescoring[i][0]
                    readable_data.append(temp)
                break
            else:
                print(f"Target name '{target_number}' not found in the data")
                scouter.setheading(90)
            #scouter.right(360)
    else:
        scouter.setheading(90)
        print(f"Match '{match}' not found in the data")
        scouter.setheading(90)

    # Set up the turtle screen
    wn = turtle.Screen()
    wn.setup(800, 1340)  # Adjusted to match the image dimensions

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
    #scouter.goto(0,0)
    scouter.setheading(90)
    #start_pos(start, scouter)
    
    
    turtle_path = []

    def record_position(x, y):
        turtle_path.append((x, y))

    scouter.ondrag(record_position)

    # You may want to let the user control the turtle to draw the path here.

    # Save the image after the turtle finishes its work
    canvas = turtle.getcanvas()
    canvas.update()
    img = ImageGrab.grab(bbox=(canvas.winfo_rootx(),
                                canvas.winfo_rooty(),
                                canvas.winfo_rootx() + canvas.winfo_width(),
                                canvas.winfo_rooty() + canvas.winfo_height()))

    # Save the path separately (Optional: You may save this in a different format)
    #with open(f"api_code/auto_visualizer/turtle_path_{match}.txt", 'w') as f:
        #for pos in turtle_path:
           # f.write(f"{pos}\n")

    img.save(f"api_code/auto_visualizer/turtle_path_img_{match}.png")

    # Clear the turtle's drawings for the next match
    scouter.clear()

# Close the turtle graphics window
turtle.done()