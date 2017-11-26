// Christopher Dea
// November 7, 2017
// Credit to Daniel Shiffman 
// Source Video
// 	Part 1: https://www.youtube.com/watch?v=KakpnfDv_f0
// 	Part 2: https://www.youtube.com/watch?v=6s4MJcUyaUE
// 	Part 3: https://www.youtube.com/watch?v=jN-sW-SxNzk
// 	Part 4: https://www.youtube.com/watch?v=CdBXmsrkaPs
// Source Code: https://github.com/CodingTrain/Rainbow-Code/tree/master/CodingChallenges/CC_62_plinko

//module aliases
var Engine = Matter.Engine,
	Events = Matter.Events,
	World = Matter.World,
	Bodies = Matter.Bodies;

var engine;
var world;
var particles = [];
var pegs = [];
var boundary =[];
var cols = 10;
var rows = 11;
var ding;

function preload() {
	//ding = loadsound('ding.mp3');
}

function setup() {
	createCanvas(600, 700);
	colorMode(HSB);
	engine =Engine.create();
	world = engine.world;
	//world.gravity.y = 2;

	function collision(event) {
		var pairs = event.pairs;
		for (var i = 0; i < pairs.length; i++) {
			var labelA = pairs[i].bodyA.label;
			var labelB = pairs[i].bodyB.label;
			if (labelA == 'particle' && labelB == 'peg') {
			//ding.play();
			}
			if (labelA == 'peg' && labelB == 'particle') {
			//ding.play();
			}
		}
	}

  Events.on(engine, 'collisionStart', collision);

	newParticle();
	var spacing = width / cols;

	//creates the pegs on the board
	for (var j = 0; j < cols; j++) {
		for (var i = 0; i < rows; i++) {
			var x = i * spacing;
			if (j % 2 == 1) {
				x += spacing / 2
			}
			
			var y = spacing + j * spacing;
			// changes pegs size and position
			var p = new Pegs(x, y, 7);
			pegs.push(p);
		}
	}
	// bottom boundary
	var b = new Boundary(width / 2, height + 50, width, 100);
	boundary.push(b);

	//boundaries for the buckets
	for (var i = 0; i < cols + 2 ; i++) {
		var x = i * spacing;
		var h = 60;
		var w = 10;
		var y = height - h / 2;
		var b = new Boundary(x, y, w, h);
		boundary.push(b);
	}
}

//draws a new particle on the screen
function newParticle () {
	var p = new Particle (300, 0, 10);
	particles.push(p);

}
function draw () {
	background(0, 0, 0);
	//adds a new particle every 60 frames (~2 sec)
	if (frameCount % 20 == 0) {
		newParticle();
	}

	Engine.update(engine, 15);
	for(var i = 0; i < particles.length; i++) {
		particles[i].show();
		//if particle is out of the world, remove it from the world, delete it from the array and go back one. 
		if (particles[i].isOffScreen()) {
			World.remove(world, particles[i].body);
			particles.splice(i, 1);
			i--;
		}
	}
	for(var i = 0; i < pegs.length; i++) {
		pegs[i].show();
	}

	for(var i = 0; i < boundary.length; i++) {
		boundary[i].show();
	}
}