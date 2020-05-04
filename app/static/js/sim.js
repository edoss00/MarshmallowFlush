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
svg.removeChild(sampleHuman);
	// =========================
	// GLOBAL VARIABLES
	// =========================

let id = 0;
let setupComplete = false;

let countHumans = 255;

	// =========================
	// SIMULATION FUNCTIONS
	// =========================

const wiggle = function(human_elt){
	
}

const step = function(timestamp) {
	if(id){
		console.log("new step");
		let humans = svg.getElementsByClassName("circle");
		for( human in humans ) wiggle(human);
		
		id = window.requestAnimationFrame(step);
	}else{
		console.log("step called without an active frame?");
	}
}

const setup = function(timestamp) {
	if(id){
		console.log("setting up");
		for(let i = 0; i < countHumans; i++){
			let human = sampleHuman.cloneNode();
			human.removeAttribute('display');
			human.setAttribute('cx',Math.random()*500);
			human.setAttribute('cy',Math.random()*500);
			svg.appendChild(human);
		}
		id = window.requestAnimationFrame(step);
		setupComplete = true;
	}else{
		console.log("setup called without an active frame");
	}
}
	// =========================
	// EVENT LISTENER FUNCTIONS
	// =========================
	
const start_stop = function(e) {
	e.preventDefault();
	if ( !id ){
		const callback = setupComplete ? step : setup;
		id = window.requestAnimationFrame(callback);
		e.target.textContent = "Stop";
		console.log(e.target.textContent);
	}else{
		window.cancelAnimationFrame(id);
		id = 0;
		e.target.textContent = "Start";
	}
}

	// =========================
	// ATTACH EVENT LISTENERS
	// =========================


startButton.addEventListener('click',start_stop);
