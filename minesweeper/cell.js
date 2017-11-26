// Christopher Dea
// Setpember 29, 2017
// Credit to Daniel Shiffman 
// Source Video: https://youtu.be/LFU5ZlrR21E
// Source Code: https://github.com/CodingTrain/Rainbow-Code/tree/master/CodingChallenges/CC_71_minesweeper


function Cell(i, j, w) {
	this.i = i;
	this.j = j;
	this.x = i * w;
	this.y = j * w;
	this.w = w;
	this.neighborCount = 0

	// randomize each cell to either have a mine or not
	this.mine = false;
	this.revealed = false;

}

// displays the cell
Cell.prototype.show = function() {
	stroke(0);
	noFill();
	rect(this.x, this.y, this.w, this.w);

	if (this.revealed) {
		if (this.mine) {

			//displays the cell if it does have a mine.
			fill(color('red'));
			ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
		} 
		else {
			// displays the cell that doesn't have the mine. The -5 is to centerize the number.
			fill(200);
			rect(this.x, this.y, this.w, this.w);
			if (this.neighborCount > 0) {
				textAlign(CENTER);
				fill(0);
		        text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 5);
			}
		}
	}
}

Cell.prototype.countMines = function () {
	// returns -1 of if it is a mine.
	if (this.mine) {
		this.neighborCount = -1;
		return;
	}
	var total = 0;

	// Goes into each cell and counts the number of neighboring mines.
	for (var xOffset = -1; xOffset <= 1; xOffset++) {
		for (var yOffset = -1; yOffset <= 1; yOffset++) {
			var i = this.i + xOffset;
			var j = this.j + yOffset;

			// prevents the function from searching neighboring cells that are off the grid.
			if (i > -1 && i < rows && j > -1 && j < cols) {
				var neighbor = grid[i][j];
				if (neighbor.mine) {
					total ++;
				}
			}
		}
	}
	this.neighborCount = total;
}

// to see if the mouse click is in the parameters of the cell. 
Cell.prototype.contains = function(x, y) {
	return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

// reveals if the cell contains a mine in it.
Cell.prototype.reveal = function(x, y) {
	this.revealed = true;
	if (this.neighborCount == 0) {
		this.floodFill();
	}
}

// if the cell have 0 mines around it, it checks to see if there's other cells with 0 mines and reveals them recursively
// if the neighboring cell contains a number, it reveals it.  
Cell.prototype.floodFill = function() {

	// loop function that checks the neighboring cells. 
	for (var xOffset = -1; xOffset <= 1; xOffset++) {
		for (var yOffset = -1; yOffset <= 1; yOffset++) {
			var i = this.i + xOffset;
			var j = this.j + yOffset;

			// prevents the function from searching neighboring cells that are off the grid.
			if (i > -1 && i < rows && j > -1 && j < cols) {
				var neighbor = grid[i][j];
				// if its not a mine and the cell hasn't been revealed. 
				if (!neighbor.revealed) {
					neighbor.reveal();
				}
			}
		}	
	}
}