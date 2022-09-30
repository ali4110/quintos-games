let frog, lilypads;

function preload() {
	frog = new Sprite();
	lilypads = new Group();
}

function setup() {
	world.gravity.y = 10;
	noStroke();

	frog.x = 16;
	frog.y = 90;
	frog.w = 10;
	frog.h = 8;
	frog.rotationLock = true;

	lilypads.y = 90;
	lilypads.w = 10;
	lilypads.h = 2;
	lilypads.collider = 'static';

	makeLilyPads();
}

function makeLilyPads() {
	/* Part A: Use a loop to make more lily pads. */
	let i = 0;

	while (i < 50) {
		let lily = new lilypads.Sprite();
		lily.x = 16 + i * 16;
		i++;
	}
}

function draw() {
	background('0');
	fill('3');
	rect(0, 0, width, 90);

	if (frog.y > 83) {
		frog.x = round(frog.x / 16) * 16;
		if (kb.pressed('ArrowUp')) {
			// little jump
			frog.velocity.y = -1.4;
			frog.velocity.x = 0.98;
		} else if (kb.pressed('ArrowRight')) {
			// BIG jump!
			frog.velocity.y = -2;
			frog.velocity.x = 1.35;
		}
	}

	log(frog.y);

	camera.x = frog.x + 64;
}
