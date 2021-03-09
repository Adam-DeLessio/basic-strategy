let chartRevealBtn = document.querySelector('#chartRevealBtn')
let chartBody = document.querySelector('#chart-body')

let topRowValues = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'A']
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

function revealChart() {
	let main = document.querySelector('#main')
	let chartSection = document.querySelector('#chart-section')
	main.style.display = 'none'
	chartSection.style.display = 'flex'

	makeChart()
}

function makeChart(playerCards) {
	let chartBody = document.querySelector('#chart-body')
	let topRow = document.createElement('tr')
	chartBody.appendChild(topRow)
	topRowValues.forEach(r => {
		let newColumn = document.createElement('td')
		if (r != 0) {
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