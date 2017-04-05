var row1 = ["___", "___", "___", "___", "___", "___", "___", "___"];
var row2 = ["___", "___", "___", "___", "___", "___", "___", "___"];
var row3 = ["___", "___", "___", "___", "___", "___", "___", "___"];
var row4 = ["___", "___", "___", "___", "___", "___", "___", "___"];
var row5 = ["___", "___", "___", "___", "___", "___", "___", "___"];
var row6 = ["___", "___", "___", "___", "___", "___", "___", "___"];
var row7 = ["___", "___", "___", "___", "___", "___", "___", "___"];
var row8 = ["___", "___", "___", "___", "___", "___", "___", "___"];
var board = [row1, row2, row3, row4, row5, row6, row7, row8]; //Game Board
var gameEnd = false;
var monster;
function getRow(randomRow) {
	return board[randomRow];
}
function getMonster(monsterNum) {
	return monsters[monsterNum];
}
var keepCombat = false;
function retryYes() {
	combatYes(); //encounter starts again
}
function retryNo() {
	$("#cYes").hide();
	$("#cNo").hide();
	$("#rYes").hide();
	$("#rNo").hide(); //you leave the encounter
	$("#alertBar").html("");
}
function combatYes() {
	while (true) {
		var randomRoll = Math.floor(Math.random() * 2); //you or the monster attacks
		if (randomRoll == 0) {
			randomRoll = Math.floor(Math.random() * 36); //you deal damage to the monster
			monster.hp = monster.hp - randomRoll;
			if (monster.hp <= 0) {
				$("#alertBar").html("You slew " + monster.monsterName + "! You acquired the " + monster.prize + "! Do you wish to engage " + monster.monsterName + " again?");
				if(player.inventory1 == "EMPTY") {
					player.inventory1 = monster.prize;
				} else if (player.inventory2 == "EMPTY") {
					player.inventory2 = monster.prize;
				} else {
					$("#alertBar").html("You slew " + monster.monsterName + "! However, your inventory is full! Do you wish to engage " + monster.monsterName + " again?");
				}
				$("#cYes").hide();
				$("#cNo").hide();
				$("#rYes").show();
				$("#rNo").show();
				break;
			}
		} else if (randomRoll == 1) {
			randomRoll = Math.floor(Math.random() * (1 + (monster.hp/2))); //monster attacks for up to half its health
			player.hp = player.hp - randomRoll;
			if (player.hp <= 0) {
				$("#alertBar").html("You died! GAME OVER");
				$("button").hide();
				$("#ok").show();
				gameEnd = true;
				break;
			}
		}
	}
}
function eraseAll() {
	$("button").hide();
	$("h1").hide();
	$("h3").hide();
	$("div").hide();
}
function combatNo() {
	$("#alertBar").html("You ran away! An eminently sensible choice.");
	$("#cYes").hide();
	$("#cNo").hide();
	return;
}
function runChallenge(locationY, locationX) {
	for (var i = 0; i < 4; i++) { //identifies Monster
		if (locationY == getMonster(i).locationY && locationX == getMonster(i).locationX) {
			monster = getMonster(i);
		}
	}
	$("#alertBar").html(monster.monsterName + "<br>" + monster.description + " Do you wish to engage in combat?");
	$("#cYes").show();
	$("#cNo").show();
}
var monster1 = {monsterName:"Rose Mamba", hp:20, prize:"Rose Scale", locationY:0, locationX:0, description: "Uncoiling from a bed of flowers, a wiry serpent raises its head to your eye level." +
		" Its neck-flaps open as it hisses, golden and pink scales reflecting sunlight intense enough to be blinding. This is a rose mamba, the deadliest of the indigenous snakes"};
var monster2 = {monsterName:"Axe Revenant", hp:58, prize:"Rusted Cleaver", locationY:0, locationX:0, description: "It's a man. Clad in a grey naval coat and waterproof leggings," +
		" a sailor's hat on his head, clutching a meat cleaver so hard his knuckles have turned white. It looks like he's bleeding, but all he's doing is standing there. As you come closer" +
		" to investigate, his head snaps up and to the side. He, or it, turns around. Pale vapors trail it as it moves and you can see insects crawl around ragged holes in its body. The" +
		" revenant lets out an anguished scream as it spots you."};
var monster3 = {monsterName:"Canine Hydra", hp:34, prize:"Dog Canines", locationY:0, locationX:0, description: "It's a dog with too many heads! Clearly this is the most terrifying thing you've seen yet."};
var monster4 = {monsterName:"Damien Artemidoros", hp:100, prize:"Chitin Heart", locationY:0, locationX:0, description: "He's been waiting for you. Bare-chested, a full head and a half taller than you" +
		" with overbuilt arms. Raised, discolored lines of flesh surge across his skin like his scar tissue gained a mind of its own. He stretches his arms wide as he sees you, causing the chitin" +
		" of his back to crackle. The tips of pincers protrude from his knuckles as he charges towards you."};
var monsters = [monster1, monster2, monster3, monster4];
var player = {hp:100,locationY:0,locationX:0,inventory1:"EMPTY",inventory2:"EMPTY"};
var randomRow = 0;
var randomCol = 0;
for (var i = 0; i < 4; i++) { //Place Monsters
	while (true) {
		randomRow = Math.floor(Math.random() * 8);
		randomCol = Math.floor(Math.random() * 8);
		if (getRow(randomRow)[randomCol] == "___") {
			break;
		}
	}
	getRow(randomRow)[randomCol] = "C";
	monsters[i].locationY = randomRow;
	monsters[i].locationX = randomCol;
}
for (var i = 0; i < 6; i++) { //Place Walls
	while (true) {
		randomRow = Math.floor(Math.random() * 8);
		randomCol = Math.floor(Math.random() * 8);
		if (getRow(randomRow)[randomCol] == "___") {
			break;
		}
	}
	getRow(randomRow)[randomCol] = "||||||||";
}
while (true) { //Place Start
	randomRow = Math.floor(Math.random() * 8);
	randomCol = Math.floor(Math.random() * 8);
	if (getRow(randomRow)[randomCol] == "___") {
		break;
	}
}
getRow(randomRow)[randomCol] = "S";
player.locationY = randomRow;
player.locationX = randomCol;
while (true) { //Place Goal
	randomRow = Math.floor(Math.random() * 8);
	randomCol = Math.floor(Math.random() * 8);
	if (getRow(randomRow)[randomCol] == "___") {
		break;
	}
}
getRow(randomRow)[randomCol] = "G";
var newGameBoard = document.createElement("TABLE"); //makes Board
function makeBoard() {
	for(var i = 0; i < 8; i++) {
   		var newRow = document.createElement("TR");
   		newGameBoard.appendChild(newRow);
   		for(var j = 0; j < 8; j++) {
   			var newTile = document.createElement("TD");
    		newTile.style.border = "none";
    		var newTileText = document.createTextNode(getRow(i)[j]);
    		if(i != player.locationY || j != player.locationX) {
    			newTile.style.backgroundColor = "black";
    		}
    		if(i == player.locationY && j == player.locationX) {
    			newTile.style.backgroundColor = "goldenrod";
    		}
    		newTile.appendChild(newTileText);
    		newRow.appendChild(newTile);
   		}
	}
	newGameBoard.style.backgroundColor = "burlywood";
	newGameBoard.style.border = "30px solid lightseagreen";
	newGameBoard.style.textAlign = "center";
	$("#tablediv").empty();
	$("#tablediv").append(newGameBoard);
}
function revealTile(locationY, locationX) {
	newGameBoard.rows[locationY].cells[locationX].style.backgroundColor = "burlywood";
}
$(document).ready(function () {
	$("#cYes").hide();
	$("#cNo").hide();
	$("#rYes").hide();
	$("#rNo").hide();
	$("#ok").hide();
	makeBoard();
}());
function moveNorth() {
	var intD = player.locationY-1;
	$("#alertBar").html("");
	moveNS(intD);
	endOfTurn();
}
function moveSouth() {
	var intD = player.locationY+1;
	$("#alertBar").html("");
	moveNS(intD);
	endOfTurn();
}
function moveEast() {
	var intD = player.locationX+1;
	$("#alertBar").html("");
	moveEW(intD);
	endOfTurn();
}
function moveWest() {
	var intD = player.locationX-1;
	$("#alertBar").html("");
	moveEW(intD);
	endOfTurn();
}
function endOfTurn() {
	if (getRow(player.locationY)[player.locationX] == "G") {
		if(player.inventory1 != "EMPTY" && player.inventory2 != "EMPTY") {
			$("#alertBar").html("A WINNER IS YOU! THE WHITE VOID OF SPACE");
			$("button").hide();
			$("#ok").show();
		} else {
			$("#alertBar").html("You need two esoterica to open the portal.");
		}
	}
	if (getRow(player.locationY)[player.locationX] == "C") {
		runChallenge(player.locationY, player.locationX);
	}
	$("#notify").html("Current location: (" + (player.locationX+1) + ", " + (player.locationY+1) + "). HP: " + player.hp + "/100." +
			" Inventory: " + player.inventory1 + ", " + player.inventory2 + ".");
}
function wallCheckEW(intendedDirection) {
	revealTile(player.locationY, intendedDirection);
	if (getRow(player.locationY)[intendedDirection] == "||||||||") {
		$("#alertBar").html("The foliage is too dense to move there.");
		return false;
	} else {
		return true;
	}
}
function wallCheckNS(intendedDirection) {
	revealTile(intendedDirection, player.locationX);
	if (getRow(intendedDirection)[player.locationX] == "||||||||") {
		$("#alertBar").html("The foliage is too dense to move there.");
		return false;
	} else {
		return true;
	}
}
function waterCheck(intendedDirection) {
	if (intendedDirection > 7 || intendedDirection < 0) {
		$("#alertBar").html("That's the open water. You're not a boat. You can't go there.");
		return false;
	} else {
		return true;
	}
}
function moveEW(intendedDirection) {
	if (waterCheck(intendedDirection) && wallCheckEW(intendedDirection)) {
		newGameBoard.rows[player.locationY].cells[player.locationX].style.backgroundColor = "burlywood";
		player.locationX = intendedDirection;
		newGameBoard.rows[player.locationY].cells[player.locationX].style.backgroundColor = "goldenrod";
	}
}
function moveNS(intendedDirection) {
	if (waterCheck(intendedDirection) && wallCheckNS(intendedDirection)) {
		newGameBoard.rows[player.locationY].cells[player.locationX].style.backgroundColor = "burlywood";
		player.locationY = intendedDirection;
		newGameBoard.rows[player.locationY].cells[player.locationX].style.backgroundColor = "goldenrod";
	}
}