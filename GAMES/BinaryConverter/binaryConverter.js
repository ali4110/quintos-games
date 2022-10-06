async function start() {
	// your code goes here
	let bits = '0'.repeat(16).split('');
	let dec = await prompt('Enter a denary value: ');

	// while (dec != 0) {
	for (let i = bits.length - 1; i >= 0; i--) {
		if (dec == 0) {
			break;
		}
		if (dec >= 2 ** i) {
			dec -= 2 ** i;
			bits[bits.length - 1 - i] = 1;
		}
		log(dec);
		log(bits);
	}

	text(bits.join(''), 0, 0);
}
