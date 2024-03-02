import turtle
from PIL import ImageGrab

wn = turtle.Screen()
wn.setup(800, 1340)  # Adjusted to match the image dimensions


#Red image size: 554 × 730
#Blue image size: 560 × 736


#------------------------------------------------------------------------------------------------


color = 'blue'
#testing for each field color
if color == 'blue':
    try:
        wn.bgpic("api_code/auto_visualizer/blue.png")
    except Exception as e:
        print("Error loading background image:", e)
elif color == 'red':
    try:
        wn.bgpic("api_code/auto_visualizer/red.png")
    except Exception as e:
        print("Error loading background image:", e)


#------------------------------------------------------------------------------------------------

scouter = turtle.Turtle()

#------------------------------------------------------------------------------------------------

#depending on the start position given, will travel to that position, also depends on red or blue
def start_pos(start_pos, scouter):
    if color == 'blue':
        if start_pos == 'left':
            scouter.color('white')
            scouter.penup()
            scouter.goto(-170, -330)
            scouter.pendown
            turtle.pencolor('white')
            scouter.left(90)
        elif start_pos == 'middle':
            scouter.color('white')
            scouter.penup()
            scouter.goto(30, -330)
            scouter.pendown
            scouter.pencolor('white')
            scouter.left(90)
        elif start_pos == 'right':
            scouter.color('white')
            scouter.penup()
            scouter.goto(180, -330)
            scouter.pendown
            scouter.pencolor('white')
            scouter.left(90)
    elif color == 'red':
        if start_pos == 'left':
            scouter.color('white')
            scouter.penup()
            scouter.goto(-150, -330)
            scouter.pendown
            turtle.pencolor('white')
            scouter.left(90)
        elif start_pos == 'middle':
            scouter.color('white')
            scouter.penup()
            scouter.goto(30, -330)
            scouter.pendown
            scouter.pencolor('white')
            scouter.left(90)
        elif start_pos == 'right':
            scouter.color('white')
            scouter.penup()
            scouter.goto(180, -330)
            scouter.pendown
            scouter.pencolor('white')
            scouter.left(90)


#------------------------------------------------------------------------------------------------

#depending on the color and the notes that were given, will travel to each note
def notes(notes_taken, scouter):
    if color == 'blue':
        for i in notes_taken:
            if i == 0:
                scouter.penup()
                scouter.pendown()
                scouter.width(3)
                scouter.pencolor('green')
                scouter.goto(-210, 190)
                scouter.forward(10)
                r = 10
                scouter.circle(r)
                scouter.penup()
            elif i == 1:
                scouter.penup()
                scouter.pendown()
                scouter.width(3)
                scouter.pencolor('green')
                scouter.goto(-105, 190)
                scouter.forward(10)
                r = 10
                scouter.circle(r)
                scouter.penup()
            elif i == 2:
                scouter.penup()
                scouter.pendown()
                scouter.width(3)
                scouter.pencolor('green')
                scouter.goto(5, 190)
                scouter.forward(10)
                r = 10
                scouter.circle(r)
                scouter.penup()
            elif i == 3:
                scouter.penup()
                scouter.pendown()
                scouter.width(3)
                scouter.pencolor('green')
                scouter.goto(115, 190)
                scouter.forward(10)
                r = 10
                scouter.circle(r)
                scouter.penup()
            elif i == 4:
                scouter.penup()
                scouter.pendown()
                scouter.width(3)
                scouter.pencolor('green')
                scouter.goto(225, 190)
                scouter.forward(10)
                r = 10
                scouter.circle(r)
                scouter.penup()
            
            elif i == 7:
                scouter.penup()
                scouter.pendown()
                scouter.width(3)
                scouter.pencolor('green')
                scouter.goto(-5, -245)
                scouter.forward(10)
                r = 10
                scouter.circle(r)
                scouter.penup()
            elif i == 6:
                scouter.penup()
                scouter.pendown()
                scouter.width(3)
                scouter.pencolor('green')
                scouter.goto(-95, -245)
                scouter.forward(10)
                r = 10
                scouter.circle(r)
                scouter.penup()
            elif i == 5:
                scouter.penup()
                scouter.pendown()
                scouter.width(3)
                scouter.pencolor('green')
                scouter.goto(-180, -245)
                scouter.forward(10)
                r = 10
                scouter.circle(r)
                scouter.penup()
    elif color == 'red':
        for i in notes_taken:
            if i == 0:
                scouter.penup()
                scouter.pendown()
                scouter.width(3)
                scouter.pencolor('green')
                scouter.goto(-205, 185)
                scouter.forward(10)
                r = 10
                scouter.circle(r)
                scouter.penup()
            elif i == 1:
                scouter.penup()
                scouter.pendown()
                scouter.width(3)
                scouter.pencolor('green')
                scouter.goto(-100, 185)
                scouter.forward(10)
                r = 10
                scouter.circle(r)
                scouter.penup()
            elif i == 2:
                scouter.penup()
                scouter.pendown()
                scouter.width(3)
                scouter.pencolor('green')
                scouter.goto(10, 185)
                scouter.forward(10)
                r = 10
                scouter.circle(r)
                scouter.penup()
            elif i == 3:
                scouter.penup()
                scouter.pendown()
                scouter.width(3)
                scouter.pencolor('green')
                scouter.goto(120, 185)
                scouter.forward(10)
                r = 10
                scouter.circle(r)
                scouter.penup()
            elif i == 4:
                scouter.penup()
                scouter.pendown()
                scouter.width(3)
                scouter.pencolor('green')
                scouter.goto(225, 185)
                scouter.forward(10)
                r = 10
                scouter.circle(r)
                scouter.penup()
            
            elif i == 5:
                scouter.penup()
                scouter.pendown()
                scouter.width(3)
                scouter.pencolor('green')
                scouter.goto(15, -245)
                scouter.forward(10)
                r = 10
                scouter.circle(r)
                scouter.penup()
            elif i == 6:
                scouter.penup()
                scouter.pendown()
                scouter.width(3)
                scouter.pencolor('green')
                scouter.goto(105, -245)
                scouter.forward(10)
                r = 10
                scouter.circle(r)
                scouter.penup()
            elif i == 7:
                scouter.penup()
                scouter.pendown()
                scouter.width(3)
                scouter.pencolor('green')
                scouter.goto(195, -245)
                scouter.forward(10)
                r = 10
                scouter.circle(r)
                scouter.penup()
            

#------------------------------------------------------------------------------------------------
#this is where all data should be inputed
# how the data will be actually, use only index[0]
data = [[0, 0.00], [1, 0.00], [2, 0.00], [3, 0.00], [4, 0.00], [5, 0.00], [6, 0.00], [7, 0.00]]
readable_data = []

for i in range(len(data)):
    temp = data[i][0]
    readable_data.append(temp)

start_pos('left', scouter)
notes(readable_data, scouter)


#------------------------------------------------------------------------------------------------
#saving each image as a png after the turtle is done workings
canvas = turtle.getcanvas()
canvas.update()
img = ImageGrab.grab(bbox=(canvas.winfo_rootx(), 
                            canvas.winfo_rooty(),
                            canvas.winfo_rootx() + canvas.winfo_width(),
                            canvas.winfo_rooty() + canvas.winfo_height()))
img.save("api_code/auto_visualizer/turtle_path_img.png")

turtle.done()