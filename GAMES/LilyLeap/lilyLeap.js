let frog, lilypads;

function preload() {
	frog = new Sprite();
	frog.addAni('frog_jump.png', { size: [32, 16], frames: 7 });
	lilypads = new Group();
	lilypads.addAni('lilypads.png', { size: [16, 16], frames: 12 });
}

function setup() {
	world.gravity.y = 10;
	noStroke();

	frog.x = 16;
	frog.y = 90;
	frog.w = 10;
	frog.h = 8;
	frog.rotationLock = true;
	frog.ani.stop();
	frog.layer = 1;

	lilypads.y = 90;
	lilypads.w = 10;
	lilypads.h = 2;
	lilypads.collider = 'static';
	lilypads.layer = 0;

	makeLilyPads();

	alert('Press the Up Arrow key for a small jump\nPress the Right Arrow key for a big jump.', 2);
}

function makeLilyPads() {
	/* Part A: Use a loop to make more lily pads. */

	for (let i = 0; i < 50; i++) {
		let lily = new lilypads.Sprite();
		lily.x = 16 + i * 16;
		lily.ani.frame = round(random(0, 11));
		lily.ani.frameDelay = round(random(90, 150));

		if (random() < 0.4) {
			i++;
		}
	}
}

function draw() {
	background('0');
	fill('3');
	rect(0, 0, width, 90);

	// if the frog is on a lilypad
	if (frog.y > 83 && frog.vel.y < 1) {
		frog.x = round(frog.x / 16) * 16;
		frog.ani.stop();
		frog.ani.frame = 0;
		if (kb.pressed('ArrowUp')) {
			// little jump
			frog.velocity.y = -1.4;
			frog.velocity.x = 0.98;
			frog.ani.play();
		} else if (kb.pressed('ArrowRight')) {
			// BIG jump!
			frog.velocity.y = -2;
			frog.velocity.x = 1.35;
			frog.ani.play();
		}
	}

	camera.x = frog.x + 64;

	if (frog.y > 400) {
		frog.x = 16;
		frog.y = 84.11;
	}
}
