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
let frame = 0;

let humans = [];
let infecteds = [];
let uninfecteds = [];

let countHumans = 50;
let speed = 2.5;

// =========================
	// SIMULATION FUNCTIONS
	// =========================

const wiggle = function(human){
	// console.log(human);
	let d_heading = Math.random()*0.4 - 0.2;
	let heading = parseFloat(human.getAttribute('heading')) + d_heading;
	let dx = Math.cos(heading) * speed;
	let dy = Math.sin(heading) * speed;
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

const infect = function(human){
	human.setAttribute("infectedNext",'yes');
	human.setAttribute("fill","red");
}
const disinfect = function(human){
	human.setAttribute("infectedNext",'no');
	human.removeAttribute("fill");
}

const closeTo = function(a,b){
	let ax,ay,bx,by;
	ax = parseFloat(a.getAttribute('cx'));
	ay = parseFloat(a.getAttribute('cy'));
	bx = parseFloat(b.getAttribute('cx'));
	by = parseFloat(b.getAttribute('cy'));
	let out = Math.abs(ax-bx) < 15 && Math.abs(ay-by) < 15;
	return out;
}

const inVision = function(a,b){
	let ax,ay,bx,by,a_heading;
	ax = parseFloat(a.getAttribute('cx'));
	ay = parseFloat(a.getAttribute('cy'));
	bx = parseFloat(b.getAttribute('cx'));
	by = parseFloat(b.getAttribute('cy'));
	a_heading = parseFloat(a.getAttribute('heading'));
	let theta = Math.atan((by-ay)/(bx-ax))
	if(bx < ax) theta += Math.PI;
	let r = Math.sqrt((by-ay)*(by-ay) + (bx-ax)*(bx-ax));
	return Math.abs( (a_heading - theta) % (2*Math.PI) ) < Math.PI/4 && r < 20;
}

const infectNeighbors = function(human){
	// console.log(svg.children)
	// console.log(svg.children[0]);
	// console.log(human);
	for(let i=0;i<uninfecteds.length;i++){
		if( closeTo( uninfecteds[i], human ) && Math.random() < 0.2
		  ){
			infect(uninfecteds[i]);
		}
	}
}
const avoidNeighbors = function(human){
	if( humans.some( neighbor => inVision(human,neighbor) ) ){
		human.setAttribute( 'heading',parseFloat(human.getAttribute('heading'))+ Math.PI );
	}
}

const go = function(human){
	wiggle(human);
	worldWrap(human);
	if(human.getAttribute('infected')=='yes'){
		infectNeighbors(human);
	}
	avoidNeighbors(human);
}

const update = function(human) {
	if ( human.hasAttribute('infectedNext') ){
		human.setAttribute('infected', human.getAttribute('infectedNext') );
		human.removeAttribute('infectedNext');
	}
}

const dontstep = function(timestamp) {}
const step = function(timestamp) {
	if(id){
		console.log("new step");
		for(let i = 0; i < countHumans; i++){
			// console.log ( svg.children.item(i) );
			go(svg.children.item(i));
		}
		for(let i = 0; i < countHumans; i++){
			update(svg.children.item(i));
		}
		infected = humans.filter(human=>human.getAttribute('infected')=='yes');
		uninfected = humans.filter(human => human.getAttribute('infected')=='no');
		id = window.requestAnimationFrame(step);
	}else{
		console.log("step called without an active frame?");
	}
}

const setup = function(timestamp) {
	if(id){
		console.log("setting up");
		// randomly place and give headings
		for(let i = 0; i < countHumans; i++){
			let human = sampleHuman.cloneNode();
			human.removeAttribute('display');
			human.setAttribute('cx',Math.random()*500);
			human.setAttribute('cy',Math.random()*500);
			human.setAttribute('heading',Math.random()*2*Math.PI);
			human.setAttribute('class','human');
			human.setAttribute('infected','no');
			human.setAttribute('id','human-'+i);
			if ( i == 0 ){ // one human starts out having the disease
				human.setAttribute('infected','yes');
				human.setAttribute('fill','red');
				infecteds.push( human );
			} else {
				uninfecteds.push( human );
			}
			humans.push( human );
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
