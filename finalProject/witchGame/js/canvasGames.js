// components
var gamePiece;
var myBackground;
var myObstacles = [];
var score;
var gameOverText;

function startGame() {
    document.getElementById("playAgain").style.visibility = "hidden"; 
    gamePiece = new component(100, 50, "media/kiki1.png", 10, 250, "image");
    myBackground = new component(500, 300, "media/cloud2.jpg", 0, 0, "background")
    score = new component("30px", "cursive", "white", 10, 30, "text");
    gameOverText = new component("50px", "cursive", "Black", 110, 170, "text");
    gameArea.start();
}

// creates game area
var gameArea = {
    canvas : document.getElementById("myCanvas"),
    start : function() {
        this.canvas.width = 500;
        this.canvas.height = 300;
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        this.interval = setInterval(updateGame, 20);

        // checks if key is pressed
        window.addEventListener('keydown', function(e){
            gameArea.keys = (gameArea.keys || []);
            gameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function(e){
            gameArea.keys[e.keyCode] = false;
        })

        },

    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    stop : function() {
        clearInterval(this.interval);
    }
}

//Creates the game area
function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image" || type == "background") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = gameArea.context;
        if (type == "image" || type == "background") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
            if(type == "background"){
                ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
            }
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        if(this.type == "text"){
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        }
    }

    // function to change positions
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;     
        
        // checks if the x position has reach the end of the background
        if(this.type == "background"){
            if(this.x == -(this.width)){
                this.x = 0;
            }
        }   
    }

    // function that returns boolean if the pieces crash with obstacles
    this.crashWith = function(otherobj){
        var myLeft = this.x;
        var myRight = this.x + (this.width);
        var myTop = this.y;
        var myBottom = this.y + (this.height);
        var otherLeft = otherobj.x;
        var otherRight = otherobj.x + (otherobj.width);
        var otherTop = otherobj.y;
        var otherBottom = otherobj.y + (otherobj.height);
        var crash = true;
        if((myBottom < otherTop) ||
            (myTop > otherBottom) ||
            (myRight < otherLeft) ||
            (myLeft > otherRight)){
            
            crash = false;
        }
        return crash;
    }
}
// Creates the gameover when collision occurs
function updateGame() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for(i = 0; i < myObstacles.length; i += 1){
        if(gamePiece.crashWith(myObstacles[i])){
            gameArea.stop();
            gameArea.clear();
            myBackground.update();
            score.text = "SCORE: " + gameArea.frameNo;
            score.update();
            gameOverText.text = "GAME OVER";
            gameOverText.update();
            document.getElementById("playAgain").style.visibility = "visible"; 
            return;
        }
    }

    gameArea.clear();
    myBackground.speedX = -1;
    myBackground.newPos();
    myBackground.update();
    gameArea.frameNo += 1;

    //Creates the obstacles
    if(gameArea.frameNo == 1 || everyInterval(110)){
        x = gameArea.canvas.width;
        minHeight = 20;
        maxHeight = 300;
        height = Math.floor(Math.random()*(maxHeight - minHeight + 1) +minHeight);
        minGap = 100;
        maxGap = 300;
        gap = Math.floor(Math.random()*(maxGap - minGap +1) +minGap);
        myObstacles.push(new component(40, height, "#ffdbe7", x, 0));
        myObstacles.push(new component(40, x - height - gap, "#ffdbe7", x, height + gap));
    }
    for(i = 0; i < myObstacles.length; i += 1){
        myObstacles[i].x += -2;
        myObstacles[i].update();
    }

    // update the score
    score.text = "SCORE: " + gameArea.frameNo;
    score.update();

    gamePiece.speedX = 0; 
    gamePiece.speedY = 0; 
    if(gameArea.keys && gameArea.keys[37]){gamePiece.speedX = -2;} //left
    if(gameArea.keys && gameArea.keys[39]){gamePiece.speedX = 2;} // right
    if(gameArea.keys && gameArea.keys[38]){gamePiece.speedY = -2;} // up
    if(gameArea.keys && gameArea.keys[40]){gamePiece.speedY = 2;} // down
    gamePiece.newPos();
    gamePiece.update();
}

function everyInterval(n){
    if((gameArea.frameNo / n) % 1 == 0) {return true;}
        return false;
}