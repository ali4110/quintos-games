let header = `
| id | rented film title               |
|====|=================================|`;

let genreCode = ['Comedy', 'Action', 'Romance', 'Thriller', 'Sci-Fi', 'Mystery'];

let allFilms, members;

let bg = `
----------------------------------------
 [] [] [] [] [] [] [] [] [] [] [] [] [] 
----------------------------------------
      \\|/ |                  |        
     --O--|   ^^   |||||     |     ___  
 /\\   /|\\ | ^^     |O=O|     |_ __/_|_\\,
/  \\/\\    |        ( - )     |  \`O---O-'
  /\\  \\/\\_|       .-~~~-.    | -- -- --
 /  /\\ \\  |      //| o |\\\\   |__________
----------------------------------------
 [] [] [] [] [] [] [] [] [] [] [] [] [] 
----------------------------------------`;

let logo = `
   _   _ _     ___ _ _               
  /_\\ | (_)   / __(_) |_ __ ___  ___ 
 //_\\\\| | |  / _\\ | | | '_ \` _ \\/ __|
/  _  \\ | | / /   | | | | | | | \\__ \\
\\_/ \\_/_|_| \\/    |_|_|_| |_| |_|___/`;

async function start() {
	let filePath = QuintOS.dir + '/films.json';
	let data = await fetch(filePath);
	let obj = await data.json();
	allFilms = obj.films;

	filePath = QuintOS.dir + '/members.json';
	data = await fetch(filePath);
	obj = await data.json();
	members = obj.members;

	while (true) {
		await text(bg, 2, 0);
		text(logo, 14, 1);
		let res = await prompt('M: View Member F: View Film E: Exit', 20, 0, 40);
		res = res.split(' ');
		let cmd = res[0];
		let id = res[1];

		if (cmd == 'm' || cmd == 'M') {
			await viewMember(id);
		} else if (cmd == 'f' || cmd == 'F') {
			await viewFilmInfo(id);
		} else {
			break;
		}
	}
	exit();
}

async function viewMember(mid) {
	let member;
	for (member of members) {
		if (member.id == mid) break;
	}

	while (true) {
		erase();
		text('Member ID: ' + member.id + '\n\n' + 'Name: ' + member.name, 2, 0);

		// get the film objects for the films they rented
		let films = [];
		for (let filmID of member.rented) {
			for (let film of allFilms) {
				if (film.id == filmID) {
					films.push(film);
					break;
				}
			}
		}
		viewFilms(films);
		let res = await prompt('B: Back, V: View, R: Return', 20, 0, 40);
		res = res.split(' ');
		let cmd = res[0];
		let fid = res[1];

		if (cmd == 'v' || cmd == 'v') {
			await viewFilmInfo(fid);
		} else if (cmd == 'r' || cmd == 'R') {
			await returnRentedFilm(member, fid);
		} else if (cmd == 'b' || cmd == 'B') {
			erase();
			break;
		}
	}
}

function viewFilms(films) {
	let table = header;
	log(films);
	for (let film of films) {
		table += '| ' + film.id + ' |' + film.title.padEnd(32, ' ') + ' |\n';
		table += '|----|---------------------------------|\n';
	}
	if (!films.length) {
		table += '    This member has no rented movies.';
	}
	text(table, 6, 0);
}

async function viewFilmInfo(id) {
	let film;
	for (film of allFilms) {
		if (film.id == id) break;
	}

	log(film);
	erase();
	let info =
		'ID: ' +
		film.id +
		'\n\n' +
		'Title: ' +
		film.title +
		'\n\n' +
		'Genre: ' +
		genreCode[film.genre] +
		'\n\n' +
		'Rating: ' +
		film.rating +
		'\n\n' +
		'Description: ' +
		film.description;
	await alert(info, 2, 0, 40);
}

async function returnRentedFilm(member, filmID) {
	let film;
	for (let i = 0; i < member.rented.length; i++) {
		if (member.rented[i] == filmID) {
			member.rented.splice(i, 1);
			erase();
			await alert('Movie has been returned', 10, 10, 20);
			break;
		}
	}
}
// }
