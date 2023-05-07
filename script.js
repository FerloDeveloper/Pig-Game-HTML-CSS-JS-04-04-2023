"use strict";

// -------------------------------------------------------------------------------------

// ~~~ QUANDO PREMO ROLL DICE: tirare numero random, mostro il numero a centro schermo -> SE NON E' 1 AGGIUNGO A CURRENT -> CONTINUO A FARLO FINCHE' non esce 1 o total = 100 o giocatore preme hold

// ~~~ QUANDO PREMO HOLD: sommo total score + current, current torna a zero, il turno passa all'avversario.

// ~~~ QUANDO UN GIOCATORE ARRIVA A total = 100;

// ~~~ QUANDO PREMO NEW GAME:

// PUNK~ Per gestire il cambio di player: Si parte da una classe -> SI ENTRA NELL'IF C'E' QUELLA CLASSE(player1) -> se esce 1 o si preme HOLD, cambia la classe. e quando si ripremera; SI ENTRA NELL'IF C'E' QUELLA CLASSE(player2) ecc..

// -------------------------------------------------------------------------------------

// VARIABILI

// easter egg

let pig = document.querySelector('.pig');
let main = document.querySelector('main');

let oink = document.querySelector('.oink');

pig.addEventListener('click', function(){
	if (main.style.display === "none") {
		main.style.display = "flex";
		oink.classList.add("remove");
	} else {
		main.style.display = "none";

		oink.classList.remove("remove");
	}
})

// Numero estratto
let showNumber = document.querySelector(`.show-number`);
let theNumber;
// Buttons
let newGame = document.querySelector(`.newgame`);
let rollDice = document.querySelector(`.roll-dice`);
let hold = document.querySelector(`.hold`);
// Total Points
let totalScorePlayer1 = document.querySelector(`.totalscore-player1`);
let totalScorePlayer2 = document.querySelector(`.totalscore-player2`);
// Partial Points
let currentScorePlayer1 = document.querySelector(`.current-points-Player1`);
let currentScorePlayer2 = document.querySelector(`.current-points-Player2`);
// Variabili di appoggio
let totalValue1 = 0;
let totalValue2 = 0;
let currentValue1 = 0;
let currentValue2 = 0;
// Icone
let sun = document.querySelector(`.sun`);
let moon = document.querySelector(`.moon`);

// FUNZIONI

//roll
const rollDiceFunction = function () {
	// numero random
	theNumber = Math.floor(Math.random() * 6 + 1);
	console.log(theNumber);
	showNumber.style.removeProperty("color");

	// Partita Player 1
	if (rollDice.classList.contains("player1-trig")) {
		showNumber.textContent = theNumber;
		sun.classList.remove("hidden");
		moon.classList.add("hidden");

		if (theNumber !== 1) {
			currentValue1 += theNumber;
			currentScorePlayer1.textContent = currentValue1;
		} else {
			showNumber.style.color = "red";
			showNumber.textContent = "1";
			rollDice.classList.remove("player1-trig");
			currentValue1 = 0;
			currentScorePlayer1.textContent = "0";
		}
	} else {
		// Partita player 2
		showNumber.textContent = theNumber;
		moon.classList.remove("hidden");
		sun.classList.add("hidden");

		if (theNumber !== 1) {
			currentValue2 += theNumber;
			currentScorePlayer2.textContent = currentValue2;
		} else {
			showNumber.style.color = "red";
			showNumber.textContent = "1";
			rollDice.classList.add("player1-trig");
			currentValue2 = 0;
			currentScorePlayer2.textContent = "0";
		}
	}
};

//hold
const holdFunction = function () {
	if (showNumber.textContent !== "1") {
		showNumber.style.removeProperty("color");

		if (rollDice.classList.contains("player1-trig")) {
			totalValue1 += currentValue1;
			totalScorePlayer1.textContent = totalValue1;
			currentValue1 = 0;
			currentScorePlayer1.textContent = "0";
			showNumber.textContent = "TURNO PLAYER 2";

			if (totalValue1 >= 50) {
				// alert("VITTORIA PLAYER 1 !!!");
				showNumber.textContent = "🎉 PLAYER 1 WIN! 🎉";
				rollDice.classList.add("remove");
				hold.classList.add("remove");
			}
			rollDice.classList.remove("player1-trig");
		} else {
			totalValue2 += currentValue2;
			totalScorePlayer2.textContent = totalValue2;
			currentValue2 = 0;
			currentScorePlayer2.textContent = "0";
			showNumber.textContent = "TURNO PLAYER 1";

			if (totalValue2 >= 50) {
				// alert("VITTORIA PLAYER 2 !!!");
				showNumber.textContent = "🎉 PLAYER 2 WIN! 🎉";
				rollDice.classList.add("remove");
				hold.classList.add("remove");
			}
			rollDice.classList.add("player1-trig");
		}
	}
};

//reset
const resetGame = function () {
	totalScorePlayer1.textContent = "0";
	totalScorePlayer2.textContent = "0";
	currentScorePlayer1.textContent = "0";
	currentScorePlayer2.textContent = "0";
	totalValue1 = 0;
	totalValue2 = 0;
	currentValue1 = 0;
	currentValue2 = 0;
	showNumber.textContent = "🍀GOOD LUCK🍀";
	rollDice.classList.remove("remove");
	hold.classList.remove("remove");
	rollDice.classList.add("player1-trig");
	showNumber.style.removeProperty("color");
};

// EVENTI CLICK

rollDice.addEventListener(`click`, function () {
	rollDiceFunction();
});

hold.addEventListener("click", holdFunction); // <-- Secondo modo per passare la funzione come argomento, senza le parentesi perche' senno verrebbe eseguita subito e non come argomento nel momento corretto.


// NEW GAME
newGame.addEventListener(`click`, resetGame);

// EVENTI TASTIERA

document.addEventListener("keyup", function (event) {
	if (event.key === "r") {
		resetGame();
	}
});

document.addEventListener("keyup", function (event) {
	if (event.key === " ") {
		rollDiceFunction();
	}
});

document.addEventListener("keyup", function (event) {
	if (event.key === "Escape") {
		holdFunction();
	}
});

