// screen width is 256, height is 192

// create the sprite variables outside the setup function so you
// can use them in other functions
let ball, paddleR, paddleL;

let ballSpeed = 1.41;
let scoreL = 0;
let scoreR = 0;

function setup() {
	// code in this function gets run once at the start
	// of the game

	let imgBall = spriteArt(`
..wwww..
.ww..ww.
ww....ww
w......w
w......w
ww....ww
.ww..ww.
..wwww..`);

	let imgPaddle = spriteArt('.wwwwww.\nwwwwwwww\n' + 'ww....ww\n'.repeat(42) + 'wwwwwwww\n.wwwwww.');

	let imgWallDown = spriteArt('w'.repeat(256) + '\n' + 'r'.repeat(256));
	wall = new Sprite(imgWallDown);
	wall.collider = 'static';
	wall.y = 187;

	let imgWallUp = spriteArt('r'.repeat(256) + '\n' + 'w'.repeat(256));
	wall = new Sprite(imgWallUp);
	wall.collider = 'static';
	wall.y = 8;

	// creates a ball in center of the screen
	ball = new Sprite(imgBall);
	ball.x = width / 2;
	ball.y = height / 2;
	ball.diameter = 8;
	ball.bounciness = 1;
	ball.friction = 0;

	paddleL = new Sprite(imgPaddle);
	paddleL.collider = 'kinematic';
	paddleL.x = 11;
	paddleL.y = height / 2;

	paddleR = new Sprite(imgPaddle);
	paddleR.collider = 'kinematic';
	paddleR.x = 245;
	paddleR.y = height / 2;

	ball.vel.x = 1;
	ball.vel.y = 1;

	paddleL.collide(ball, hitL);
	paddleR.collide(ball, hitR);

	text(scoreL, 2, 8);
	text(scoreR, 2, 24);
}

function hitL() {
	log('before: ' + ball.direction);
	if (ball.y > paddleL.y) {
		ball.direction += 20;
	} else {
		ball.direction -= 20;
	}
	log('after: ' + ball.direction);
	correctAngle();
	ballSpeed += 0.1;
	ball.speed = ballSpeed;
}

function hitR() {
	log('before: ' + ball.direction);
	if (ball.y > paddleL.y) {
		ball.direction += 20;
	} else {
		ball.direction -= 20;
	}
	log('after: ' + ball.direction);
	correctAngle();
	ballSpeed += 0.1;
	ball.speed = ballSpeed;
}

function correctAngle() {
	if (ball.direction > 70 && ball.direction <= 90) {
		ball.direction = 70;
		log('correction: ' + ball.direction);
	}
	if (ball.direction < -70 && ball.direction >= -90) {
		ball.direction = -70;
		log('correction: ' + ball.direction);
	}
	if (ball.direction < 110 && ball.direction > 90) {
		ball.direction = 110;
		log('correction: ' + ball.direction);
	}
	if (ball.direction > -110 && ball.direction < -90) {
		ball.direction = -110;
		log('correction: ' + ball.direction);
	}
}

function draw() {
	// code in this function gets run 60 times per second
	background('b');

	if (kb.pressing('w') && paddleL.y > 15) {
		paddleL.vel.y = -5;
	} else if (kb.pressing('s') && paddleL.y < 204) {
		paddleL.vel.y = 5;
	} else {
		paddleL.vel.y = 0;
	}

	if (kb.pressing('ArrowUp') && paddleR.y > 15) {
		paddleR.vel.y = -5;
	} else if (kb.pressing('ArrowDown') && paddleR.y < 204) {
		paddleR.vel.y = 5;
	} else {
		paddleR.vel.y = 0;
	}

	if (ball.x > 290) {
		scoreL += 1;
		text(scoreL, 2, 8);
		ball.direction = random(110, 250);
		log('serve: ' + ball.direction);
	} else if (ball.x < -34) {
		scoreR += 1;
		text(scoreR, 2, 24);
		ball.direction = random(-70, 70);
		log('serve: ' + ball.direction);
	}

	if (ball.x > 290 || ball.x < -34) {
		ball.x = width / 2;
		ball.y = height / 2;
		ballSpeed = 1.41;
		ball.speed = 1.41;
	}
}
