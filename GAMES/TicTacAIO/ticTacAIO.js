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

let board = [
	[' ', ' ', ' '],
	[' ', ' ', ' '],
	[' ', ' ', ' ']
];

let singlePlayer = true;
let turnCount = 1;

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

let mode = 'unbeatable';

async function chooseDifficulty() {
	await eraseRect(4, 60, 1, 3);
	button('Easy Difficulty', 4, 58, startGame);
	button('Medium Difficulty', 6, 58, () => {
		mode = 'medium';
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
	// 	singlePlayer = false;
	// 	startGame();
	// });

	startGame(); // for testing
}

/*
 , ,O
 ,X,
 , ,
*/

function aiTakeTurn() {
	if (mode == 'unbeatable') {
		// add other rules to make the ai unbeatable
		if (turnCount <= 2 && board[1][1] == ' ') {
			takeTurn(1, 1);
			return;
		}
		if (turnCount == 2 && board[1][1] == 'X') {
			let row = round(random(0, 1)) * 2;
			let col = round(random(0, 1)) * 2;
			takeTurn(row, col);
			return;
		}
	}
	if (mode == 'unbeatable' || mode == 'hard' || (mode == 'medium' && random() < 0.75)) {
		for (let row = 0; row < 3; row++) {
			for (let col = 0; col < 3; col++) {
				if (board[row][col] == ' ') {
					board[row][col] = 'O';
					if (checkForWinner()) {
						board[row][col] = ' ';
						takeTurn(row, col);
						return;
					}
					board[row][col] = 'X';
					if (checkForWinner('X')) {
						board[row][col] = ' ';
						takeTurn(row, col);
						return;
					}
					board[row][col] = ' ';
				}
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

async function takeTurn(row, col) {
	if (board[row][col] == ' ' && !hasAlert) {
		if (turn == 'X') {
			text(bigX, gridRow + row * 8, gridCol + col * 9);
			board[row][col] = 'X';
			text("It is O's turn", 2, 60);
		} else {
			board[row][col] = 'O';
			text(bigO, gridRow + row * 8, gridCol + col * 9);
			text("It is X's turn", 2, 60);
		}
		turnCount++;
		log('turnCount: ' + turnCount);

		if (checkForWinner()) {
			hasAlert = true;
			await alert(turn + ' is the winner!', 20, 60, 18);
			if (turn == 'X') {
				xVic++;
				text('Player X score: ' + xVic, 3, 60);
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
			await alert('Draw!', 20, 60, 18);
			randomTurn();
			startNewGame();
			return;
		}

		if (turn == 'X') {
			turn = 'O';
			if (singlePlayer) {
				aiTakeTurn();
				return;
			}
		} else {
			turn = 'X';
		}
	} else {
		hasAlert = true;
		await alert('The place is occupied!', 20, 60, 18);
		hasAlert = false;
	}

	log(board.join('\n'));
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

	text('It is ' + turn + "'s turn", 2, 60);

	if (singlePlayer && turn == 'O') {
		aiTakeTurn();
	}
}
