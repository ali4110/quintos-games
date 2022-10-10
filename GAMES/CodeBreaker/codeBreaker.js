async function start() {
	let message;

	let choice = await prompt('Do you want to load a message from a file? (y/n');
	if (choice == 'y') {
		let fileName = await prompt('Enter file name: ');
		let filePath = QuintOS.dir + '/' + fileName;
		let data = await fetch(filePath);
		message = await data.text();
	} else {
		message = await prompt("Enter the message you'd like to encode: ");
	}
	// Cbcfm
	choice = await prompt('Do you know the shift amount? (y/n');
	if (choice == 'y') {
		let shift = await prompt('Enter the shift amount: ');
		await alert(ceasarCipher(message, shift));
		return;
	}

	for (let i = 1; i < 26; i++) {
		let decoded = ceasarCipher(message, i).slice(0, 70) + '...';
		button(decoded, i, 1, () => {
			erase();
			alert(ceasarCipher(message, i), 1);
		});
	}
}

function ceasarCipher(msg, shiftValue) {
	let secret = '';
	let alphabetCapital = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let alphabetLowerCase = 'abcdefghijklmnopqrstuvwxyz';
	for (i = 0; i < msg.length; i++) {
		let isLetter = false;
		let isCapital = false;
		for (j = 0; j < alphabetCapital.length; j++) {
			if (msg[i] == alphabetCapital[j]) {
				isLetter = true;
				isCapital = true;
				let idx = (j + shiftValue) % 26;
				secret += alphabetCapital[idx];
				log(secret);
				break;
			}
		}
		if (isCapital) continue;

		for (j = 0; j < alphabetLowerCase.length; j++) {
			if (msg[i] == alphabetLowerCase[j]) {
				isLetter = true;
				let idx = (j + shiftValue) % 26;
				secret += alphabetLowerCase[idx];
				log(secret);
				break;
			}
		}

		if (isLetter == false) {
			secret += msg[i];
		}
	}
	return secret;
}
