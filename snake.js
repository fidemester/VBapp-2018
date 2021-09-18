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
Keyboard.ControllerEvents = function () {
    const self = this;
    this.pressKey = null;
    this.keymap = Keyboard.Keymap;

    // Billentyű lenyomás figyelése
    document.addEventListener('keydown', (e) => {
        const key = e.keyCode;
        console.log("pressKey", key);
    })
    // Az utoljára lenyomott billenytű lekérése

    this.getKey = function () {
        return this.keymap[this.pressKey]
    }
}
const ce = new Keyboard.ControllerEvents();

//Játéktér

Component.Stage = function (canvas, conf) {
    // settings
    this.keyEvent = new Keyboard.ControllerEvents();
    this.width = canvas.width;
    this.height = canvas.height;
    this.length = [];
    this.food = {};
    this.score = 0;
    this.direction = 'right';
    this.conf = {
        cw: 10,
        size: 5,
        fps: 100,
    };
};

// Kígyó

Component.Snake = function (canvas, conf) {
    // a kígyó mozgástere
    this.stage = new Component.Stage(canvas, conf)

    // kígyó inicializálása

    this.initSnake = function () {
        for (let i = 0; i < this.stage.conf.size; i++) {
            this.stage.length.push({ x: i, y: 0 });

        }
    };
    this.initSnake();

    // étel inicializálása
    this.initFood = function () {
        this.stage.food = {
            x: 30,
            y: 50
        }
    }
    this.initFood();

    // Játék újraindítása

    this.restart = function () {
        this.stage.length = [];
        this.stage.food = {};
        this.stage.score = 0;
        this.stage.direction = 'right';
        this.stage.keyEvent.pressKey = null;
        this.initSnake();
        this.initFood();
    };
};

// Rajzolás

Game.Draw = function (context, snake) {
    this.drawStage = function () {
        const keyPress = snake.stage.keyEvent.getKey();
        if (typeof keyPress != 'undefined') {
            snake.stage.direction = keyPress;
        }
        // játék háttere kék
        context.fillStyle = "blue";
        context.fillRect(0, 0, snake.stage.width, snake.stage.height)

        // A kígyó poziciója

        const nx = snake.stage.length[0].x;
        const ny = snake.stage.length[0].y;

        // A pozició változatatása a haladási irányban
        switch (snake.stage.direction) {
            case 'right': nx++;
                break;
            case 'left': nx--;
                break;
            case 'up': ny--;
                break;
            case 'down': ny++;
        }

        // Ütközés figyelése
        if(this.collision (nx,ny)){
            snake.restart();
            return;
        }

        // A kígyó etetése
    if(nx == snake.stage.food.x && ny==snake.stage.food.x ){
        const tail = {x:nx, y:ny};
        snake.stage.score++;
        snake.initFood();
    }
    else{
        var tail = snake.stage.length.pop();
        tail.x = nx;
        tail.y = ny;
    }
    snake.stage.length.unshift(tail);

    // Kígyó kirajzolása
    for (let i=0; i< snake.stage.length.length; i++){
        const cell = snake.stage.stage.length[i];
        this.drawCell(cell.x, cell.y);
    }

    // Eledel rajzolása
    this.drawCell(snake.stage.food.x, snake.stage.food.y);

    // Pontszám
    context.fillText('Score:' + snake.stage.score, 5, (snake.stage.height-5))
    };

    // cella rajzolása
    this.drawCell = function(x,y) {
        context.fillStyle = 'rgb(170,170,170)';
        context.beginPath();
        context.arc(
            x*snake.stage.conf.cw + 6,
            y*snake.stage.conf.cw + 6,
            4,
            0,
            2*Math.PI,
            false
        );
        context.fill();
    }

    // Ütközés megállapítása

    this.collision = function(nx, ny){
        if(nx == -1 || nx == (snake.stage.width / snake.stage.conf.cw) || 
            ny == -1 || ny == (snake.stage.height / snake.stage.conf.cw)){
                return true
            }
            else {
                return false
            }
    }
}
