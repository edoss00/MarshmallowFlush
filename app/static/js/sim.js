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
let lastTimestamp = 0;

let countHumans = 1;

	// =========================
	// SIMULATION FUNCTIONS
	// =========================

const wiggle = function(human){
	// console.log(human);
	let d_heading = Math.random()*0.4 - 0.2;
	let heading = parseFloat(human.getAttribute('heading')) + d_heading;
	let dx = Math.cos(heading) * 5;
	let dy = Math.sin(heading) * 5;
	let cx = parseFloat(human.getAttribute('cx')) + dx;
	let cy = parseFloat(human.getAttribute('cy')) + dy;
	human.setAttribute('cx',cx);
	human.setAttribute('cy',cy);
	human.setAttribute('heading',heading);
}

const worldWrap = function(human){
	let cx = parseFloat(human.getAttribute('cx'));
	let cy = parseFloat(human.getAttribute('cy'));

	if(cx > 500) cx = cx - 500;
	if(cx < 0)   cx = cx + 500;
	if(cy > 500) cy = cy - 500;
	if(cy < 0)   cy = cy + 500;

	human.setAttribute('cx',cx);
	human.setAttribute('cy',cy);
}

const go = function(human){
	wiggle(human);
	worldWrap(human);
}

const step = function(timestamp) {
	if(id){
		console.log("new step");
		for(let i = 0; i < countHumans; i++){
			// console.log ( svg.children.item(i) );
			go(svg.children.item(i));
		}
		
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
			human.setAttribute('heading',Math.random()*2*Math.PI);
			svg.appendChild(human);
		}
		id = window.requestAnimationFrame(step);
		setupComplete = true;
	}else{
		console.log("setup called without an active frame");
	}
	lastTimestamp = timestamp;
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
