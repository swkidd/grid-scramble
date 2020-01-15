var numRounds = 0;
var streak = 0;
/*var startTime = Date.now();
var interval = setInterval(function() {
	var elapsedTime = Date.now() - startTime;
	document.getElementById("timer").innerHTML = (elapsedTime / 1000).toFixed(1);
}, 100);*/

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

const dirArrows = {
	"up": "\u21e7",
	"left": "\u21e6",
	"right": "\u21e8",
	"down": "\u21e9",
	"in": "\u2b22"
}

/* kanji */

let kanji = document.getElementById("kanji");
/*const kanjiList = [
	{ character: "\u65e5", target: [{ item: "item23", direction: "left"}] }, 
	{ character: "\u6c17", target: [{ item: "item12", direction: "left"}] }, 
	{ character: "\u540d", target: [{ item: "item22", direction: "in"}] }, 
	{ character: "\u6642", target: [{ item: "item21", direction: "down"}, { item: "item12", direction: "left"}] }, 
	{ character: "\u5e74", target: [{ item: "item21", direction: "down"}, { item: "item13", direction: "left"}] }, 
	{ character: "\u540c", target: [{ item: "item21", direction: "down"}, { item: "item42", direction: "in"}, { item: "item11", direction: "up" }] }, 
	{ character: "\u4f1a", target: [{ item: "item11", direction: "in"}, { item: "item11", direction: "left"}] }, 
	{ character: "\u81ea", target: [{ item: "item13", direction: "left"}, { item: "item42", direction: "in"}] }, 
	{ character: "\u8005", target: [{ item: "item13", direction: "left"}, { item: "item32", direction: "in"}, { item: "item41", direction: "in"}] }, 
]*/

const kanjiList = [{ character: '\u60AA', target: [{ item: 'item11', direction: 'in' }, { item: 'item12', direction: 'up' }]},
{ character: '\u6697', target: [{ item: 'item11', direction: 'in' }, { item: 'item32', direction: 'right' }]},
{ character: '\u533B', target: [{ item: 'item11', direction: 'left' }]},
{ character: '\u610F', target: [{ item: 'item11', direction: 'left' }]},
{ character: '\u4EE5', target: [{ item: 'item11', direction: 'left' }]},
{ character: '\u5F15', target: [{ item: 'item11', direction: 'left' }, { item: 'item32', direction: 'right' }]},
{ character: '\u9662', target: [{ item: 'item11', direction: 'left' }, { item: 'item32', direction: 'right' }]},
{ character: '\u54E1', target: [{ item: 'item11', direction: 'left' }, { item: 'item32', direction: 'right' }]},
{ character: '\u904B', target: [{ item: 'item11', direction: 'up' }, { item: 'item32', direction: 'right' }]},
{ character: '\u82F1', target: [{ item: 'item11', direction: 'right' }, { item: 'item11', direction: 'left' }]},
{ character: '\u6620', target: [{ item: 'item11', direction: 'right' }, { item: 'item11', direction: 'left' }]},
{ character: '\u9060', target: [{ item: 'item11', direction: 'right' }, { item: 'item32', direction: 'right' }]},
{ character: '\u5C4B', target: [{ item: 'item11', direction: 'down' }, { item: 'item12', direction: 'up' }]},
{ character: '\u97F3', target: [{ item: 'item11', direction: 'down' }, { item: 'item32', direction: 'right' }]},
{ character: '\u6B4C', target: [{ item: 'item12', direction: 'in' }]},
{ character: '\u590F', target: [{ item: 'item12', direction: 'in' }]},
{ character: '\u5BB6', target: [{ item: 'item12', direction: 'in' }]},
{ character: '\u753B', target: [{ item: 'item12', direction: 'in' }, { item: 'item42', direction: 'in' }]},
{ character: '\u6D77', target: [{ item: 'item12', direction: 'in' }, { item: 'item11', direction: 'left' }]},
{ character: '\u56DE', target: [{ item: 'item12', direction: 'in' }, { item: 'item11', direction: 'left' }]},
{ character: '\u958B', target: [{ item: 'item12', direction: 'in' }, { item: 'item11', direction: 'left' }]},
{ character: '\u754C', target: [{ item: 'item12', direction: 'in' }, { item: 'item11', direction: 'left' }]},
{ character: '\u697D', target: [{ item: 'item12', direction: 'in' }, { item: 'item42', direction: 'in' }, { item: 'item12', direction: 'up' }]},
{ character: '\u9928', target: [{ item: 'item12', direction: 'in' }, { item: 'item32', direction: 'right' }]},
{ character: '\u6F22', target: [{ item: 'item12', direction: 'in' }, { item: 'item32', direction: 'right' }]},
{ character: '\u5BD2', target: [{ item: 'item12', direction: 'in' }, { item: 'item32', direction: 'right' }]},
{ character: '\u9854', target: [{ item: 'item12', direction: 'in' }, { item: 'item42', direction: 'in' }, { item: 'item32', direction: 'right' }]},
{ character: '\u5E30', target: [{ item: 'item12', direction: 'left' }]},
{ character: '\u8D77', target: [{ item: 'item12', direction: 'left' }]},
{ character: '\u7A76', target: [{ item: 'item12', direction: 'left' }, { item: 'item32', direction: 'up' }, { item: 'item41', direction: 'in' }, { item: 'item11', direction: 'up' }]},
{ character: '\u6025', target: [{ item: 'item12', direction: 'left' }, { item: 'item32', direction: 'up' }, { item: 'item41', direction: 'in' }, { item: 'item11', direction: 'up' }]},
{ character: '\u725B', target: [{ item: 'item12', direction: 'left' }, { item: 'item42', direction: 'in' }, { item: 'item32', direction: 'up' }, { item: 'item41', direction: 'in' }, { item: 'item11', direction: 'up' }]},
{ character: '\u53BB', target: [{ item: 'item12', direction: 'left' }, { item: 'item32', direction: 'down' }, { item: 'item41', direction: 'in' }]},
{ character: '\u5F37', target: [{ item: 'item12', direction: 'left' }, { item: 'item32', direction: 'down' }, { item: 'item41', direction: 'in' }, { item: 'item11', direction: 'up' }]},
{ character: '\u6559', target: [{ item: 'item12', direction: 'left' }, { item: 'item32', direction: 'down' }, { item: 'item41', direction: 'in' }, { item: 'item11', direction: 'up' }]},
{ character: '\u4EAC', target: [{ item: 'item12', direction: 'left' }, { item: 'item32', direction: 'down' }, { item: 'item41', direction: 'in' }, { item: 'item11', direction: 'up' }]},
{ character: '\u696D', target: [{ item: 'item12', direction: 'left' }, { item: 'item42', direction: 'in' }, { item: 'item32', direction: 'down' }, { item: 'item41', direction: 'in' }, { item: 'item11', direction: 'up' }]},
{ character: '\u8FD1', target: [{ item: 'item12', direction: 'left' }, { item: 'item32', direction: 'right' }]},
{ character: '\u9280', target: [{ item: 'item12', direction: 'left' }, { item: 'item42', direction: 'in' }, { item: 'item32', direction: 'right' }]},
{ character: '\u533A', target: [{ item: 'item12', direction: 'up' }]},
{ character: '\u8A08', target: [{ item: 'item12', direction: 'right' }, { item: 'item11', direction: 'left' }]},
{ character: '\u5144', target: [{ item: 'item12', direction: 'right' }, { item: 'item11', direction: 'left' }]},
{ character: '\u8EFD', target: [{ item: 'item12', direction: 'right' }, { item: 'item11', direction: 'left' }]},
{ character: '\u75AC', target: [{ item: 'item12', direction: 'right' }, { item: 'item32', direction: 'right' }]},
{ character: '\u7814', target: [{ item: 'item12', direction: 'right' }, { item: 'item32', direction: 'right' }]},
{ character: '\u770C', target: [{ item: 'item12', direction: 'right' }, { item: 'item32', direction: 'right' }]},
{ character: '\u5EFA', target: [{ item: 'item12', direction: 'right' }, { item: 'item32', direction: 'right' }]},
{ character: '\u9A13', target: [{ item: 'item12', direction: 'right' }, { item: 'item32', direction: 'right' }]},
{ character: '\u5143', target: [{ item: 'item12', direction: 'right' }, { item: 'item42', direction: 'in' }, { item: 'item32', direction: 'right' }]},
{ character: '\u5DE5', target: [{ item: 'item12', direction: 'down' }, { item: 'item11', direction: 'up' }]},
{ character: '\u5A83', target: [{ item: 'item12', direction: 'down' }, { item: 'item11', direction: 'up' }]},
{ character: '\u8003', target: [{ item: 'item12', direction: 'down' }, { item: 'item11', direction: 'up' }]},
{ character: '\u5149', target: [{ item: 'item12', direction: 'down' }, { item: 'item11', direction: 'up' }]},
{ character: '\u597D', target: [{ item: 'item12', direction: 'down' }, { item: 'item11', direction: 'up' }]},
{ character: '\u5408', target: [{ item: 'item12', direction: 'down' }, { item: 'item42', direction: 'in' }, { item: 'item11', direction: 'up' }]},
{ character: '\u9ED2', target: [{ item: 'item12', direction: 'down' }, { item: 'item12', direction: 'up' }]},
{ character: '\u83DC', target: [{ item: 'item13', direction: 'in' }, { item: 'item11', direction: 'left' }]},
{ character: '\u4F5C', target: [{ item: 'item13', direction: 'in' }, { item: 'item12', direction: 'up' }]},
{ character: '\u7523', target: [{ item: 'item13', direction: 'in' }, { item: 'item32', direction: 'right' }]},
{ character: '\u7D19', target: [{ item: 'item13', direction: 'left' }]},
{ character: '\u601D', target: [{ item: 'item13', direction: 'left' }]},
{ character: '\u59C9', target: [{ item: 'item13', direction: 'left' }]},
{ character: '\u6B62', target: [{ item: 'item13', direction: 'left' }]},
{ character: '\u5E02', target: [{ item: 'item13', direction: 'left' }]},
{ character: '\u4ED5', target: [{ item: 'item13', direction: 'left' }]},
{ character: '\u6B7B', target: [{ item: 'item13', direction: 'left' }]},
{ character: '\u4F7F', target: [{ item: 'item13', direction: 'left' }]},
{ character: '\u59CB', target: [{ item: 'item13', direction: 'left' }]},
{ character: '\u8A66', target: [{ item: 'item13', direction: 'left' }]},
{ character: '\u79C1', target: [{ item: 'item13', direction: 'left' }]},
{ character: '\u5B57', target: [{ item: 'item13', direction: 'left' }, { item: 'item42', direction: 'in' }]},
{ character: '\u81EA', target: [{ item: 'item13', direction: 'left' }, { item: 'item42', direction: 'in' }]},
{ character: '\u4E8B', target: [{ item: 'item13', direction: 'left' }, { item: 'item42', direction: 'in' }]},
{ character: '\u6301', target: [{ item: 'item13', direction: 'left' }, { item: 'item42', direction: 'in' }]},
{ character: '\u5BA4', target: [{ item: 'item13', direction: 'left' }, { item: 'item21', direction: 'up' },]},
{ character: '\u8CEA', target: [{ item: 'item13', direction: 'left' }, { item: 'item21', direction: 'up' },]},
{ character: '\u5199', target: [{ item: 'item13', direction: 'left' }, { item: 'item32', direction: 'in' }, { item: 'item41', direction: 'in' }]},
{ character: '\u8005', target: [{ item: 'item13', direction: 'left' }, { item: 'item32', direction: 'in' }, { item: 'item41', direction: 'in' }]},
{ character: '\u501F', target: [{ item: 'item13', direction: 'left' }, { item: 'item32', direction: 'in' }, { item: 'item41', direction: 'in' }, { item: 'item12', direction: 'up' }]},
{ character: '\u5F31', target: [{ item: 'item13', direction: 'left' }, { item: 'item42', direction: 'in' }, { item: 'item32', direction: 'in' }, { item: 'item41', direction: 'in' }, { item: 'item12', direction: 'up' }]},
{ character: '\u9996', target: [{ item: 'item13', direction: 'left' }, { item: 'item32', direction: 'up' }, { item: 'item41', direction: 'in' }]},
{ character: '\u4E3B', target: [{ item: 'item13', direction: 'left' }, { item: 'item32', direction: 'up' }, { item: 'item41', direction: 'in' }]},
{ character: '\u79CB', target: [{ item: 'item13', direction: 'left' }, { item: 'item32', direction: 'up' }, { item: 'item41', direction: 'in' }, { item: 'item11', direction: 'up' }]},
{ character: '\u96C6', target: [{ item: 'item13', direction: 'left' }, { item: 'item32', direction: 'up' }, { item: 'item41', direction: 'in' }, { item: 'item11', direction: 'up' }]},
{ character: '\u7FD2', target: [{ item: 'item13', direction: 'left' }, { item: 'item32', direction: 'up' }, { item: 'item41', direction: 'in' }, { item: 'item11', direction: 'up' }]},
{ character: '\u7D42', target: [{ item: 'item13', direction: 'left' }, { item: 'item32', direction: 'up' }, { item: 'item41', direction: 'in' }, { item: 'item11', direction: 'up' }]},
{ character: '\u4F4F', target: [{ item: 'item13', direction: 'left' }, { item: 'item42', direction: 'in' }, { item: 'item32', direction: 'up' }, { item: 'item41', direction: 'in' }, { item: 'item11', direction: 'up' }]},
{ character: '\u91CD', target: [{ item: 'item13', direction: 'left' }, { item: 'item42', direction: 'in' }, { item: 'item32', direction: 'up' }, { item: 'item41', direction: 'in' }, { item: 'item11', direction: 'up' }]},
{ character: '\u6625', target: [{ item: 'item13', direction: 'left' }, { item: 'item32', direction: 'up' }, { item: 'item41', direction: 'in' }, { item: 'item32', direction: 'right' }]},
{ character: '\u6240', target: [{ item: 'item13', direction: 'left' }, { item: 'item32', direction: 'down' }, { item: 'item41', direction: 'in' }]},
{ character: '\u6691', target: [{ item: 'item13', direction: 'left' }, { item: 'item32', direction: 'down' }, { item: 'item41', direction: 'in' }]},
{ character: '\u5834', target: [{ item: 'item13', direction: 'left' }, { item: 'item42', direction: 'in' }, { item: 'item32', direction: 'down' }, { item: 'item41', direction: 'in' }, { item: 'item11', direction: 'up' }]},
{ character: '\u4E57', target: [{ item: 'item13', direction: 'left' }, { item: 'item42', direction: 'in' }, { item: 'item32', direction: 'down' }, { item: 'item41', direction: 'in' }, { item: 'item11', direction: 'up' }]},
{ character: '\u8272', target: [{ item: 'item13', direction: 'left' }, { item: 'item32', direction: 'down' }, { item: 'item41', direction: 'in' }, { item: 'item12', direction: 'up' }]},
{ character: '\u68EE', target: [{ item: 'item13', direction: 'left' }, { item: 'item32', direction: 'right' }]},
{ character: '\u5FC3', target: [{ item: 'item13', direction: 'left' }, { item: 'item32', direction: 'right' }]},
{ character: '\u89AA', target: [{ item: 'item13', direction: 'left' }, { item: 'item32', direction: 'right' }]},
{ character: '\u771F', target: [{ item: 'item13', direction: 'left' }, { item: 'item32', direction: 'right' }]},
{ character: '\u9032', target: [{ item: 'item13', direction: 'left' }, { item: 'item32', direction: 'right' }]},
{ character: '\u56F3', target: [{ item: 'item13', direction: 'up' }, { item: 'item42', direction: 'in' }]},
{ character: '\u9752', target: [{ item: 'item13', direction: 'right' }, { item: 'item11', direction: 'left' }]},
{ character: '\u6B63', target: [{ item: 'item13', direction: 'right' }, { item: 'item11', direction: 'left' }]},
{ character: '\u58F0', target: [{ item: 'item13', direction: 'right' }, { item: 'item11', direction: 'left' }]},
{ character: '\u4E16', target: [{ item: 'item13', direction: 'right' }, { item: 'item11', direction: 'left' }]},
{ character: '\u8D64', target: [{ item: 'item13', direction: 'right' }, { item: 'item12', direction: 'left' }]},
{ character: '\u5915', target: [{ item: 'item13', direction: 'right' }, { item: 'item12', direction: 'left' }]},
{ character: '\u5207', target: [{ item: 'item13', direction: 'right' }, { item: 'item21', direction: 'up' },]},
{ character: '\u8AAC', target: [{ item: 'item13', direction: 'right' }, { item: 'item21', direction: 'up' },]},
{ character: '\u6D17', target: [{ item: 'item13', direction: 'right' }, { item: 'item32', direction: 'right' }]},
{ character: '\u65E9', target: [{ item: 'item13', direction: 'down' }, { item: 'item11', direction: 'up' }]},
{ character: '\u8D70', target: [{ item: 'item13', direction: 'down' }, { item: 'item11', direction: 'up' }]},
{ character: '\u9001', target: [{ item: 'item13', direction: 'down' }, { item: 'item11', direction: 'up' }]},
{ character: '\u65CF', target: [{ item: 'item13', direction: 'down' }, { item: 'item42', direction: 'in' }, { item: 'item12', direction: 'up' }]},
{ character: '\u6751', target: [{ item: 'item13', direction: 'down' }, { item: 'item32', direction: 'right' }]},
{ character: '\u4F53', target: [{ item: 'item21', direction: 'in' }, { item: 'item42', direction: 'in' }, { item: 'item11', direction: 'left' }]},
{ character: '\u592A', target: [{ item: 'item21', direction: 'in' }, { item: 'item42', direction: 'in' }, { item: 'item11', direction: 'left' }]},
{ character: '\u5F85', target: [{ item: 'item21', direction: 'in' }, { item: 'item42', direction: 'in' }, { item: 'item11', direction: 'left' }]},
{ character: '\u8CB8', target: [{ item: 'item21', direction: 'in' }, { item: 'item42', direction: 'in' }, { item: 'item11', direction: 'left' }]},
{ character: '\u53F0', target: [{ item: 'item21', direction: 'in' }, { item: 'item42', direction: 'in' }, { item: 'item11', direction: 'left' }]},
{ character: '\u4EE3', target: [{ item: 'item21', direction: 'in' }, { item: 'item42', direction: 'in' }, { item: 'item11', direction: 'left' }]},
{ character: '\u984C', target: [{ item: 'item21', direction: 'in' }, { item: 'item42', direction: 'in' }, { item: 'item11', direction: 'left' }]},
{ character: '\u77ED', target: [{ item: 'item21', direction: 'in' }, { item: 'item42', direction: 'in' }, { item: 'item32', direction: 'right' }]},
{ character: '\u77E5', target: [{ item: 'item21', direction: 'left' },]},
{ character: '\u5730', target: [{ item: 'item21', direction: 'left' },]},
{ character: '\u6C60', target: [{ item: 'item21', direction: 'left' },]},
{ character: '\u8336', target: [{ item: 'item21', direction: 'left' }, { item: 'item32', direction: 'in' }, { item: 'item41', direction: 'in' }]},
{ character: '\u7740', target: [{ item: 'item21', direction: 'left' }, { item: 'item32', direction: 'in' }, { item: 'item41', direction: 'in' }, { item: 'item12', direction: 'up' }]},
{ character: '\u663C', target: [{ item: 'item21', direction: 'left' }, { item: 'item32', direction: 'up' }, { item: 'item41', direction: 'in' }, { item: 'item11', direction: 'up' }]},
{ character: '\u6CE8', target: [{ item: 'item21', direction: 'left' }, { item: 'item32', direction: 'up' }, { item: 'item41', direction: 'in' }, { item: 'item11', direction: 'up' }]},
{ character: '\u753A', target: [{ item: 'item21', direction: 'left' }, { item: 'item32', direction: 'down' }, { item: 'item41', direction: 'in' }, { item: 'item11', direction: 'up' }]},
{ character: '\u9CE5', target: [{ item: 'item21', direction: 'left' }, { item: 'item32', direction: 'down' }, { item: 'item41', direction: 'in' }, { item: 'item11', direction: 'up' }]},
{ character: '\u671D', target: [{ item: 'item21', direction: 'left' }, { item: 'item32', direction: 'down' }, { item: 'item41', direction: 'in' }, { item: 'item11', direction: 'up' }]},
{ character: '\u901A', target: [{ item: 'item21', direction: 'up' },  { item: 'item11', direction: 'up' }]},
{ character: '\u5F1F', target: [{ item: 'item21', direction: 'right' }, { item: 'item42', direction: 'in' }, { item: 'item11', direction: 'left' }]},
{ character: '\u4F4E', target: [{ item: 'item21', direction: 'right' }, { item: 'item42', direction: 'in' }, { item: 'item11', direction: 'left' }]},
{ character: '\u8EE2', target: [{ item: 'item21', direction: 'right' }, { item: 'item42', direction: 'in' }, { item: 'item32', direction: 'right' }]},
{ character: '\u7530', target: [{ item: 'item21', direction: 'right' }, { item: 'item42', direction: 'in' }, { item: 'item32', direction: 'right' }]},
{ character: '\u90FD', target: [{ item: 'item21', direction: 'down' }, { item: 'item42', direction: 'in' }]},
{ character: '\u5EA8', target: [{ item: 'item21', direction: 'down' }, { item: 'item42', direction: 'in' }]},
{ character: '\u7B54', target: [{ item: 'item21', direction: 'down' }, { item: 'item42', direction: 'in' }, { item: 'item11', direction: 'up' }]},
{ character: '\u51AC', target: [{ item: 'item21', direction: 'down' }, { item: 'item42', direction: 'in' }, { item: 'item11', direction: 'up' }]},
{ character: '\u982D', target: [{ item: 'item21', direction: 'down' }, { item: 'item42', direction: 'in' }, { item: 'item11', direction: 'up' }]},
{ character: '\u540C', target: [{ item: 'item21', direction: 'down' }, { item: 'item42', direction: 'in' }, { item: 'item11', direction: 'up' }]},
{ character: '\u52D5', target: [{ item: 'item21', direction: 'down' }, { item: 'item42', direction: 'in' }, { item: 'item11', direction: 'up' }]},
{ character: '\u5802', target: [{ item: 'item21', direction: 'down' }, { item: 'item42', direction: 'in' }, { item: 'item11', direction: 'up' }]},
{ character: '\u50CD', target: [{ item: 'item21', direction: 'down' }, { item: 'item42', direction: 'in' }, { item: 'item11', direction: 'up' }]},
{ character: '\u7279', target: [{ item: 'item21', direction: 'down' }, { item: 'item42', direction: 'in' }, { item: 'item12', direction: 'up' }]},
{ character: '\u8089', target: [{ item: 'item22', direction: 'left' }, { item: 'item12', direction: 'up' }]},
{ character: '\u58F2', target: [{ item: 'item23', direction: 'in' }, { item: 'item42', direction: 'in' }, { item: 'item11', direction: 'left' }]},
{ character: '\u767A', target: [{ item: 'item23', direction: 'in' }, { item: 'item21', direction: 'up' },]},
{ character: '\u98EF', target: [{ item: 'item23', direction: 'in' }, { item: 'item32', direction: 'right' }]},
{ character: '\u75C5', target: [{ item: 'item23', direction: 'left' }, { item: 'item42', direction: 'in' }, { item: 'item32', direction: 'down' }, { item: 'item41', direction: 'in' }, { item: 'item11', direction: 'up' }]},
{ character: '\u54C1', target: [{ item: 'item23', direction: 'left' }, { item: 'item32', direction: 'right' }]},
{ character: '\u4E0D', target: [{ item: 'item23', direction: 'up' }]},
{ character: '\u98A8', target: [{ item: 'item23', direction: 'up' }, { item: 'item11', direction: 'up' }]},
{ character: '\u670D', target: [{ item: 'item23', direction: 'up' }, { item: 'item12', direction: 'up' }]},
{ character: '\u7269', target: [{ item: 'item23', direction: 'up' }, { item: 'item42', direction: 'in' }, { item: 'item21', direction: 'up' },]},
{ character: '\u6587', target: [{ item: 'item23', direction: 'up' }, { item: 'item42', direction: 'in' }, { item: 'item32', direction: 'right' }]},
{ character: '\u5225', target: [{ item: 'item23', direction: 'right' }, { item: 'item42', direction: 'in' }, { item: 'item21', direction: 'up' },]},
{ character: '\u52C9', target: [{ item: 'item23', direction: 'right' }, { item: 'item42', direction: 'in' }, { item: 'item32', direction: 'right' }]},
{ character: '\u4FBF', target: [{ item: 'item23', direction: 'right' }, { item: 'item42', direction: 'in' }, { item: 'item32', direction: 'right' }]},
{ character: '\u6B69', target: [{ item: 'item23', direction: 'down' }]},
{ character: '\u65B9', target: [{ item: 'item23', direction: 'down' }, { item: 'item11', direction: 'up' }]},
{ character: '\u59B9', target: [{ item: 'item31', direction: 'in' }, { item: 'item11', direction: 'left' }]},
{ character: '\u5473', target: [{ item: 'item31', direction: 'left' }]},
{ character: '\u6C11', target: [{ item: 'item31', direction: 'left' }, { item: 'item32', direction: 'right' }]},
{ character: '\u660E', target: [{ item: 'item31', direction: 'right' }, { item: 'item11', direction: 'left' }]},
{ character: '\u9580', target: [{ item: 'item31', direction: 'down' }, { item: 'item32', direction: 'right' }]},
{ character: '\u554F', target: [{ item: 'item31', direction: 'down' }, { item: 'item32', direction: 'right' }]},
{ character: '\u591C', target: [{ item: 'item31', direction: 'in' }]},
{ character: '\u91CE', target: [{ item: 'item31', direction: 'in' }]},
{ character: '\u85AC', target: [{ item: 'item31', direction: 'in' }, { item: 'item12', direction: 'up' }]},
{ character: '\u6709', target: [{ item: 'item32', direction: 'up' }, { item: 'item11', direction: 'up' }]},
{ character: '\u66DC', target: [{ item: 'item32', direction: 'down' }, { item: 'item11', direction: 'up' }]},
{ character: '\u7528', target: [{ item: 'item32', direction: 'down' }, { item: 'item11', direction: 'up' }]},
{ character: '\u6D0B', target: [{ item: 'item32', direction: 'down' }, { item: 'item11', direction: 'up' }]},
{ character: '\u7406', target: [{ item: 'item33', direction: 'left' }]},
{ character: '\u65C5', target: [{ item: 'item33', direction: 'left' }, { item: 'item32', direction: 'down' }, { item: 'item41', direction: 'in' }]},
{ character: '\u6599', target: [{ item: 'item33', direction: 'left' }, { item: 'item32', direction: 'down' }, { item: 'item41', direction: 'in' }, { item: 'item11', direction: 'up' }]},
{ character: '\u529B', target: [{ item: 'item33', direction: 'left' }, { item: 'item32', direction: 'down' }, { item: 'item41', direction: 'in' }, { item: 'item12', direction: 'up' }]},
{ character: '\u6797', target: [{ item: 'item33', direction: 'left' }, { item: 'item32', direction: 'right' }]}]

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

var show = true;
const newKanji = () => {
	let ck = currentGoal.kanji;
	let k = randKanji();
	while (ck && (k.character === ck.character || k.target.length != 2)) {
		k = randKanji();
	}
        if (numRounds == 10) {
		numRounds = 0;
		show = !show;
	} else {
		++numRounds;
	}

	/* hide irrelevant items */
	for (let i = 0; i < gridIdList.length; ++i) {
		document.getElementById(gridIdList[i]).style["background-color"] = "#123333";
	}
	for (let i = 0; i < k.target.length; ++i) {
		document.getElementById(k.target[i].item).style["background-color"] = "#333333";
	}
	++streak;
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
        show && (document.getElementById(currentGoal.item).innerText = dirArrows[currentGoal.direction]);
}


var keysClear = function() {
	return gridKeys.length === 0;
}

const handleSwipe = (gridId, direction) => {
	if (currentGoal.item === gridId && currentGoal.direction === direction) {
		let element = document.getElementById(gridId);
		element.classList.remove(...exitNames);
		window.requestAnimationFrame(function() {
			element.classList.add(dirClassNames[direction]);
		});
		if (numRounds == 10) {
			//clearInterval(interval);
		        show && (document.getElementById(currentGoal.item).innerText = "");
	        } 
		newGoal();
	} else {
		streak = 0;
	}
	document.getElementById("streak").innerText = streak;
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



