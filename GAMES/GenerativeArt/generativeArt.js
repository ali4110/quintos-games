let time = 0;
let art = 1;

function setup() {
	for (let i = 1; i < 9; i++) {
		button(i, 15, i * 2 - 1, () => {
			background('b');
			art = i;
		});
	}
}

function draw() {
	background(0, 0, 0, 4);
	stroke('w');
	if (art == 1) strokeWeight(15);
	else strokeWeight(2);

	translate(width / 2, height / 2);

	line(eqX(time), eqY(time), eqX2(time), eqY2(time));

	// time += 10;
	time++;
}

function eqX(t) {
	if (art == 1) return cos(t) * 100 * cos(t - 10);
	if (art == 2) return sin(t * 2) * 10;
	if (art == 3) return sin(t * 2) - 20;
	if (art == 4) return cos(3 * t - 2) - sin(4 * t) + 2;
	if (art == 5) return sin(4 * t) - mouse.x * sin(t - 10);
	if (art == 6) return cos(t) * 302 + sin(t - 20) * 4;
	if (art == 7) return sin(t - 20) * 87 + cos(2 * t);
	if (art == 8) return sin(t * 3) - 250 * cos(t);
}

function eqY(t) {
	if (art == 1) return sin(t) * 100 + 300 * sin(t - 35);
	if (art == 2) return cos(3 * t) * 100 - mouse.y * cos(t);
	if (art == 3) return sin(random(1, 5) * t) + 124 * cos(t);
	if (art == 4) return sin(t * 2) * 103 + cos(23 * t);
	if (art == 5) return cos(t) * (120 - mouse.y / 120);
	if (art == 6) return 76 * cos(t - 24) + 99 * sin(2 * t);
	if (art == 7) return sin(2 * t - 20) * sin(t) * 100;
	if (art == 8) return sin(t - 30) * mouse.x * 0.7;
}

function eqX2(t) {
	if (art == 1) return cos(t - 40) ** 2 - 250 * cos(t - 10);
	if (art == 2) return sin(6 * t - 40) * 120 + cos(t - 50);
	if (art == 3) return sin(t * 3) - mouse.y * cos(t - 20);
	if (art == 4) return cos(t - 46) * (mouse.y * 0.78);
	if (art == 5) return cos(t * 2.5) * 2 + 7 * sin(t - 45);
	if (art == 6) return sin(2 * t - 31) * 120;
	if (art == 7) return sin(t ** 2 - 20);
	if (art == 8) return mouse.x * sin(t * 2) - cos((mouse.y / 120) * t);
	// (sin(t * (mouse.x / 4) - mouse.y / 24) * mouse.y) / 23;
}

function eqY2(t) {
	if (art == 1) return 369 * cos(t - 90) + cos(t ** 2 - 23);
	if (art == 2) return mouse.x * sin(25 - t) - cos(5 * t) * 203;
	if (art == 3) return sin(t - random(2, 5)) * 120;
	if (art == 4) return cos(t * 2 - 45) * mouse.y;
	if (art == 5) return sin(t * 2 - 23) * 2;
	if (art == 6) return cos(t ** 2) + sin(2 * t);
	if (art == 7) return mouse.y * cos(t) + sin(2 * t - 10);
	if (art == 8) return sin(t - 20) + cos(5 * t);
}
