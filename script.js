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

let softHit;
let softStand;
let softSplit;
let softDouble;

counter.innerHTML = count

let playerSum;
let choice;

// Does not handle aces or splits
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

// Handles all splits
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

// Handles all soft pairs
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




// Creates a random card //
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

// Hand type switch code //
let softHitSwitch = document.querySelector('#soft-hit')
if (softHitSwitch.checked) {
	softHit = true
} else {
	softHit = false
}

// Generates the dealer card and both player cards //
function Hand() {
	softHit = true
	softStand = true
	softSplit = true
	softDouble = true

	dc = makeCard()
	pc1 = makeCard()
	pc2 = makeCard()
	let cards = [dc, pc1, pc2]

	//// soft hit
	// softHitSwitch === true, and everything else is false
	// pc1 is a ten --- pc1 must re-draw
	// pc1 is an ace and pc2 is a ten or an ace --- pc2 must re-draw
	// neither card is an ace --- pc2 must re-draw
	// pc1 is not an ace or a ten but pc2 is an ace --- good


	//// hard split
	// hardSplitSwitch === true, and everything else is false
	// pc1 value is 10 but rank is royal --- pc1 must re-draw
	// pc1 is an ace --- pc1 must re-draw
	// pc2 value is 10 but rank is royal --- pc2 must re-draw
	// pc2 is an ace --- pc2 must re-draw
	// pc2 is a valid card, but not the same as pc1 --- pc2 must re-draw



	if (pc1.rank === 'A') {

	}








// Generates the visual cards //
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

// Checks the players' move selection //
function Check(value) {
	let options = {
		0: 'stand',
		1: 'hit',
		2: 'double',
		3: 'split'
	}

// Logic to determine which chart to reference and decide the correct move //
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

// Change background color based on move //
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
	}
	counter.innerHTML = count
	Hand()
}

///// resets the counter ---- should probably change /////
function Reload() {
	location.reload()
}



let deal = new Hand