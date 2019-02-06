var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var canvasHeight = canvas.height;
var canvasWidth = canvas.width;

var snakeWidth = 10;
var snakeHeight = 10;

var snakeX = canvas.width/2;
var snakeY = canvas.height-100;

var snakeDirection = 'NORTH';

var dx = 10;
var dy = -10;

document.addEventListener('keydown', moveSnake, true);

function moveSnake(e) {

	if(e.keyCode == 37) {
		snakeDirection = 'WEST';
	}

	if(e.keyCode == 38){
		snakeDirection = 'NORTH';
	}
	if(e.keyCode == 39) {
		snakeDirection = 'EAST';
	}			
	if(e.keyCode == 40) {
		snakeDirection = 'SOUTH';
	}		

}

function startMove() {
	if(snakeDirection == 'NORTH'){
		snakeY += dy;
	}
	
	if(snakeDirection == 'EAST'){
		snakeX += dx;
	}
	
	if(snakeDirection == 'SOUTH'){
		snakeY  -= dy;
	}
	
	if(snakeDirection == 'WEST'){
		snakeX -= dx;
	}
	
}

function drawSnake(){
	//draw start of snake
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.rect(snakeX, snakeY, snakeWidth, snakeHeight);
	ctx.fillStyle = "yellow";
	ctx.fill();
	ctx.closePath();

	startMove();
	
	collisionDetection();


}

function collisionDetection() {
	//collision detection
	if(snakeY + dy < 0 || snakeY + dy > canvas.height || snakeX + dx < 0 || snakeX + dx > canvas.width) { 
		
		document.removeEventListener('keydown', moveSnake, true);
		//document.write("collision Detected: "+snakeDirection);
		clearInterval(interval);

		gameOver();
	}
}

var aspectRatio = (canvas.width/canvas.height);
var dbWidth = 250;
var dbHeight = (dbWidth/aspectRatio);

console.log(aspectRatio);
console.log(dbHeight);

function gameOver() {
	var txt = "Game Over";
	var txtWidth = ctx.measureText(txt);
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.rect((canvas.width-dbWidth)/2, (canvas.height-dbHeight)/2, dbWidth, dbHeight);
	ctx.fillStyle = "lightblue";
	ctx.fill();
	ctx.font = "16px arial";
	ctx.fillStyle = "black";
	ctx.fillText(txt, (canvas.width - txtWidth.width)/2, canvas.height/2); 
	ctx.closePath();
}

var interval = setInterval(drawSnake, 200);
