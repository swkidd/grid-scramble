var numRounds = 0;
var startTime = Date.now();
var interval = setInterval(function() {
	var elapsedTime = Date.now() - startTime;
	document.getElementById("timer").innerHTML = (elapsedTime / 1000).toFixed(1);
}, 100);

var gridKeys = [];
const gridKeyCodes = ["Digit1","Digit2","Digit3","KeyQ","KeyW","KeyE","KeyA","KeyS","KeyD","KeyZ","KeyX","KeyC",];
const gridIds = {
	"Digit1": "item11",
	"Digit2": "item12",
	"Digit3": "item13",
	"KeyQ": "item21",
	"KeyW": "item22",
	"KeyE": "item23",
	"KeyA": "item31",
	"KeyS": "item32",
	"KeyD": "item33",
	"KeyZ": "item41",
	"KeyX": "item42",
	"KeyC": "item43"
}
const gridIdList = Object.values(gridIds);
const dirClassNames = {
	"up": "exit-up",
	"left": "exit-left",
	"right": "exit-right",
	"down": "exit-down",
	"in": "exit-in"
}
const dirNames = Object.keys(dirClassNames);
const exitNames = Object.values(dirClassNames);

/* kanji */

let kanji = document.getElementById("kanji");
const kanjiList = [
	{ character: "\u65e5", target: [{ item: "item23", direction: "left"}] }, 
	{ character: "\u6c17", target: [{ item: "item12", direction: "left"}] }, 
]

const randKanji = () => {
	let randIndex = Math.trunc(Math.random() * kanjiList.length);
	return kanjiList[randIndex];
}

/* --- */

var currentGoal = {
	kanji: null,
	item: null,
	direction: null,
	length: 0,
	index: 0,
}

/*
const randItem = () => {
	let randIndex = Math.trunc(Math.random() * gridIdList.length);
	return gridIdList[randIndex];
}

const randDirection = () => {
	let randIndex = Math.trunc(Math.random() * dirNames.length);
	return dirNames[randIndex];
}
*/

const newKanji = () => {
	let k = randKanji();
	return { 
		kanji: k, 
		index: 0, 
		item: k.target[0].item, 
		direction: k.target[0].direction, 
		length: k.target.length
	}
}



const newGoal = () => {
	if (currentGoal.item) {
	    document.getElementById(currentGoal.item).innerText = "";
	}
	if (currentGoal.kanji === null || currentGoal.index === currentGoal.length - 1) {
		currentGoal = newKanji();	
	} else {
		let i = currentGoal.index
		let t = currentGoal.kanji.target[i + 1];
		currentGoal = {...currentGoal, index: i + 1, item: t.item, direction: t.direction } 
	}
        document.getElementById("kanji").innerText = currentGoal.kanji.character;
        document.getElementById(currentGoal.item).innerText = currentGoal.direction[0];
}


var keysClear = function() {
	return gridKeys.length === 0;
}

const handleSwipe = (gridId, direction) => {
	if (numRounds < 10 && currentGoal.item === gridId && currentGoal.direction === direction) {
		let element = document.getElementById(gridId);
		element.classList.remove(...exitNames);
		window.requestAnimationFrame(function() {
			element.classList.add(dirClassNames[direction]);
		});
		newGoal();
		++numRounds;
	} else if (numRounds == 10) {
		clearInterval(interval);
	        document.getElementById(currentGoal.item).innerText = "";
		currentGoal = {};
	}
}

const gridId = () => {
	return gridIds[gridKeys[gridKeys.length - 1]];
}

document.addEventListener('keyup', (e) => {
	gridKeys = gridKeys.filter(k => k != e.code);	
});

document.addEventListener('keydown', function(e){
	if (!keysClear() && e.code === "ArrowUp") {
		handleSwipe(gridId(), "up");
	} else if (!keysClear() && e.code === "ArrowLeft") {
		handleSwipe(gridId(), "left");
	} else if (!keysClear() && e.code === "ArrowRight") {
		handleSwipe(gridId(), "right");
	} else if (!keysClear() && e.code === "ArrowDown") {
		handleSwipe(gridId(), "down");
	} else if (!keysClear() && e.code === "Space") {
		handleSwipe(gridId(), "in");
	} else if (!gridKeys.includes(e.code) && gridKeyCodes.includes(e.code)) {
		gridKeys.push(e.code);
	}
});

newGoal();



