// Christopher Dea
// Setpember 29, 2017
// Credit to Daniel Shiffman & strikemike2k
// Source video: https://www.youtube.com/watch?v=AaGK-fj-BAM
// Source Code: https://github.com/CodingTrain/Rainbow-Code/tree/master/CodingChallenges/CC_03_Snake_game_p5.js


function Snake() {
	this.x = 0;
	this.y = 0;
	this.xspeed = 1;
	this.yspeed = 0;
	this.total = 0;
	this.tail = [];

	//direction of the snake
	this.dir = function (x, y) {
		this.xspeed = x;
		this.yspeed = y;
	}

	this.update = function() {
		//move snake's position into tail and pop off the end
		if(movement.length){
			if(snake.xspeed != movement[0][0]*-1 && snake.yspeed != movement[0][1]*-1){
				snake.dir(movement[0][0], movement[0][1]);
			}
		movement.splice(0, 1);
		}

		this.tail.unshift(createVector(this.pos.x, this.pos.y));
		this.tail.pop();

		//moves the snake
	    this.x = this.x + this.xspeed * pixelSize;
	    this.y = this.y + this.yspeed * pixelSize;

	}	

	 this.death = function() {
	    if(this.pos.x >= width || this.pos.y >= height || this.pos.x < 0 || this.pos.y < 0){
	    	gameState = 'gameOver';
	    }
	    for(var i=0;i<this.tail.length;i++){
	      if(this.tail[i].x == this.pos.x && this.tail[i].y == this.pos.y){
	      	gameState = 'gameOver';
	      }
	    }
	  }

	this.show = function (){
		fill(255);

		// draws the snake's tail
		for (var i = 0; i < this.tail.length; i++) {
			rect(this.tail[i].x, this.tail[i].y, pixelSize, pixelSize);
		}
		// draws the snake's head
		rect(this.x, this.y, pixelSize, pixelSize);
	}

	//
	this.eat = function(pos) {
	    return this.pos.x == pos.x && this.pos.y == pos.y;
	}

	// rests the game 
	this.reset = function(){
	    food = 0;
	    this.tail = [];
	    this.pos = createVector(0, 0);
	    this.speed = createVector(1, 0);
  	}

  	this.reset();
}	 
