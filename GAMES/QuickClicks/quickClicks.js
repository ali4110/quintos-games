const target = `
 .d88b. 
.8P  Y8.
88    88
88    88
 8b  d8 
 'Y88P' `.slice(1);

const imposter = `
 .d33b. 
.3P  Y3.
33    33
33    33
 3b  d3 
 'Y33P' `.slice(1);

/* Part A: find the range of row and column values the target can be placed at */

let targetRow, targetCol;
let times = [];

async function gameOver() {
	erase();
	await alert('Game Over!', 12);
	text(target, targetRow, targetCol);
	await delay(2000);
	times = [];
	start();
}

function calcStats() {
	erase();
	let speeds = [];

	for (let i = 0; i < times.length - 1; i++) {
		speeds[i] = times[i + 1] - times[i];
	}
	log(speeds);

	let sum = 0;
	for (let i = 0; i < speeds.length; i++) {
		sum = speeds[i] + sum;
	}

	let average = sum / speeds.length;

	let fastest = 100000000;
	let slowest = -100000000;
	for (let i = 0; i < speeds.length; i++) {
		if (speeds[i] < fastest) {
			fastest = speeds[i];
		} else {
			slowest = speeds[i];
		}
	}

	for (let i = 0; i < speeds.length; i++) {}

	alert(
		'Your average speed between clicks was: ' +
			round(average) +
			'ms\nThe fastest speed in betwene your clicks was: ' +
			fastest +
			'ms\n' +
			'And the slowest was: ' +
			slowest +
			'ms',
		12
	);
}

// minimum (1,1), maximum(71,23)
function makeTargets() {
	times.push(Date.now());
	log(times);
	if (times.length > 10) {
		calcStats();
		return;
	}
	erase();
	makeBackground();
	targetRow = round(random(1, 23));
	targetCol = round(random(1, 71));

	button(target, targetRow, targetCol, makeTargets);

	for (let i = 0; i < 4; i++) {
		let row = round(random(1, 23));
		let col = round(random(1, 71));
		if (row != targetRow || col != targetCol) {
			button(imposter, row, col, gameOver);
		} else {
			i--;
		}
	}
}

function makeBackground() {
	let strEven = `_/\\_`.repeat(19);
	let strOdd = `-\\/-`.repeat(19);
	for (let i = 1; i < 29; i++) {
		if (i % 2 == 0) {
			text(strEven, i);
		} else {
			text(strOdd, i);
		}
	}
}

async function start() {
	makeBackground();
	await alert('You will have to rapidly click the real targets avoid the imposter targets.', 12);
	makeTargets();
}
