// 地图尺寸
var gameMap = {
	rs:30,
	cols:30,
	cellSize:20,
	get mapSize() {
		return this.rs * this.cellSize;
	},
	mapArray:[]
};
// 创建地图
var mainDiv = document.getElementById('main');
mainDiv.style.width = gameMap.mapSize + "px";
mainDiv.style.height = gameMap.mapSize + "px";
// 创建行
for(var i = 0; i < gameMap.rs; i++) {
	var rowDiv = document.createElement('div');
	rowDiv.className = "row";
	mainDiv.appendChild(rowDiv);

	var cellAll = [];
	// 创建单元格
	for(var j = 0; j < gameMap.cols; j++) {
		var cellDiv = document.createElement('div');
		cellDiv.className = "cell";
		rowDiv.appendChild(cellDiv);
		// 设置单元格大小
		cellDiv.style.width = gameMap.cellSize + "px";
		cellDiv.style.height = gameMap.cellSize + "px";
		cellAll.push(cellDiv);
	} 
	gameMap.mapArray.push(cellAll);
}
// 画蛇
var snake = {
	len:3,
	dir:"r",
	speed:150,
	bd:[],
	sheader:{
		row:0,
		column:2
	},
	get add () {
		return function(arg) {
			this.bd.push(arg);
			arg.classList.add('active');
		}
	},
	get remove() {
		return function() {
			this.bd[0].classList.remove('active');
			this.bd.shift();
		}
	}
};
for(var i = 0; i < snake.len; i++) {
	snake.bd.push(gameMap.mapArray[0][i]);
	snake.bd[i].classList.add('active');
}

function move () {
	switch (snake.dir) {
		case 'l':
			snake.sheader.column--;
			break;
		case 'r':
			snake.sheader.column++;
			break;
		case 'u':
			snake.sheader.row--;
			break;
		case 'd':
			snake.sheader.row++;
			break;
		default:
			// statements_def
			break;
	}
	if (snake.sheader.row < 0 || snake.sheader.row ==gameMap.rs || snake.sheader.column < 0 || snake.sheader.column == gameMap.cols) {
		clearInterval(interval);
		alert('game over');
		return;
	}


var shr = snake.sheader.row;
var shc = snake.sheader.column;
var newSHeader = gameMap.mapArray[shr] [shc];

if(snake.bd.indexOf(newSHeader) >= 0) {
	clearInterval(interval);
	alert('game over');
	return;
}
snake.add(newSHeader);
if (!(shr == food.frow && shc == food.fcolumn)) {
	snake.remove();
}else{
	food.createFood();
	document.getElementById('score').innerHTML = snake.bd.length - snake.len;
}
}
var interval = setInterval(move, snake.speed);

// 控制蛇的方向
document.onkeypress = function (e) {
	console.log(e);

	// 水平方向上，ad无效
	if ((snake.dir == 'l' || snake.dir == 'r') && (e.keyCode == 97 || e.keyCode == 100)) {
		return;
	}
	// 垂直方向，ws无效
	if ((snake.dir == 'u' || snake.dir == 'd') && (e.keyCode == 119 || e.keyCode == 115)) {
		return;
	}
	switch (e.keyCode) {
		case 119:
			snake.dir = 'u';
			break;
		case 115:
			snake.dir = 'd';
			break;
		case 100:
			snake.dir = 'r';
			break;
		case 97:
			snake.dir = 'l';
			break;
		default:
			// statements_def
			break;
	}
}


// 创建实物
var food = {
	frow:0,
	fcolumn:0,
	createFood:function () {
		food.frow = Math.floor(Math.random()*gameMap.rs);
		food.fcolumn = Math.floor(Math.random()*gameMap.cols);
		if (gameMap.mapArray[food.frow][food.fcolumn].classList.contains('active')) {
			arguments.callee();
			// arguments.callee 递归函数 在次把函数引入
		}else {
			gameMap.mapArray[food.frow][food.fcolumn].classList.add('active');
			// classList.add()添加类
		}
	}
}
food.createFood();





















