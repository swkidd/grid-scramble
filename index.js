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

var currentGoal = {
	item: null,
	direction: '',
}

const randItem = () => {
	let randIndex = Math.trunc(Math.random() * gridIdList.length);
	return gridIdList[randIndex];
}

const randDirection = () => {
	let randIndex = Math.trunc(Math.random() * dirNames.length);
	return dirNames[randIndex];
}

const newGoal = () => {
	if (currentGoal.item) {
	    document.getElementById(currentGoal.item).innerText = "";
	}
	currentGoal = { item: randItem(), direction: randDirection() };
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
	} else if (gridKeyCodes.includes(e.code)) {
		gridKeys.push(e.code);
	}
});

newGoal();
