var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var canvasHeight = canvas.height;
var canvasWidth = canvas.width;

var snakeWidth = 10;
var snakeHeight = 10;

var snakeDirection = 'NORTH';

var snake = {
	body: [
		{
			x:canvas.width/2, 
			y:canvas.height-100
		},
		{
			x:canvas.width/2, 
			y:canvas.height-110
		},
		{
			x:canvas.width/2, 
			y:canvas.height-120
		},		
		{
			x:canvas.width/2, 
			y:canvas.height-130
		}
	]
}

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
	
	var snakeCopy = Object.assign({}, snake);
	//var snakeCopy = snake.body.slice();
	
	if(snakeDirection == 'NORTH'){
		snake.body[0].y += dy;
	}
	
	if(snakeDirection == 'EAST'){
		snake.body[0].x += dx;
	}
	
	if(snakeDirection == 'SOUTH'){
		snake.body[0].y  -= dy;
	}
	
	if(snakeDirection == 'WEST'){
		snake.body[0].x -= dx;
	}
	
	
	for(i=1; i < snake.body.length; i++){
		//set x and y coordinates to old parent x and y coordinates
		snake.body[i].x = snakeCopy.body[i].x;
		snake.body[i].y = snakeCopy.body[i].y;
	}

	console.log("original Snake HEAD ", snake.body[0]);
	console.log("snakeCopy HEAD ", snakeCopy[0]);
	console.log("-------------------------------------");
	console.log("");
	console.log(">>> original snake HEAD + 1", snake.body[1]);
	console.log(">>> snakeCopy HEAD + 1", snakeCopy[1]);
	console.log("::::::::::::::::::::::::::::::::::::::");
	console.log("");
	console.log(">>> original snake HEAD + 2", snake.body[2]);
	console.log(">>> snakeCopy HEAD + 2", snakeCopy[2]);
	console.log("::::::::::::::::::::::::::::::::::::::");
	console.log("");
	console.log(">>> original snake HEAD + 3", snake.body[3]);
	console.log(">>> snakeCopy HEAD + 3", snakeCopy[3]);
	console.log("::::::::::::::::::::::::::::::::::::::");
	console.log("");
}


function drawSnake(){
	//draw start of snake
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	
	for(var i=0; i < snake.body.length; i++){
		ctx.rect(snake.body[i].x, snake.body[i].y, snakeWidth, snakeHeight);
	}
		
	ctx.fillStyle = "yellow";
	ctx.fill();
	ctx.closePath();
	
	startMove();
	drawFood();
	collisionDetection();
	
}




function collisionDetection() {
	if(snake.body[0].y + dy < 0 || snake.body[0].y + dy > canvas.height || snake.body[0].x + dx < 0 || snake.body[0].x + dx > canvas.width) { 
		document.removeEventListener('keydown', moveSnake, true);
		clearInterval(interval);
		gameOver();
	}
	
	if(snake.body[0].y == foodY && snake.body[0].x == foodX){
		score++;
		randomFoodPos();
		//snakeHeight = snakeHeight + 10;
	//snake.body.push({x:0, y:0});
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



