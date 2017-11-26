// Christopher Dea
// November 7, 2017
// Credit to Daniel Shiffman 
// Source Video
// 	Part 1: https://www.youtube.com/watch?v=KakpnfDv_f0
// 	Part 2: https://www.youtube.com/watch?v=6s4MJcUyaUE
// 	Part 3: https://www.youtube.com/watch?v=jN-sW-SxNzk
// 	Part 4: https://www.youtube.com/watch?v=CdBXmsrkaPs
// Source Code: https://github.com/CodingTrain/Rainbow-Code/tree/master/CodingChallenges/CC_62_plinko

function Boundary(x, y, w, h) {
	var options = {
		isStatic: true
	}
	this.body = Bodies.rectangle(x, y, w, h, options);
	this.w = w;
	this.h = h;
	World.add(world, this.body);
}

Boundary.prototype.show = function() {
	fill(255);
	stroke(255);
	var pos = this.body.position;
	push();
	translate(pos.x, pos.y);
	rectMode(CENTER);
	rect(0, 0, this.w, this.h);
	pop();
}