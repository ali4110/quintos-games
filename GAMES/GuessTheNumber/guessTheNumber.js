async function start() {
	// your code goes here!
	let num = round(random(1, 100));
	let guess;

	await alert(num);

	while (guess != num) {
		guess = await prompt('Guess a number');

		if (num == guess) {
			await alert('The guess is correct');
		} else if (guess > num) {
			await alert('Your guess is too high');
		} else if (guess < num) {
			await alert('Your guess is too low');
		}
	}

	let newGame = await prompt('Play again? (y/n)');

	if (newGame == 'y') {
		start();
	} else {
		exit();
	}
}
