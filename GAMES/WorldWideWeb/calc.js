let labels = ['AC', '+/-', '%', '/', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '='];

let buttons = document.getElementById('buttons');

for (let label of labels) {
	let btn = document.createElement('button');
	btn.onclick = () => {
		btnPressed(label);
	};
	btn.innerHTML = label;
	if (label == 0) {
		btn.id = 'large0';
	}
	if (['+', '-', '*', '/', '='].includes(label)) {
		btn.className = 'operators';
	}
	buttons.append(btn);

	if (['AC', '+/-', '%'].includes(label)) {
		btn.className = 'specials';
	}
	buttons.append(btn);
}

let screen = document.getElementById('resultScreen');

function btnPressed(btn) {
	if (btn == 'AC') {
		screen.value = '';
	} else if (btn == '=') {
		screen.value = eval(screen.value);
	} else if (btn == '%') {
		screen.value = 0.01 * screen.value;
	} else if (btn == '+/-') {
		screen.value = -1 * screen.value;
	} else {
		screen.value += btn;
	}
}
