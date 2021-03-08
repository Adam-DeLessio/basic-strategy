let chartRevealBtn = document.querySelector('#chartRevealBtn')
let chartBody = document.querySelector('#chart-body')

function revealChart() {
	let main = document.querySelector('#main')
	let chartSection = document.querySelector('#chart-section')
	main.style.display = 'none'
	chartSection.style.display = 'flex'

	makeChart()
}

function makeChart(playerCards) {
	let chartBody = document.querySelector('#chart-body')
	for (let i=0; i<8; i++) {
		let newRow = document.createElement('tr')
		newRow.innerText = 'new row'
		chartBody.appendChild(newRow)
	}
}