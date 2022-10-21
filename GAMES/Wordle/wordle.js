let dictionary = [];
let commonWords = [];
let wordle;

let fullAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let alphabet;
let score = 0;
let total = 0;
let distribution = [0, 0, 0, 0, 0, 0];

async function setup() {
	let filePath = QuintOS.dir + '/words5.txt';
	let data = await fetch(filePath);
	commonWords = await data.text();
	commonWords = commonWords.split('\n');

	let dictionaryFilePath = QuintOS.dir + '/dictionary5.txt';
	let dictionaryData = await fetch(dictionaryFilePath);
	let txt = await dictionaryData.text();
	let lines = txt.split('\n');

	for (let line of lines) {
		let lineWords = line.split(' ');
		dictionary.push(...lineWords);
	}

	/* load the text files*/

	startGame();
}

/* Display all the boxes for the letters */
function displayBoxes() {
	for (let row = 3; row < 19; row += 3) {
		for (let col = 3; col < 16; col += 3) {
			textRect(row, col, 3, 3, 'solid');
		}
	}
}

async function startGame() {
	/* pick new word */
	randomPosition = round(random(0, commonWords.length - 1));
	wordle = commonWords[randomPosition];
	commonWords.splice(randomPosition, 1);
	log(commonWords);

	erase();
	displayInfo();
	displayBoxes();
	alphabet = fullAlphabet;

	for (let guessCount = 0; guessCount < 6; guessCount++) {
		text(alphabet, 21, 7, 40, 2);
		let guess = await prompt('Guess the word!', 3, 18, 20);
		guess = guess.toUpperCase();

		if (guess.length != 5) {
			await alert('The word must be five letters long! :)', 3, 18, 20);
			guessCount--;
			continue;
		} else if (!dictionary.includes(guess)) {
			await alert('That is not a real word!', 3, 18, 20);
			guessCount--;
			continue;
		}

		let rectStyles = checkGuess(guess);

		for (let i = 0; i < guess.length; i++) {
			await eraseRect(guessCount * 3 + 3, i * 3 + 3, 3, 3, 1);
			await delay(200);
			textRect(guessCount * 3 + 3, i * 3 + 3, 3, 3, rectStyles[i], null, 1);
			text(guess[i], guessCount * 3 + 4, 4 + i * 3);
		}

		if (guess == wordle) {
			score++;
			total++;
			distribution[guessCount]++;
			displayScore();
			await alert('You won!', 3, 18, 20);
			break;
		} else if (guessCount == 5) {
			total++;
			displayScore();
			await alert('You lost!', 3, 18, 20);
			break;
		}
	}

	startGame();
}

function displayInfo() {
	let row = 10;
	textRect(row, 20, 3, 3, 'solid');
	text('letter is not found in word', row, 24);
	row += 3;
	textRect(row, 20, 3, 3, 'outline');
	text('letter is in the word', row, 24);
	row += 3;
	textRect(row, 20, 3, 3, 'dashed');
	text('letter is in the correct position', row, 24, 14);
	log(wordle);
}

async function displayScore() {
	await eraseRect(9, 19, 20, 11);
	let str = score + '/' + total + ' correct\n\nGuess Distribution\n\n';
	for (let i = 0; i < 6; i++) {
		str += `Guess ${i + 1}: ${distribution[i]}\n`;
	}
	text(str, 9, 19);
}

// letter is not in the wordle
//alphabet = alphabet.replace(guess[i], ' ');

function checkGuess(guess) {
	let styles = [];
	// loop through each letter in the word
	for (let i = 0; i < 5; i++) {
		let letter = guess[i];

		styles[i] = 'solid'; // default style until proven otherwise

		if (letter == wordle[i]) {
			// exact match
			styles[i] = 'dashed';
		} else {
			let guessIndexes = getLetterIndexes(letter, guess);
			let wordleIndexes = getLetterIndexes(letter, wordle);
			let differences = [];

			// if the letter only occcurs once then do a simple check if the letter
			// if the letter is included in the word
			if (guessIndexes.length == 1) {
				if (wordle.includes(letter)) {
					styles[i] = 'outline';
				}
			} else {
				log('guessIndexes:' + guessIndexes);
				log('wordleIndexes:' + wordleIndexes);

				// assume the letter only occurrs in the wordle once
				let wi = wordleIndexes[0];

				// loop throug the indexes the letter occurs in the guess
				// find which letter is closest to the letter in the wordle
				let minDistance = 5;
				let closestLetterIndex;
				for (let i = 0; i < guessIndexes.length; i++) {
					let gi = guessIndexes[i];
					let dist = Math.abs(gi - wi);
					if (dist != 0 && dist < minDistance) {
						minDistance = dist;
						closestLetterIndex = gi;
					}
				}
				log(closestLetterIndex);
				if (styles[closestLetterIndex] != 'dashed') {
					styles[closestLetterIndex] = 'outline';
				}
			}
		}
	}
	return styles;
}

function getLetterIndexes(letter, word) {
	let indexes = [];
	for (let i = 0; i < 5; i++) {
		if (letter == word[i]) {
			indexes.push(i);
		}
	}
	return indexes;
}
