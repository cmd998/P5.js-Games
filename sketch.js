// Christopher Dea
// Setpember 29, 2017
// Credit to Daniel Shiffman & strikemike2k
// Source Video: https://www.youtube.com/watch?v=AaGK-fj-BAM
// Source Code: https://github.com/CodingTrain/Rainbow-Code/tree/master/CodingChallenges/CC_03_Snake_game_p5.js

var snake;
var snack = [];
var movement = [];
var pixelSize = 20;
var highscore = 0;
var gameState = 'init';

function setup() {
    createCanvas(600, 600);
    frameRate(10);
}

// welcome screen
function initGame() {
	background(51);
	var name = 'Snake Game';
	textSize(50);
	fill(255);
	nameWidth = textWidth(name);
	text(name, (width - nameWidth) / 2, height / 2 - 40);
	startButton = createButton('Start Game');
	startButton.position(width/2 - startButton.width/2, height/2);
	startButton.mousePressed(startGame);
	noLoop();
}

function startGame() {
	removeElements();
	gameState = 'active';
	snake = new Snake;
	foodLocation(1);
	loop();
}

function runGame() {
	background(51);
	textSize(12);
	fill(255);
	text("score: " + snake.tail.length*100, 1, 10);
	text("highscore: " + highscore*100, 1, 24);
	
	snake.update();
	snake.show();
	snake.death();
	fill(255, 0, 100);


	for(var i=0; i < snack.length;i++){
		rect(snack[i].x, snack[i].y, pixelSize, pixelSize);
		if(snake.eat(snack[i])){
			snake.tail.push(createVector(snake.x, snake.y));
			snack.splice(i, 1);
			foodLocation(1);
			if(snake.tail.length > highscore) highscore = snake.tail.length;
		}	
	}
}

function endGame() {
	background(51);
	textSize(32);
	var message = 'Game Over';
	var score = 'Your Score is: ' /*+ (snake.tail.length * 100)*/;
	messageWidth = textWidth(message);
	scoreWidth = textWidth(score);
	fill(255);
	text(message, (width - messageWidth) / 2, height / 2 - 40);
	text(score, (width - scoreWidth) / 2, height / 2);
	startButton = createButton('Restart Game');
	startButton.position(width/2 - startButton.width/2, height/2 + 40);
	startButton.mousePressed(startGame);
	noLoop();

}

function foodLocation(num){
  var cols = floor(width / pixelSize);
  var rows = floor(height / pixelSize);
  for(var i=0;i<num;i++){
    var location = createVector(floor(random(cols)), floor(random(rows))).mult(pixelSize);
    while(snakeIntersect(location)){
      location = createVector(floor(random(cols)), floor(random(rows))).mult(pixelSize);
    }
    snack.push(location);
  }
}

  function snakeIntersect(location){
	var intersect = false;
	if(location.x == snake.pos.x && location.y == snake.pos.y) {
		intersect = true;
	}
	else {
		for(var i=0;i<snake.tail.length;i++){
			if(location.x == snake.tail[i].x && location.y == snake.tail[i].y) {
				intersect = true;
				break;
			}
		}
		for(var i=0;i<snack.length;i++){
			if(location.x == snack[i].x && location.y == snack[i].y) {
				intersect = true;
				break;
			}
		}
	}
	return intersect;
}

function draw() {
	if(gameState == 'init'){
		initGame();
	}
	else if(gameState == 'active'){
		runGame();
	}
	else if(gameState == 'gameOver'){
		endGame();
	}
}

function keyPressed(){
	if(keyCode === DOWN_ARROW){
	movement.push([0, 1]);
	}else if(keyCode === UP_ARROW){
	movement.push([0, -1]);
	}else if(keyCode === LEFT_ARROW){
	movement.push([-1, 0]);
	}else if(keyCode === RIGHT_ARROW){
	movement.push([1, 0]);
	}
}