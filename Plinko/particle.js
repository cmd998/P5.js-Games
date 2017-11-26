// Christopher Dea
// November 7, 2017
// Credit to Daniel Shiffman 
// Source Video
// 	Part 1: https://www.youtube.com/watch?v=KakpnfDv_f0
// 	Part 2: https://www.youtube.com/watch?v=6s4MJcUyaUE
// 	Part 3: https://www.youtube.com/watch?v=jN-sW-SxNzk
// 	Part 4: https://www.youtube.com/watch?v=CdBXmsrkaPs
// Source Code: https://github.com/CodingTrain/Rainbow-Code/tree/master/CodingChallenges/CC_62_plinko

function Particle(x, y, r) {
	this.hue = random(360);
	var options = {
		restitution: 0.5,
		friction: 0,
		density: 0.5
	}
	//the deviation on where the ball is going to spawn
	x += random(-250, 250);
	this.body = Bodies. circle(x, y, r, options);
	this.body.label = "particle";
	this.r = r;
	World.add(world, this.body);
}

// deletes the ball if it's off screen
Particle.prototype.isOffScreen = function() {
	var x = this.body.position.x;
	return (x <-50 || x > width + 50);
}

//displays the ball
Particle.prototype.show = function() {
	fill(this.hue, 255, 255);
	noStroke();
	var pos = this.body.position;
	push();
	translate(pos.x, pos.y);
	ellipse(0, 0, this.r *2);
	pop();
}