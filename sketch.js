//Grid Setup
var cols, rows;
var w = 30;
var grid = [];
var current;

var stack = [];

function setup() {
    createCanvas(800, 800);
    //scale the grid correctly to the W value
    cols = floor(width / w);
    rows = floor(height / w);
    //set a frame rate to follow search
    frameRate(30);
    
    //fill grid with cells
    for (var j = 0; j < rows; j++){
        for(var i = 0; i < cols; i++){
            var cell = new Cell(i,j);
            grid.push(cell);
        }
    }
    
    //create a start point
    current = grid[5];
    
}//setup

function draw() {
    background(51);
    
    for(var i = 0; i < grid.length; i++){
        grid[i].show();
    }

    //mark the current cell we are on as true
    current.visited = true;
    //change the color so we can visually see this
    current.highlight();
    
    var next = current.checkNeighbors();
    if (next) {
        next.visited = true;
        
        stack.push(current);
        
        removeWalls(current, next);
        current = next;
    } else if (stack.length > 0) {
        //recursive backtrack happens here
        current = stack.pop();
    }
    
}//draw

function index(i, j){
    
    if(i < 0 || j < 0 || i > cols -1 || j > rows -1){
        return -1;
    }
    return i + j * cols;
}//index

function Cell(i, j){

    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.visited = false;
    
        this.checkNeighbors = function() {
            var neighbors = [];
            
            var top = grid[index(i, j-1)];
            var right = grid[index(i + 1, j)];
            var bottom = grid[index(i, j+1)];
            var left = grid[index(i-1, j)];
            
            if (top && !top.visited){
                neighbors.push(top);
            }
            
            if (right && !right.visited){
                neighbors.push(right);
            }
            
            if (bottom && !bottom.visited){
                neighbors.push(bottom);
            }
                        
            if (left && !left.visited){
                neighbors.push(left);
            }
            
            if (neighbors.length > 0 ){
                var r = floor(random(0, neighbors.length));
                return neighbors[r];
            } else {
                return undefined;
            }
            
        }checkNeightbors
        
        this.highlight = function () {
            var x = this.i*w;
            var y = this.j*w;
            noStroke();
            fill(255, 200, 0, 100);
            rect(x, y, w, w);
        }//highlight
    
    this.show = function() {
        var x = this.i*w;
        var y = this.j*w;
        stroke(255);
             
        if (this.walls[0]) {
          line(x     , y     , x + w , y );
        }
        
        if (this.walls[1]) {
           line(x + w , y     , x + w , y + w );
        }
        
        if (this.walls[2]) {
            line(x + w , y + w , x     , y + w );
        }
        
        if (this.walls[3]) {
            line(x     , y + w , x     , y );
        }
        
        if (this.visited){
            noStroke();
            fill(0, 155, 155, 50);
            rect(x, y, w, w);
        }
    
    
    }//show
}//Cell

function removeWalls(a,b){
    var x = a.i - b.i;
    if ( x === 1){
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (x === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }
    
    var y = a.j - b.j;
     if ( y === 1){
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }
}//removeWalls