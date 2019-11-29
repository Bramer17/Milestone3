var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var gridSize = 16;
var count = 0;
var score = 0;

var food = {
  x: 320,
  y: 320
};

var worm = {
  x: 320,
  y: 320,
  
  // speed
  wx: gridSize,
  wy: 0,
  
  // grids Worm occupies
  cells: [],
  
  // Worm length
  maxCells: 2
};

// get random numbers
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// game loop
function Game() {
  requestAnimationFrame(Game);

  // slow game loop
  if (++count < 5) {
    return;
  }
  count = 0;
  context.clearRect(0,0,canvas.width,canvas.height);

  // move snake by speed
  worm.x += worm.wx;
  worm.y += worm.wy;

  // position vertically 
  if (worm.y < 0) {
    worm.y = canvas.height - gridSize;
  }
  else if (worm.y >= canvas.height) {
    worm.y = 0;
  }
  // wrap position horizontally 
  if (worm.x < 0) {
    worm.x = canvas.width - gridSize;
  }
  else if (worm.x >= canvas.width) {
    worm.x = 0;
  } 
  

  // where snakes been.
  worm.cells.unshift({x: worm.x, y: worm.y});

  // remove cells 
  if (worm.cells.length > worm.maxCells) {
    worm.cells.pop();
  }

  // draw apple
  context.fillStyle = 'purple';
  context.fillRect(food.x, food.y, gridSize-1, gridSize-1);

  // score
    context.fillStyle = 'Black';    
    var foodScore = "Score " + score;
    
      context.fillText(foodScore, 10, canvas.height-380);
    

  // draw snake 
  context.fillStyle = 'blue';
  worm.cells.forEach(function(cell, index) {     
    context.fillRect(cell.x, cell.y, gridSize-1, gridSize-1);  
 
    
    // snake ate apple
    if (cell.x === food.x && cell.y === food.y) {
      worm.maxCells++;
      score ++;     
      food.x = getRandomInt(0, 25) * gridSize;
      food.y = getRandomInt(0, 25) * gridSize;
    }
    
    // check collision 
    for (var i = index + 1; i < worm.cells.length; i++) {      
      // reset game
      
      if (cell.x === worm.cells[i].x && cell.y === worm.cells[i].y) {
       console.log(foodScore);
        worm.x = 320;
        worm.y = 320;
        worm.cells = [];
        worm.maxCells = 2;
        worm.wx = gridSize;
        worm.wy = 0;
        score = 0;
        food.x = getRandomInt(0, 25) * gridSize;
        food.y = getRandomInt(0, 25) * gridSize;          
      }
    }
  });
}
// keyboard events 
window.addEventListener('keydown', function(d) {  
  
  // left 
  if (d.which === 37 && worm.wx === 0) {
    worm.wx = -gridSize;
    worm.wy = 0;
  }
  // up 
  else if (d.which === 38 && worm.wy === 0) {
    worm.wy = -gridSize;
    worm.wx = 0;
  }
  // right 
  else if (d.which === 39 && worm.wx === 0) {
    worm.wx = gridSize;
    worm.wy = 0;
  }
  // down 
  else if (d.which === 40 && worm.wy === 0) {
    worm.wy = gridSize;
    worm.wx = 0;
  }
});


// start the game
requestAnimationFrame(Game);
