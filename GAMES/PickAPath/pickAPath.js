// start of wrapper (I will explain how this works later)
async function start() {
	// your code goes here! below this line

	let choice = 0; // initialize choice to 0, user has not made any choice yet
	let options = [];

	let coatsRemoved = false;
	let pickingBook = false;
	let enteringCombo = false;

	while (choice != null) {
		// while choice is not null (nothing)
		// null in this case indicates the player cancelled out of the prompt

		let msg = ''; // initialize message to empty String

		if (choice == 0) {
			/* Part A0: Start your story! */
			msg =
				"1960's New York, there's been a murder. The police comissioner has tasked you to search the inside the victims apartment.\n\n\t" +
				'1: walk down the hall to the kitchen\n\t' +
				'2: turn left and go into the bedroom\n\t' +
				'3: investigate the coat closet';
			options = [1, 2, 3];
		} else if (choice == 1) {
			/* Part A1: continue the story */
			msg =
				'You notice that there is a mess in the kitchen. Knives and forks are all over the place. Two chairs are broken.\n\n\t' +
				'4: Investigate the broken chairs and search for clues.\n\t' +
				'5: Check the silverware drawer\n\t' +
				'0: leave the kitchen.';
			options = [4, 5, 0];
		} else if (choice == 2) {
			msg =
				'You notice the victim lying on their bed. The sheets are red with blood. There is a note beside them.\n\n\t' +
				'7: Read the note\n\t' +
				'8: Look in the bathroom\n\t' +
				'11: Take a look at the bookshelf\n\t' +
				'0: Go back to the hall.';
			options = [7, 8, 11, 0];
		} else if (choice == 3 && coatsRemoved == false) {
			msg =
				"There's a bunch of coats in the closet. A few of them have blood on them.\n\n\t" +
				'9: Take out the coats\n\t' +
				'0: Go back to the hall';
			options = [0, 9];
		} else if (choice == 3 && coatsRemoved == true) {
			msg =
				'There is a safe in the back of the closet.\n\n\t' + '10: Try to open the safe\n\t' + '0: Go back to the hall.';
		} else if (choice == 7) {
			msg = 'The note says "You better pay up or else."\n\n\t' + '2: put the note down';
			options = [2];
		} else if (choice == 9) {
			msg =
				"You take out the coats and notice a safe behind them. It's a high security three digit combo lock.\n\n\t" +
				'10: Try to open the safe\n\t' +
				'0: Go back to the hall.';
			options = [0, 10];
			coatsRemoved = true;
		} else if (choice == 11) {
			msg = "There's a lot of books. Which one would you like to look at?";
			pickingBook = true;
		} else if (choice == 8) {
			msg =
				'The shower curtain has been torn. The sink has been shattered. You notice a statue of a Trojan Horse and a poster that depicts ancient Rome.\n\n\t' +
				'2: Go back to the bedroom';
			options = [2];
		} else if (choice == 'The Odyssey') {
			msg =
				'You begin paging through the book. You notice three pages have their corners folded in. The pages are 24, 81, and 105.\n\n\t' +
				'2: put the book down';
			options = [2];
		} else if (pickingBook == true) {
			msg =
				'You skim through the book and do not find anything anything of great importance.\n\n\t' +
				'11: Take a look at another book\n\t' +
				'2: Stop looking at the bookshelf';
			options = [2, 11];
		} else if (choice == 10) {
			msg =
				'Enter a three number combo. The numbers on the safe go from 0-149. Put a space between each number you enter.';
			enteringCombo = true;
		} else if (choice == '81 24 105') {
			msg =
				'You try pulling the lever to open the safe and it opens! You see a bag full of money with a note on it that says "For Victor Macronie".\n\n\tYou found the prime suspect, you win!';
		} else if (enteringCombo == true) {
			msg =
				'You try pulling the lever to open the safe and it stays closed.\n\n\t' +
				'10: Try Again.\n\t' +
				'0: Stop trying to open the safe and return the hall.';
			options = [10, 0];
		}

		// prompt the player to make choices
		if (choice != '81 24 105') {
			let userInput = await prompt(msg);

			if (options.includes(userInput) == true || pickingBook == true || enteringCombo == true) {
				choice = userInput;
			} else {
				await alert('Wrong choice');
			}
		} else {
			await alert(msg);
			choice = null;
		}

		/* Part B0: end the game if there are no more choices to make */

		/* Part B1: check if the player made a valid choice, reject invalid choices */
	}
	exit(); // exits the game
} // end wrapper
