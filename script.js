let suits = ['hearts', 'diamonds', 'clubs', 'spades']
let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
let counter = document.querySelector('#counter')
let count = -1

let playerCard1 = document.querySelector('#card1')
let playerCard2 = document.querySelector('#card2')
let dealerCard2 = document.querySelector('#dealer2')

let PC1;
let PC2;
let DC;

function Hand() {
	this.cards = []
	for (let d=0; d<6; d++) {
		for (let i=0; i<suits.length; i++) {
			for (let j=0; j<ranks.length; j++) {
				let rank = ranks[j]
				let suit = suits[i]
				let value;
				if (ranks[j] === 'J' || ranks[j] === 'Q' || ranks[j] === 'K') {
					value = 10
				} else if (ranks[j] === 'A') {
					value = 11
				} else {
					value = Number(ranks[j])
				}
				this.cards.push(new Card(rank, suit, value))
			}
		}
	}
	count++
	Shuffle(this.cards)
}

function Card(rank, suit, value) {
	this.rank = rank
	this.suit = suit
	this.value = value
}

function Shuffle(cards) {
	this.cards = []

	for (let i=cards.length-1; i>=0; i--) {
		let j = Math.floor(Math.random() * i);
		let k = cards[i]
		cards[i] = cards[j]
		cards[j] = k

		this.cards.push(cards[i])
	}
	counter.innerHTML = count
	playerCard1.innerHTML = `${cards[0].rank} ${cards[0].suit}`
	playerCard2.innerHTML = `${cards[1].rank} ${cards[1].suit}`
	dealerCard2.innerHTML = `${cards[2].rank} ${cards[2].suit}`
	PC1 = cards[0].value
	PC2 = cards[1].value
	DC = cards[2].value
}

function Check(value) {

	// 0 = stand
	// 1 = hit
	// 2 = double
	// 3 = split

	let playerSum;
	let choice;

	let differentCards = [
		[0,  2, 3, 4, 5, 6, 7, 8, 9, 10,11],
		[19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[16, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
		[15, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
		[14, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
		[13, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
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

	if ((PC1 != PC2) && (PC1 != 11) && (PC2 != 11)) {
	  	playerSum = 20 - (PC1 + PC2)
	  	choice = differentCards[playerSum][DC-1]
	} else if (PC1 === PC2) {
		playerSum = 12 - PC1
		choice = sameCards[playerSum][DC-1]
	} else {
		playerSum = 22 - (PC1 + PC2)
		choice = oneAce[playerSum][DC-1]
	}

	if (choice === Number(value)) {
		console.log('Correct!')
	} else {
		console.log('Wrong!')
	}














	Hand()
}

let deal = new Hand