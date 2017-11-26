// Christopher Dea
// November 7, 2017
// Credit to Daniel Shiffman 
// Source Video
// 	Part 1: https://www.youtube.com/watch?v=KakpnfDv_f0
// 	Part 2: https://www.youtube.com/watch?v=6s4MJcUyaUE
// 	Part 3: https://www.youtube.com/watch?v=jN-sW-SxNzk
// 	Part 4: https://www.youtube.com/watch?v=CdBXmsrkaPs
// Source Code: https://github.com/CodingTrain/Rainbow-Code/tree/master/CodingChallenges/CC_62_plinko

function Pegs(x, y, r) {
	var options = {
		restitution: 1,
		friction: 0,
		isStatic: true
	}
	this.body = Bodies. circle(x, y, r, options);
		this.body.label = "peg";
	this.r = r;
	World.add(world, this.body);
}

Pegs.prototype.show = function() {
	fill(255);
	stroke(255);
	var pos = this.body.position;
	push();
	translate(pos.x, pos.y);
	ellipse(0,0, this.r *2);
	pop();
}