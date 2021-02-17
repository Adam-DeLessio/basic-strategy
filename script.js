let suits = ['♥', '♦', '♣', '♠']
let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
let counter = document.querySelector('#counter')
let count = 0

let main = document.querySelector('#main')
let guess = document.querySelector('#guess')

let upperLeft = document.querySelectorAll('.upperLeft')
let bottomRight = document.querySelectorAll('.bottomRight')
let center = document.querySelectorAll('.center')

let playerCard2 = document.querySelector('#card2')
let dealerCard2 = document.querySelector('#dealer2')

let pc1;
let pc2;
let dc;

counter.innerHTML = count
// guess.innerHTML = "Let's play a game!"



function makeCard() {
	let randomSuit = suits[(Math.floor(Math.random() * 4))]
	let randomRank = ranks[(Math.floor(Math.random() * 13))]
	let value;
	let color;
	if (randomRank === 'J' || randomRank === 'Q' || randomRank === 'K') {
		value = 10
	} else if (randomRank === 'A') {
		value = 11
	} else {
		value = Number(randomRank)
	}
	if (randomSuit === '♦' || randomSuit === '♥') {
		color = 'red'
	} else {
		color = 'black'
	}
	let card = {
		suit: randomSuit,
		rank: randomRank,
		value: value,
		color: color
	}
	return card
}

function Hand() {
	dc = makeCard()
	pc1 = makeCard()
	pc2 = makeCard()
	let cards = [dc, pc1, pc2]

	let cardColor = document.querySelectorAll('.cards')
	for (let i=0; i<3; i++) {
		upperLeft[i].innerHTML = `${cards[i].rank}<br>${cards[i].suit}`
		upperLeft[i].setAttribute('class', 'upperLeft')
		center[i].innerHTML = `${cards[i].suit}`
		center[i].setAttribute('class', 'center')
		bottomRight[i].innerHTML = `${cards[i].rank}<br>${cards[i].suit}`
		bottomRight[i].setAttribute('class', 'bottomRight')
		cardColor[i+1].style.color = cards[i].color
	}
}

function Check(value) {
	let options = {
		0: 'stand',
		1: 'hit',
		2: 'double',
		3: 'split'
	}

	let playerSum;
	let choice;

	let differentCards = [
		[0,  2, 3, 4, 5, 6, 7, 8, 9, 10,11],
		[20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[16, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
		[15, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
		[14, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
		[13, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
		[12, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
		[11, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
		[10, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1],
		[9,  1, 2, 2, 2, 2, 1, 1, 1, 1, 1],
		[8,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[7,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[6,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[5,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	]

	let sameCards = [
		[0,  2, 3, 4, 5, 6, 7, 8, 9, 10,11],
		[22, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
		[20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[18, 3, 3, 3, 3, 3, 0, 3, 3, 0, 0],
		[16, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
		[14, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1],
		[12, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1],
		[10, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1],
		[8,  1, 1, 1, 3, 3, 1, 1, 1, 1, 1],
		[6,  3, 3, 3, 3, 3, 3, 1, 1, 1, 1],
		[4,  3, 3, 3, 3, 3, 3, 1, 1, 1, 1]
	]

	let oneAce = [
		[0,  2, 3, 4, 5, 6, 7, 8, 9, 10,11],
		[21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[18, 0, 2, 2, 2, 2, 0, 0, 1, 1, 1],
		[17, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1],
		[16, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
		[15, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
		[14, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1],
		[13, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1],
	]

	if (((pc1.value != pc2.value) && (pc1.value != 11) && (pc2.value != 11)) || ((pc1.value === pc2.value) && (pc1.rank != pc2.rank))) {
	  	playerSum = 21 - (pc1.value + pc2.value)
	  	choice = differentCards[playerSum][dc.value-1]
	} else if (pc1.value === pc2.value) {
		playerSum = 12 - pc1.value
		choice = sameCards[playerSum][dc.value-1]
	} else {
		playerSum = 22 - (pc1.value + pc2.value)
		choice = oneAce[playerSum][dc.value-1]
	}

	// let prevP1 = document.querySelector('#card1').cloneNode(true)
	// let prevP2 = document.querySelector('#card2').cloneNode(true)
	// let prevDC = document.querySelector('#dealer2').cloneNode(true)
	// prevP1.setAttribute('class', 'prevCards')

	if (choice === Number(value)) {
		main.style.backgroundImage = 'linear-gradient(green, lightgreen)'
		count++
		guess.innerHTML = ''
		guess.style.display = 'flex'
	} else {
		main.style.backgroundImage = 'linear-gradient(red, orange)'
		count = 0
		guess.style.display = 'flex'
		guess.innerHTML = ''



		// guess.innerHTML = `You should<br>${Object(options[Number(choice)])}<br>when you have<br>${} ${guess.appendChild(prevP2)}<br>against the dealers'<br>${guess.appendChild(prevDC)}`

		// guess.appendChild(prevP1)
		// guess.appendChild(prevP2)
		// guess.appendChild(prevDC)



	}
	counter.innerHTML = count
	Hand()
}

///// resets the counter ---- should probably change /////
function Reload() {
	location.reload()
}



let deal = new Hand