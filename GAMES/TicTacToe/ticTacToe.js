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

function randomTurn() {
	if (random() > 0.5) {
		turn = 'O';
	} else {
		turn = 'X';
	}
}

function start() {
	text(title, 5, 6);

	/* Part A: finish the grid of 9x8 spaces */
	text('─'.repeat(26), gridRow + 7, gridCol);
	text('─'.repeat(26), gridRow + 15, gridCol);
	text('│\n'.repeat(23), gridRow, gridCol + 8);
	text('│\n'.repeat(23), gridRow, gridCol + 17);

	randomTurn();
	text('It is ' + turn + "'s turn", 2, 60);

	/* Part A: Make the buttons in the grid */
	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			button(bigSpace, gridRow + row * 8, gridCol + col * 9, () => {
				takeTurn(row, col);
			});
		}
	}
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

function checkForWinner() {
	let mark = turn;
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
	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			board[row][col] = ' ';
			text(bigSpace, gridRow + row * 8, gridCol + col * 9);
		}
	}
	hasAlert = false;
}
