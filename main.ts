function bereken_infectiegraad () {
    klad = 0
    for (let index3 = 0; index3 <= 24; index3++) {
        klad = klad + ledjes[index3]
    }
    return 100 - klad / (2.55 * 25)
}
input.onButtonPressed(Button.A, function () {
    if (mondmasker == MONDMASKER_FACTOR) {
        mondmasker = 1
        basic.showIcon(IconNames.Sad)
    } else {
        mondmasker = MONDMASKER_FACTOR
        basic.showIcon(IconNames.Heart)
    }
})
input.onGesture(Gesture.Shake, function () {
    reset()
})
function genees () {
    index2 = randint(0, 24)
    ledjes[index2] = 255
}
function infecteer () {
    index2 = randint(0, 24)
    ledjes[index2] = ledjes[index2] / REDUCTIE
}
function update_scherm () {
    for (let index = 0; index <= 24; index++) {
        x = Math.floor(index / 5)
        y = index % 5
        led.plotBrightness(x, y, ledjes[index])
    }
}
function reset () {
    lockdown = 0
    mondmasker = MONDMASKER_FACTOR
    ledjes = []
    for (let index = 0; index < 25; index++) {
        ledjes.unshift(255)
    }
}
let lockdown = 0
let y = 0
let x = 0
let index2 = 0
let mondmasker = 0
let ledjes: number[] = []
let klad = 0
let MONDMASKER_FACTOR = 0
let REDUCTIE = 0
REDUCTIE = 3
MONDMASKER_FACTOR = 8
reset()
basic.forever(function () {
    if (lockdown == 0 && bereken_infectiegraad() > 70) {
        lockdown = 1
        basic.showString("Lockdown!")
    } else if (lockdown == 1 && bereken_infectiegraad() < 5) {
        lockdown = 0
        basic.showString("Einde lockdown")
    } else {
        if (lockdown == 0) {
            infecteer()
            basic.pause(randint(100 * mondmasker, 250 * mondmasker))
            if (randint(0, 100) < 10 * mondmasker) {
                genees()
            }
        } else {
            genees()
            basic.pause(randint(100 * 1, 250 * 1))
        }
        update_scherm()
    }
})
