let suits = ['hearts', 'diamonds', 'clubs', 'spades']
let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace']



function Deck() {
	this.cards = []

	for (let i=0; i<suits.length; i++) {
		for (let j=0; j<ranks.length; j++) {
			let rank = ranks[j]
			let suit = suits[i]

			this.cards.push(new Card(rank, suit))
		}
	}
	Shuffle(this.cards)
}

function Card(rank, suit) {
	this.rank = rank
	this.suit = suit
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
}






let deal = new Deck