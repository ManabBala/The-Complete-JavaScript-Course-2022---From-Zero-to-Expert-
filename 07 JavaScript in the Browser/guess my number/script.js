// adding 1 to include the last secretNumber of the function which got cut by trunc func
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

console.log(secretNumber);

const displayMessage = function (message) {
	document.querySelector(".message").textContent = message;
};

document.querySelector(".check").addEventListener("click", () => {
	const guess = Number(document.querySelector(".guess").value);

	// when there is no input
	if (!guess) {
		displayMessage("🚫 No Number");
		// when player wins
	} else if (guess === secretNumber) {
		document.querySelector(".number").textContent = secretNumber;
		displayMessage("🥇 Correct Number");

		document.querySelector("body").style.backgroundColor = "#60b347";
		document.querySelector(".number").style.width = "30rem";
		if (highScore < score) highScore = score;
		document.querySelector(".highscore").textContent = highScore;

		// guess is different
	} else if (guess !== secretNumber) {
		displayMessage(guess < secretNumber ? "👇 Too Low!" : "👆 Too High!");
		if (score > 0) {
			score--;
			document.querySelector(".score").textContent = score;
		} else {
			displayMessage("🔴 Lost the Game");
		}
	}
});

// to reset the game
document.querySelector(".again").addEventListener("click", () => {
	secretNumber = Math.trunc(Math.random() * 20 + 1);
	score = 20;
	document.querySelector(".score").textContent = score;
	displayMessage("start guessing...");
	document.querySelector(".number").textContent = "?";
	document.querySelector(".number").style.width = "15rem";
	document.querySelector(".guess").value = "";
	console.log(secretNumber);
	document.querySelector("body").style.backgroundColor = "#222";
});
