const DEBUG = false;

var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var canvasHeight = canvas.height;
var canvasWidth = canvas.width;

var snakeWidth = 10;
var snakeHeight = 10;

var snakeDirection = 'UP';

var goingLeft = false;
var goingRight = false;
var goingUp = true;
var goingDown = false;

var snake = {
	body: [
		{
			x:canvas.width/2, 
			y:canvas.height-130
		},
		{
			x:canvas.width/2, 
			y:canvas.height-120
		},
		{
			x:canvas.width/2, 
			y:canvas.height-110
		},		
		{
			x:canvas.width/2, 
			y:canvas.height-100
		}
	]
};

var dx = 10;
var dy = -10;

var foodX;
var foodY;
var foodSize = 10;

var aspectRatio = (canvas.width/canvas.height);
var dbWidth = 250;
var dbHeight = (dbWidth/aspectRatio);


var score = 0;

var interval = setInterval(drawSnake, DEBUG ? 400 : 200);

document.addEventListener('keydown', moveSnake, true);

function restartGame(e){
	if(e.keyCode == 82 ){
		//reload page
		document.location.reload();
	}
}

function moveSnake(e) {

	if(e.keyCode == 37 && !goingRight) {
		snakeDirection = 'LEFT';
	}

	if(e.keyCode == 38 && !goingDown){
		snakeDirection = 'UP';
	}
	if(e.keyCode == 39 && !goingLeft) {
		snakeDirection = 'RIGHT';
	}			
	if(e.keyCode == 40 && !goingUp) {
		snakeDirection = 'DOWN';
	}		

}

function startMove() {
	
	var snakeCopy = JSON.parse(JSON.stringify(snake));
	
	if(snakeDirection == 'UP'){
		snake.body[0].y += dy;
		goingRight = false;
		goingUp = true;
		goingDown = false;
		goingLeft = false;
	}
	
	if(snakeDirection == 'RIGHT'){
		snake.body[0].x += dx;
		goingRight = true;
		goingUp = false;
		goingDown = false;
		goingLeft = false;
	}
	
	if(snakeDirection == 'DOWN'){
		snake.body[0].y  -= dy;
		goingRight = false;
		goingUp = false;
		goingDown = true;
		goingLeft = false;
	}
	
	if(snakeDirection == 'LEFT'){
		snake.body[0].x -= dx;
		goingRight = false;
		goingUp = false;
		goingDown = false;
		goingLeft = true;
	}
	
	
	for(i=1; i < snake.body.length; i++){
		//set x and y coordinates to old parent x and y coordinates
		snake.body[i].y = snakeCopy.body[i-1].y;
		snake.body[i].x = snakeCopy.body[i-1].x;
	}
	
	 
//	console.log("snake last X: ", snake.body[snake.body.length-1].x);
//	console.log("snake head X: ", snake.body[0]);
	
}

function drawSnake(){
	//draw start of snake
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	
	for(var i=0; i < snake.body.length; i++){
		ctx.beginPath();
		ctx.fillStyle = "purple";
		ctx.strokeStyle = "white";
		ctx.strokeRect(snake.body[i].x, snake.body[i].y, snakeWidth, snakeHeight);
		ctx.rect(snake.body[i].x, snake.body[i].y, snakeWidth, snakeHeight);
		ctx.lineWidth = 1.5;	
		ctx.fill();
		ctx.closePath();
		
	}



	
	startMove();
	drawFood();
	collisionDetection();	
}




function collisionDetection() {
	if(snake.body[0].y  < 0 || snake.body[0].y > (canvas.height - snakeHeight) || snake.body[0].x < 0 || snake.body[0].x > ( canvas.width - snakeHeight)) { 
		document.removeEventListener('keydown', moveSnake, true);
		clearInterval(interval);
		gameOver();
	}
	
	if(snake.body[0].y == foodY && snake.body[0].x == foodX){
		score++;
		randomFoodPos();
		addTailPiece();
	}
	
	for(var i = 1; i < snake.body.length; i++){
		if(snake.body[0].x === snake.body[i].x && snake.body[0].y === snake.body[i].y ){
			console.log("HIT ITSELF");
			
			clearInterval(interval);
			gameOver();
		}
	}
}

function addTailPiece(){
	var lastY = snake.body[snake.body.length - 1].y;
	var headY = snake.body[0].y;	
	var lastX = snake.body[snake.body.length - 1].x;
	var headX = snake.body[0].x;
	
	if(snakeDirection == 'DOWN'){
		if(lastX !== headX){
			console.log("body moving DIFFERENT direction to head");
			snake.body.push({x:snake.body[snake.body.length-1].x, y:snake.body[snake.body.length-1].y});
		} else {
			snake.body.push({x:snake.body[snake.body.length-1].x, y:snake.body[snake.body.length-1].y - 10});
		}
	}	
	
	if(snakeDirection == 'UP'){
		if(lastX !== headX){
			console.log("body moving DIFFERENT direction to head");
			snake.body.push({x:snake.body[snake.body.length-1].x, y:snake.body[snake.body.length-1].y});
		} else {
			snake.body.push({x:snake.body[snake.body.length-1].x, y:snake.body[snake.body.length-1].y + 10});
		}
	}
	
	if(snakeDirection == 'LEFT'){
		if(lastY !== headY){
			console.log("body moving DIFFERENT direction to head");
			snake.body.push({x:snake.body[snake.body.length-1].x, y:snake.body[snake.body.length-1].y});
		} else {
			snake.body.push({x:snake.body[snake.body.length-1].x + 10, y:snake.body[snake.body.length-1].y});
		}
	}	
	
	if(snakeDirection == 'RIGHT'){
		if(lastY !== headY){
			console.log("body moving DIFFERENT direction to head");
			snake.body.push({x:snake.body[snake.body.length-1].x, y:snake.body[snake.body.length-1].y});
		} else {
			snake.body.push({x:snake.body[snake.body.length-1].x - 10, y:snake.body[snake.body.length-1].y});
		}
	}	
}


function gameOver() {
	var txtArr = ["Game Over!", "Press the r key to restart.","You managed to eat "+score+" apples."];
	var lineHeight = 18;

	//ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.rect((canvas.width-dbWidth)/2, (canvas.height-dbHeight)/2, dbWidth, dbHeight);
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.font = "16px arial";
	ctx.fillStyle = "black";

	for (var i = 0; i < txtArr.length; i++){
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
	ctx.beginPath();
	ctx.fillStyle = "red";
	ctx.strokeStyle = "yellow";	
	ctx.strokeRect(foodX, foodY, foodSize, foodSize);
	ctx.rect(foodX, foodY, foodSize, foodSize); 
	ctx.fill();
	ctx.closePath();
	drawScore();
}

function randomFoodPos () {
	var randFoodX = getRndInteger(foodSize,canvasWidth-foodSize);
	var randFoodY = getRndInteger(foodSize,canvasHeight-foodSize);
	foodX = Math.round(randFoodX/10) * 10;
	foodY = Math.round(randFoodY/10) * 10;
	
	for(var i = 0; i < snake.body.length; i++){
		var foodInSnakePos = snake.body[i].x == foodX && snake.body[i].y == foodY;
		if(foodInSnakePos){
			randomFoodPos();
			console.log("re-generate food");
		} 
	}

}

function drawScore() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "white";
	ctx.fillText("Apples eaten: "+score, 8, 20);
}

if(DEBUG === false) {
	randomFoodPos(); 	
} else {
	foodX = snake.body[0].x;
	foodY = snake.body[0].y - 80;
}





