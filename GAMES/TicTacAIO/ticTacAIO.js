const title = `
TTTTT IIIII   CCC
  T     I    C
  T     I    C
  T     I    C
  T   IIIII   CCC

TTTTT  AAA    CCC
  T   A   A  C
  T   AAAAA  C
  T   A   A  C
  T   A   A   CCC

TTTTT  OOO   EEEE
  T   O   O  E
  T   O   O  EEE
  T   O   O  E
  T    OOO   EEEE`;

const bigSpace = '        \n'.repeat(7);

const bigO = `
 OOOOOO
OO    OO
OO    OO
OO    OO
OO    OO
OO    OO
 OOOOOO`;

const bigX = `
XX    XX
 XX  XX
  XXXX
   XX
  XXXX
 XX  XX
XX    XX`;

const gridRow = 3;
const gridCol = 26;

let turn = 'X';
let hasAlert = false;
let xVic = 0;
let oVic = 0;
let playerCount = 0;
let gameCount = 0;

let aiAttack;

let board = [
	[' ', ' ', ' '],
	[' ', ' ', ' '],
	[' ', ' ', ' ']
];

let turnCount = 1;

const formations = [
	// big corners
	[
		[0, 0],
		[0, 2],
		[2, 2]
	],
	[
		[0, 0],
		[0, 2],
		[2, 0]
	],
	[
		[0, 0],
		[2, 0],
		[2, 2]
	],
	[
		[0, 2],
		[2, 2],
		[2, 0]
	],
	// big triangles
	[
		[0, 0],
		[1, 1],
		[0, 2]
	],
	[
		[0, 0],
		[1, 1],
		[2, 0]
	],
	[
		[2, 0],
		[1, 1],
		[2, 2]
	],
	[
		[0, 2],
		[1, 1],
		[2, 2]
	],
	// little Ls
	[
		[0, 1],
		[1, 0],
		[0, 0]
	],
	[
		[0, 1],
		[1, 2],
		[0, 2]
	],
	[
		[1, 0],
		[2, 1],
		[2, 0]
	],
	[
		[1, 2],
		[2, 1],
		[2, 2]
	],
	// bigLs
	[
		[0, 0],
		[1, 2],
		[0, 2]
	],
	[
		[0, 0],
		[2, 1],
		[2, 0]
	],
	[
		[1, 0],
		[0, 2],
		[0, 0]
	],
	[
		[2, 1],
		[0, 2],
		[2, 2]
	],
	[
		[1, 0],
		[2, 2],
		[2, 0]
	],
	[
		[0, 1],
		[2, 2],
		[0, 2]
	],
	[
		[0, 1],
		[2, 0],
		[0, 0]
	],
	[
		[2, 0],
		[1, 2],
		[2, 2]
	]
];

function randomTurn() {
	if (random() > 0.5) {
		turn = 'O';
	} else {
		turn = 'X';
	}
}

async function startGame() {
	randomTurn();

	eraseRect(4, 60, 1, 3);

	/* Part A: Make the buttons in the grid */
	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			button(bigSpace, gridRow + row * 8, gridCol + col * 9, () => {
				takeTurn(row, col);
			});
		}
	}

	startNewGame();
}

let modeO = 'unbeatable';
let modeX = 'hard';

async function chooseDifficulty() {
	await eraseRect(4, 60, 1, 3);
	button('Easy Difficulty', 6, 58, startGame);
	button('Medium Difficulty', 8, 58, () => {
		mode = 'medium';
		startGame();
	});
	button('Hard Difficulty', 8, 58, () => {
		mode = 'hard';
		startGame();
	});

	// button('Unbeatable Difficulty', 14, 58);
}

function start() {
	text(title, 5, 6);

	/* Part A: finish the grid of 9x8 spaces */
	text('─'.repeat(26), gridRow + 7, gridCol);
	text('─'.repeat(26), gridRow + 15, gridCol);
	text('│\n'.repeat(23), gridRow, gridCol + 8);
	text('│\n'.repeat(23), gridRow, gridCol + 17);

	// button('Single player game', 4, 58, chooseDifficulty);
	// button('Two player game', 6, 58, () => {
	// 	playerCount = 2;
	// 	startGame();
	// });

	startGame(); // for testing
}

/*
O,O,o
O, , 
o, , 

O,o,O
O, , 
o, , 

O,o,O
o, , 
O, , 

o,X,O
 , ,
 , ,
*/

function aiTakeTurn() {
	let mode = modeO;
	if (turn == 'X') mode = modeX;

	let mark = turn;
	let opponent = 'X';
	if (mark == 'X') opponent = 'O';

	if (mode == 'unbeatable' || mode == 'hard' || (mode == 'medium' && random() < 0.75)) {
		for (let row = 0; row < 3; row++) {
			for (let col = 0; col < 3; col++) {
				if (board[row][col] == ' ') {
					board[row][col] = mark;
					if (checkForWinner(mark)) {
						board[row][col] = ' ';
						takeTurn(row, col);
						return;
					}
					board[row][col] = opponent;
					if (checkForWinner(opponent)) {
						board[row][col] = ' ';
						takeTurn(row, col);
						return;
					}
					board[row][col] = ' ';
				}
			}
		}
	}

	if (mode == 'unbeatable') {
		if (turnCount == 1) {
			aiAttack = formations[round(random(0, formations.length - 1))];
		} else if (turnCount == 2) {
			let oppCoord;

			for (let row = 0; row < 3; row++) {
				for (let col = 0; col < 3; col++) {
					if (board[row][col] == 'X') {
						oppCoord = [row, col];
						break;
					}
				}
			}

			let _formations = [...formations];
			for (let i = 0; i < _formations.length; i++) {
				let formation = _formations[i];
				for (let j = 0; j < 3; j++) {
					let coord = formation[j];
					if (coord[0] == oppCoord[0] && coord[1] == oppCoord[1]) {
						_formations.splice(i, 1);
						i--;
						break;
					}
				}
			}
			aiAttack = _formations[round(random(0, _formations.length - 1))];
			log(aiAttack.join('\n'));
		}
		// add other rules to make the ai unbeatable
		if (turnCount <= 2 && board[1][1] == ' ') {
			takeTurn(1, 1);
			return;
		}

		if (turnCount == 2 && board[1][1] == 'X') {
			let row = round(random(0, 1)) * 2;
			let col = round(random(0, 1)) * 2;
			for (let coord of aiAttack) {
				if (
					(coord[0] == 0 && coord[1] == 0) ||
					(coord[0] == 0 && coord[1] == 2) ||
					(coord[0] == 2 && coord[1] == 0) ||
					(coord[0] == 2 && coord[1] == 2)
				) {
					row = coord[0];
					col = coord[1];
					break;
				}
			}
			takeTurn(row, col);
			return;
		}

		for (let formation of formations) {
			let c0 = formation[0];
			let c1 = formation[1];
			let c2 = formation[2];

			if (board[c0[0]][c0[1]] == 'X' && board[c1[0]][c1[1]] == 'X' && board[c2[0]][c2[1]] == ' ') {
				takeTurn(c2[0], c2[1]);
				return;
			}
			if (board[c0[0]][c0[1]] == 'X' && board[c2[0]][c2[1]] == 'X' && board[c1[0]][c1[1]] == ' ') {
				takeTurn(c1[0], c1[1]);
				return;
			}
			if (board[c1[0]][c1[1]] == 'X' && board[c2[0]][c2[1]] == 'X' && board[c0[0]][c0[1]] == ' ') {
				takeTurn(c0[0], c0[1]);
				return;
			}
		}

		for (let coord of aiAttack) {
			if (board[coord[0]][coord[1]] == ' ') {
				takeTurn(coord[0], coord[1]);
				return;
			}
		}
	}

	// easy mode picks any available space, other modes fallback to this
	let row, col;
	do {
		row = round(random(0, 2));
		col = round(random(0, 2));
	} while (board[row][col] != ' ');
	takeTurn(row, col);
}

//
//
//

async function takeTurn(row, col) {
	if (board[row][col] == ' ' && !hasAlert) {
		if (turn == 'X') {
			text(bigX, gridRow + row * 8, gridCol + col * 9);
			board[row][col] = 'X';
			// text("It is O's turn", 2, 60);
		} else {
			board[row][col] = 'O';
			text(bigO, gridRow + row * 8, gridCol + col * 9);
			// text("It is X's turn", 2, 60);
		}
		log('turnCount: ' + turnCount);
		log(board.join('\n'));

		if (checkForWinner()) {
			hasAlert = true;
			await delay(100);
			gameCount++;

			if (board[1][1] == 'X') {
				await alert(turn + ' is the winner!', 20, 60, 18);
			}

			if (turn == 'X') {
				xVic++;
				text('Player X score: ' + xVic, 3, 60);
				await alert(turn + ' is the winner!', 20, 60, 18);
				turn = 'O';
			} else {
				oVic++;
				text('Player O score: ' + oVic, 5, 60);
				turn = 'X';
			}
			startNewGame();
			return;
		}

		if (checkForDraw()) {
			hasAlert = true;
			gameCount++;
			await delay(100);
			// await alert('Draw!', 20, 60, 18);
			randomTurn();
			startNewGame();
			return;
		}

		turnCount++;
		// change turns
		if (turn == 'X') {
			turn = 'O';
			if (playerCount <= 1) {
				aiTakeTurn();
				return;
			}
		} else {
			turn = 'X';
			if (playerCount == 0) {
				aiTakeTurn();
				return;
			}
		}
	} else {
		hasAlert = true;
		await alert('The place is occupied!', 20, 60, 18);
		hasAlert = false;
	}
}

function checkForWinner(mark) {
	if (!mark) mark = turn;
	for (let row = 0; row < 3; row++) {
		if (board[row][0] == mark && board[row][1] == mark && board[row][2] == mark) {
			return true;
		}
	}
	for (let col = 0; col < 3; col++) {
		if (board[0][col] == mark && board[1][col] == mark && board[2][col] == mark) {
			return true;
		}
	}
	if (board[0][0] == mark && board[1][1] == mark && board[2][2] == mark) {
		return true;
	}
	if (board[0][2] == mark && board[1][1] == mark && board[2][0] == mark) {
		return true;
	}

	return false;
}

function checkForDraw() {
	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			if (board[row][col] == ' ') {
				return false;
			}
		}
	}
	return true;
}

function startNewGame() {
	turnCount = 1;
	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			board[row][col] = ' ';
			text(bigSpace, gridRow + row * 8, gridCol + col * 9);
		}
	}
	hasAlert = false;

	// text('It is ' + turn + "'s turn", 2, 60);
	if (gameCount >= 1) {
		text(gameCount + '  ' + round((oVic / gameCount) * 100) + '%', 2, 60);
	}

	if ((playerCount == 1 && turn == 'O') || playerCount == 0) {
		aiTakeTurn();
	}
}
