let chartRevealBtn = document.querySelector('#chartRevealBtn')
let chartBody = document.querySelector('#chart-body')

let cardChart = [
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

function revealChart() {
	let main = document.querySelector('#main')
	let chartSection = document.querySelector('#chart-section')
	main.style.display = 'none'
	chartSection.style.display = 'flex'

	makeChart()
}

function makeChart(playerCards) {
	let chartBody = document.querySelector('#chart-body')

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
			}
			newRow.appendChild(newColumn)
		})
	})



	// for (let i=0; i<8; i++) {
	// 	let newRow = document.createElement('tr')
	// 	newRow.innerText = 'new row'
	// 	chartBody.appendChild(newRow)
	// }
}