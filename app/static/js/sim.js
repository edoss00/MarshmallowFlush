// Marshmallow Fluffsh
// Softdev2 pd1
// 2020-04-29
// Virus Spread Simulation

console.log("sim.js connected");

	// =========================
	// ELEMENT SELECTORS
	// =========================


const startButton = document.getElementById("start-button");
const svg = document.getElementById("sim-svg");
const sampleHuman = document.getElementById("sample-human");

	// =========================
	// GLOBAL VARIABLES
	// =========================

let id = 0;

	// =========================
	// SIMULATION FUNCTIONS
	// =========================

const step = function(timestamp) {
	if(id){
		console.log("new step");


		id = window.requestAnimationFrame(step);
	}else{
		console.log("step called without an active frame?");
	}
}
	// =========================
	// EVENT LISTENER FUNCTIONS
	// =========================
	
const start = function(e) {
	e.preventDefault();
	if ( !id ){
		id = window.requestAnimationFrame(step);
	}
}

	// =========================
	// ATTACH EVENT LISTENERS
	// =========================


startButton.addEventListener('click',start);
