// Christopher Dea
// Setpember 29, 2017
// Credit to Daniel Shiffman 
// Source Video: https://youtu.be/LFU5ZlrR21E
// Source Code: https://github.com/CodingTrain/Rainbow-Code/tree/master/CodingChallenges/CC_71_minesweeper

var grid;
var rows;
var cols;
var w = 20;
var totalMines = 30;

// creates the grid/ 2D array
function make2DArray(rows, cols) {
	var arr = new Array(rows);
	for (var i = 0; i < arr.length; i++) {
		arr[i] = new Array(cols);
	}
	return arr;
}

function setup() {
    createCanvas(401, 401);
    rows = floor(width / w);
    cols = floor(height / w);
	grid = make2DArray(rows, cols);

	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < cols; j++) {
  		grid[i][j] = new Cell(i, j, w);
		}
	}

	// Pick totalMines spots
	var options = [];
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < cols; j++) {
	  		options.push([i, j]);
		}
	}

	// 
	for (var n = 0; n < totalMines; n++) {
		var index = floor(random(options.length));
		var choice = options[index];
		var i = choice[0];
		var j = choice[1];

		// Deletes that spot so it's no longer an option
		options.splice(index, 1);
		grid[i][j].mine = true;
  	}

	// loops that counts the number of neighboring mines
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < cols; j++) {
	  		grid[i][j].countMines();
		}
	}	
}

function gameOver() {
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < cols; j++) {
	  		grid[i][j].revealed = true;
		}
	}
}

// when the user clicks on a certain cell, it only reveals that particular cell
function mousePressed() {
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < cols; j++) {
	  		if (grid[i][j].contains(mouseX, mouseY)) {
	  			grid[i][j].reveal();

	  			if (grid[i][j].mine) {
	  				gameOver();
	  			}
	  		}
		}
	}
}

// draws the game.
function draw() {
	background(255);
	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < cols; j++) {
	  		grid[i][j].show();
		}
	}
}