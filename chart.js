let chartRevealBtn = document.querySelector('#chartRevealBtn')
let body = document.querySelector('#body')
let chartBody = document.querySelector('#chart-body')
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

// Reveal chart button
function revealChart() {
	let main = document.querySelector('#main')
	main.style.display = 'none'
	chartSection.style.display = 'flex'
	chartCloseBtn.style.display = 'flex'

	highlightChoice()
}

let dcHighlight;
let pcHighlight;
function highlightChoice() {
	let card1 = document.querySelector('#card1').value
	let card2 = document.querySelector('#card2').value
	let dc = document.querySelector('#dealer2').value

	let playerTotal = card1 + card2

	topRowValues.forEach(r => {
		if (dc === r) {
			dcHighlight = chartBody.rows[0].cells[r-1]
			dcHighlight.style.backgroundColor = 'black'
		} else if (dc === 11) {
			dcHighlight = chartBody.rows[0].cells[10]
			dcHighlight.style.backgroundColor = 'black'
		}
	})
	cardChart.forEach(c => {
			if (playerTotal === c[0]) {
				pcHighlight = chartBody.rows[18-playerTotal].cells[0]
				pcHighlight.style.backgroundColor = 'black'
			} else if (playerTotal < 9) {
				pcHighlight = chartBody.rows[10].cells[0]
				pcHighlight.style.backgroundColor = 'black'
			} else if (playerTotal > 16) {
				pcHighlight = chartBody.rows[1].cells[0]
				pcHighlight.style.backgroundColor = 'black'
			}
	})
}





















// Creates the charts when the program loads
function makeChart(playerCards) {
	let chartBody = document.querySelector('#chart-body')
	let topRow = document.createElement('tr')
	chartBody.appendChild(topRow)
	topRowValues.forEach(r => {
		let newColumn = document.createElement('td')
		if (r === null) {
			newColumn.style.backgroundColor = 'black'
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
	cardChart.forEach(r => {
		let newRow = document.createElement('tr')
		chartBody.appendChild(newRow)
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
			} else {
				newColumn.innerText = c
				newColumn.style.backgroundColor = 'white'
			}
			newRow.appendChild(newColumn)
		})
	})
}
makeChart()

// Close chart screen
function closeChart() {
	main.style.display = 'flex'
	chartSection.style.display = 'none'
	dcHighlight.style.backgroundColor = 'white'
	pcHighlight.style.backgroundColor = 'white'
}