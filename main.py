def avoidObstacle():
    global avoidDir
    if distance < 500:
        avoidDir = 0
# Function to receive direction from Raspberry Pi and control motors
def receiveData():
    global receivedData, waterDir
    receivedData = serial.read_line()
    # Check if data starts with "direction:"
    if receivedData.index_of("direction:") == 0:
        # Extract the direction value
        waterDir = parse_float(receivedData.substr(10, 5))
# Function to control motors based on direction
def controlMotors(dir2: number):
    if dir2 == 0:
        # Move forward
        basic.show_arrow(ArrowNames.NORTH)
        robotbit.motor_run_dual(robotbit.Motors.M1A, 150, robotbit.Motors.M1B, 150)
    elif dir2 == 1:
        # Turn left
        basic.show_arrow(ArrowNames.WEST)
        robotbit.motor_run_dual(robotbit.Motors.M1A, 0, robotbit.Motors.M1B, 150)
    elif dir2 == 2:
        # Turn right
        basic.show_arrow(ArrowNames.EAST)
        robotbit.motor_run_dual(robotbit.Motors.M1A, 150, robotbit.Motors.M1B, 0)
    elif dir2 == 3:
        # Move backward
        basic.show_arrow(ArrowNames.SOUTH)
        robotbit.motor_run_dual(robotbit.Motors.M1A, 150, robotbit.Motors.M1B, 150)
    else:
        # Stop motors
        basic.clear_screen()
        robotbit.motor_run_dual(robotbit.Motors.M1A, 0, robotbit.Motors.M1B, 0)
receivedData = ""
distance = 0
avoidDir = 0
waterDir = 0
# Set up serial communication to USB or pins
serial.redirect_to_usb()
waterDir = 0
avoidDir = 0
basic.show_icon(IconNames.YES)
# Main loop

def on_forever():
    global distance
    distance = sonar.ping(DigitalPin.P0, DigitalPin.P1, PingUnit.MICRO_SECONDS)
    # Receive movement direction from Raspberry Pi
    receiveData()
    basic.pause(200)
basic.forever(on_forever)
