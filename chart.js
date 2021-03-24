let chartRevealBtn = document.querySelector('#chartRevealBtn')
let body = document.querySelector('#body')
let chartTable = document.querySelector('#chart')
let chartSection = document.querySelector('#chart-section')
let chartCloseBtn = document.querySelector('#chartCloseBtn')

let topRowValues = [null, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'A']
let cardChart = [
	['17+', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[16, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
	[15, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
	[14, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
	[13, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
	[12, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
	[11, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
	[10, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1],
	[9 , 1, 2, 2, 2, 2, 1, 1, 1, 1, 1],
	['5-8', 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]
let softChart = [
	['A,8-10', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	['A,7', 0, 2, 2, 2, 2, 0, 0, 1, 1, 1],
	['A,6', 1, 2, 2, 2, 2, 1, 1, 1, 1, 1],
	['A,5', 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
	['A,4', 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
	['A,3', 1, 1, 1, 2, 2, 1, 1, 1, 1, 1],
	['A,2', 1, 1, 1, 2, 2, 1, 1, 1, 1, 1],
]
let splitChart = [
	['A,A 8,8', 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
	['10,10', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	['9,9', 3, 3, 3, 3, 3, 0, 3, 3, 0, 0],
	['7,7', 3, 3, 3, 3, 3, 3, 1, 1, 1, 1],
	['6,6', 3, 3, 3, 3, 3, 1, 1, 1, 1, 1],
	['5,5', 2, 2, 2, 2, 2, 2, 2, 2, 1, 1],
	['4,4',  1, 1, 1, 3, 3, 1, 1, 1, 1, 1],
	['3,3',  3, 3, 3, 3, 3, 3, 1, 1, 1, 1],
	['2,2',  3, 3, 3, 3, 3, 3, 1, 1, 1, 1]
]

let chartBody = document.querySelector('#chart-body')
let softBody = document.querySelector('#soft-body')
let splitBody = document.querySelector('#split-body')

// Reveal chart button
function revealChart() {
	let main = document.querySelector('#main')
	main.style.display = 'none'
	chartSection.style.display = 'flex'
	chartCloseBtn.style.display = 'flex'

	let card1 = document.querySelector('#card1')
	let card2 = document.querySelector('#card2')
	let playerTotal = card1.value + card2.value

	// One of the player cards is an ace
	if (((card1.value === 11) || (card2.value === 11)) && (card1.value != card2.value)) {
		makeChart(softChart, softBody)
		highlightChoice(softChart, softBody, playerTotal)
	// Player cards are the same and neither are royal
	} else if ((card1.value === card2.value) && (playerTotal <= 18 || playerTotal === 22 || (card1.rank === 10 && card2.rank === 10))) {
		makeChart(splitChart, splitBody)
		highlightChoice(splitChart, splitBody, playerTotal)
	// Different ranked 10s
	} else if (card1.value === 10 && card2.value === 10 && (card1.rank != card2.rank)) {
		makeChart(cardChart, chartBody)
		highlightChoice(cardChart, chartBody, playerTotal)
	// Player cards are both royal
	} else if ((card1.value === card2.value) && (card1.rank === card2.rank) && (card1.rank != 10) && (card2.rank != 10)) {
		makeChart(cardChart, chartBody)
		highlightChoice(cardChart, chartBody, playerTotal)
	// Player cards are different and neither is an ace
	} else if (card1.value != card2.value) {
		makeChart(cardChart, chartBody)
		highlightChoice(cardChart, chartBody, playerTotal)
	}
}

let dcHighlight;
let pcHighlight;
let x;
let y;
let cross;
let handColor;

// Highlights the row, column, and correct move for the current hand
function highlightChoice(chart, location, playerTotal) {
	let dc = document.querySelector('#dealer2').value

	topRowValues.forEach(r => {
		if (dc === r) {
			dcHighlight = location.rows[0].cells[r-1]
			dcHighlight.style.backgroundColor = 'pink'
			x = r-1
		} else if (dc === 11) {
			dcHighlight = location.rows[0].cells[10]
			dcHighlight.style.backgroundColor = 'pink'
			x = 10
		}
	})

	if (chart === cardChart) {
		chart.forEach(c => {
				if (playerTotal === c[0]) {
					pcHighlight = location.rows[18-playerTotal].cells[0]
					pcHighlight.style.backgroundColor = 'pink'
					y = 18-playerTotal
				} else if (playerTotal < 9) {
					pcHighlight = location.rows[10].cells[0]
					pcHighlight.style.backgroundColor = 'pink'
					y = 10
				} else if (playerTotal > 16) {
					pcHighlight = location.rows[1].cells[0]
					pcHighlight.style.backgroundColor = 'pink'
					y = 1
				}
		})
	} else if (chart === softChart) {
		chart.forEach(c => {
			if (playerTotal <= 18) {
				pcHighlight = location.rows[20-playerTotal].cells[0]
				pcHighlight.style.backgroundColor = 'pink'
				y = 20-playerTotal
			} else if (playerTotal >= 19) {
				pcHighlight = location.rows[1].cells[0]
				pcHighlight.style.backgroundColor = 'pink'
				y = 1
			}
		})
	} else if (chart === splitChart) {
		chart.forEach(c => {
			if (playerTotal <= 14) {
				pcHighlight = location.rows[11-(playerTotal/2)].cells[0]
				pcHighlight.style.backgroundColor = 'pink'
				y = 11-(playerTotal/2)
			} else if (playerTotal === 22 || playerTotal === 16) {
				pcHighlight = location.rows[1].cells[0]
				pcHighlight.style.backgroundColor = 'pink'
				y = 1
			} else if (playerTotal === 20) {
				pcHighlight = location.rows[2].cells[0]
				pcHighlight.style.backgroundColor = 'pink'
				y = 2
			} else if (playerTotal === 18) {
				pcHighlight = location.rows[3].cells[0]
				pcHighlight.style.backgroundColor = 'pink'
				y = 3
			}
		})
	}

	cross = location.rows[y].cells[x]
	handColor = cross.style.backgroundColor
	cross.style.backgroundColor = 'pink'
}

// Creates the charts
function makeChart(chart, location) {
	let topRow = document.createElement('tr')
	location.appendChild(topRow)
	topRowValues.forEach(r => {
		let newColumn = document.createElement('td')
		if (r === null) {
			newColumn.style.backgroundColor = 'pink'
			topRow.appendChild(newColumn)
		} else if (r != 0 && r != null) {
			newColumn.innerText = r
			newColumn.style.backgroundColor = 'white'
			topRow.appendChild(newColumn)
		} else {
			newColumn.innerText = ''
			newColumn.style.backgroundColor = 'white'
			topRow.appendChild(newColumn)
		}
	})
	chart.forEach(r => {
		let newRow = document.createElement('tr')
		location.appendChild(newRow)
		r.forEach(c => {
			let newColumn = document.createElement('td')
			let moveChoice = c
			if (c === 0) {
				newColumn.innerText = 'S'
				newColumn.style.backgroundColor = 'green'
			} else if (c === 1) {
				newColumn.innerText = 'H'
				newColumn.style.backgroundColor = 'yellow'
			} else if (c === 2) {
				newColumn.innerText = 'D'
				newColumn.style.backgroundColor = 'red'
			} else if (c === 3) {
				newColumn.innerText = 'Sp'
				newColumn.style.backgroundColor = 'lightblue'
			} else {
				newColumn.innerText = c
				newColumn.style.backgroundColor = 'white'
			}
			newRow.appendChild(newColumn)
		})
	})
}

	// makeChart(cardChart, chartBody)
	// makeChart(softChart, softBody)
	// makeChart(splitChart, splitBody)

// Close chart screen
function closeChart() {
	main.style.display = 'flex'
	chartSection.style.display = 'none'
	dcHighlight.style.backgroundColor = 'white'
	pcHighlight.style.backgroundColor = 'white'
	cross.style.backgroundColor = handColor

	chartBody.innerHTML = ''
	softBody.innerHTML = ''
	splitBody.innerHTML = ''
}