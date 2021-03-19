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
}