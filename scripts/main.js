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

var foodX;
var foodY;
var foodSize = 10;

var aspectRatio = (canvas.width/canvas.height);
var dbWidth = 250;
var dbHeight = (dbWidth/aspectRatio);


var score = 0;

var interval = setInterval(drawSnake, 200);
document.addEventListener('keydown', moveSnake, true);

function restartGame(e){
	if(e.keyCode == 82 ){
		//reload page
		document.location.reload();
	}
}

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
	drawFood();
	collisionDetection();
	
}




function collisionDetection() {
	if(snakeY + dy < 0 || snakeY + dy > canvas.height || snakeX + dx < 0 || snakeX + dx > canvas.width) { 
		document.removeEventListener('keydown', moveSnake, true);
		clearInterval(interval);
		gameOver();
	}
	
	if(snakeY == foodY && snakeX == foodX){
		score++;
		randomFoodPos();
		
	}
}

function gameOver() {
	var txtArr = ["Game Over!", "Press the r key to restart.","You managed to eat "+score+" apples."];
	var lineHeight = 18;

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.rect((canvas.width-dbWidth)/2, (canvas.height-dbHeight)/2, dbWidth, dbHeight);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.font = "16px arial";
	ctx.fillStyle = "black";

	for (i = 0; i < txtArr.length; i++){
		var txtWidth = ctx.measureText(txtArr[i]);
		if(i == 0){
			ctx.fillText(txtArr[i], (canvas.width/2 - txtWidth.width/2) , (canvas.height/2)-lineHeight); 
		} else {
			ctx.fillText(txtArr[i], (canvas.width/2 - txtWidth.width/2), (canvas.height/2)+lineHeight*i);
		}
	}

	
	
	
	ctx.closePath();
	
	document.addEventListener('keydown', restartGame, true);
}

function getRndInteger(min, max){
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function drawFood () {
	//draw food on the screen 
	//ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.rect(foodX, foodY, foodSize, foodSize); //x, y, width, height
	ctx.fillStyle = "red";
	ctx.fill();
	ctx.closePath();
	drawScore();
}

function randomFoodPos () {
	var randFoodX = getRndInteger(foodSize,canvasWidth-foodSize);
	var randFoodY = getRndInteger(foodSize,canvasHeight-foodSize);
	foodX = Math.round(randFoodX/10) * 10;
	foodY = Math.round(randFoodY/10) * 10;

}

function drawScore() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "white";
	ctx.fillText("Apples eaten: "+score, 8, 20);
}

randomFoodPos(); 



