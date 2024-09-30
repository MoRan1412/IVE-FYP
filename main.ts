function avoidObstacle () {
    if (distance < 500) {
        avoidDir = 0
        controlMotors(1)
    } else {
        avoidDir = 1
        controlMotors(0)
    }
}
// Function to receive direction from Raspberry Pi and control motors
function receiveData () {
    receivedData = serial.readLine()
    // Check if data starts with "direction:"
    if (receivedData.indexOf("direction:") == 0) {
        // Extract the direction value
        waterDir = parseFloat(receivedData.substr(10, 5))
    }
}
// Function to control motors based on direction
function controlMotors (dir: number) {
    if (dir == 0) {
        // Move forward
        basic.showArrow(ArrowNames.North)
        robotbit.MotorRunDual(
        robotbit.Motors.M1A,
        150,
        robotbit.Motors.M1B,
        150
        )
    } else if (dir == 1) {
        // Turn left
        basic.showArrow(ArrowNames.West)
        robotbit.MotorRunDual(
        robotbit.Motors.M1A,
        0,
        robotbit.Motors.M1B,
        150
        )
    } else if (dir == 2) {
        // Turn right
        basic.showArrow(ArrowNames.East)
        robotbit.MotorRunDual(
        robotbit.Motors.M1A,
        150,
        robotbit.Motors.M1B,
        0
        )
    } else if (dir == 3) {
        // Move backward
        basic.showArrow(ArrowNames.South)
        robotbit.MotorRunDual(
        robotbit.Motors.M1A,
        150,
        robotbit.Motors.M1B,
        150
        )
    } else {
        // Stop motors
        basic.clearScreen()
        robotbit.MotorRunDual(
        robotbit.Motors.M1A,
        0,
        robotbit.Motors.M1B,
        0
        )
    }
}
let receivedData = ""
let distance = 0
let avoidDir = 0
let waterDir = 0
// Set up serial communication to USB or pins
serial.redirectToUSB()
waterDir = 0
avoidDir = 0
basic.showIcon(IconNames.Yes)
// Main loop
basic.forever(function () {
    distance = sonar.ping(
    DigitalPin.P0,
    DigitalPin.P1,
    PingUnit.MicroSeconds
    )
    avoidObstacle()
    basic.pause(200)
})
