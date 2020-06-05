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

guess.innerHTML = "Let's play a game!"

function Hand() {
	this.cards = []
	for (let d=0; d<6; d++) {
		for (let i=0; i<suits.length; i++) {
			for (let j=0; j<ranks.length; j++) {
				let rank = ranks[j]
				let suit = suits[i]
				let value;
				let color;
				if (ranks[j] === 'J' || ranks[j] === 'Q' || ranks[j] === 'K') {
					value = 10
				} else if (ranks[j] === 'A') {
					value = 11
				} else {
					value = Number(ranks[j])
				}
				if (suits[i] === '♦' || suits[i] === '♥') {
					color = 'red'
				} else {
					color = 'black'
				}
				this.cards.push(new Card(rank, suit, value, color))
			}
		}
	}
	Shuffle(this.cards)
}

function Card(rank, suit, value, color) {
	this.rank = rank
	this.suit = suit
	this.value = value
	this.color = color
}

function Shuffle(cards) {
	this.cards = []
	counter.innerHTML = count

	for (let i=cards.length-1; i>=0; i--) {
		let j = Math.floor(Math.random() * i);
		let k = cards[i]
		cards[i] = cards[j]
		cards[j] = k

		this.cards.push(cards[i])
	}
	

	for (let i=0; i<3; i++) {
		upperLeft[i].innerHTML = `${this.cards[i].rank}<br>${this.cards[i].suit}`
		upperLeft[i].setAttribute('class', 'upperLeft')
		center[i].innerHTML = `${this.cards[i].suit}`
		center[i].setAttribute('class', 'center')
		bottomRight[i].innerHTML = `${this.cards[i].rank}<br>${this.cards[i].suit}`
		bottomRight[i].setAttribute('class', 'bottomRight')		
	}

	pc1 = this.cards[0]
	pc2 = this.cards[1]
	dc = this.cards[2]
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

	if (choice === Number(value)) {
		main.style.backgroundImage = 'linear-gradient(green, lightgreen)'
		count++
		guess.innerHTML = 'Correct!'
		guess.style.display = 'flex'
	} else {
		main.style.backgroundImage = 'linear-gradient(red, orange)'

		let wrong = () => {

		}

		count = 0
		guess.innerHTML = `Wrong!<br>You should<br>${Object(options[Number(choice)])}<br>when you have<br>${pc1.rank} ${pc2.rank}<br>against the dealers'<br>${dc.rank}`
		guess.style.display = 'flex'
	}














	Hand()
}



let deal = new Hand