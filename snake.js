// Fő változók
const Game = {};
const Keyboard = {};
const Component = {};

// Irány billentyűk megadása
Keyboard.Keymap = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
};

// Billenytű események
Keyboard.ControllerEvents = function() {
    const self = this;
    this.pressKey = null;
    this.keymap = Keyboard.Keymap;

    // Billentyű lenyomás figyelése
    document.addEventListener ('keydown', (e) => {
        const key = e.keyCode;
    console.log("pressKey", key);
     })
    // Az utoljára lenyomott billenytű lekérése

    this.getKey = function() {
        return this.keymap[this.pressKey]
    }
}
const ce = new Keyboard.ControllerEvents();

