"use strict";

// BANKIST APP

// Data
const account1 = {
	owner: "Jonas Schmedtmann",
	movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
	interestRate: 1.2, // %
	pin: 1111,
};

const account2 = {
	owner: "Jessica Davis",
	movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
	interestRate: 1.5,
	pin: 2222,
};

const account3 = {
	owner: "Steven Thomas Williams",
	movements: [200, -200, 340, -300, -20, 50, 400, -460],
	interestRate: 0.7,
	pin: 3333,
};

const account4 = {
	owner: "Sarah Smith",
	movements: [430, 1000, 700, 50, 90],
	interestRate: 1,
	pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// creating the app

// 08: Creating DOM element
const displayMovements = function (acc, sort = false) {
	containerMovements.innerHTML = "";

	const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

	movs.forEach((mov, i) => {
		const type = mov > 0 ? "deposit" : "withdrawal";
		const html = `
		<div class="movements__row">
			<div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
			<div class="movements__value">${mov}€</div>
    </div>
		`;
		containerMovements.insertAdjacentHTML("afterbegin", html);
	});
};

// 14: calculating balance with reduce method
const calcDisplayBalance = function (account) {
	// acc = accumulator
	account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
	labelBalance.textContent = `${account.balance} EUR`;
};

// 16: chaining multiple methods
const calcDisplaySummary = function (acc) {
	const incomes = acc.movements.filter((mov) => mov > 0).reduce((acc, mov) => acc + mov, 0);
	labelSumIn.textContent = `${incomes}€`;
	const out = Math.abs(acc.movements.filter((mov) => mov < 0).reduce((acc, mov) => acc + mov, 0));
	labelSumOut.textContent = `${out}€`;
	const interest = acc.movements
		// taking all positive value
		.filter((mov) => mov > 0)
		// calculating interests on deposit
		.map((deposit) => (deposit * acc.interestRate) / 100)
		// filtering interest less than 1
		.filter((deposit) => deposit > 1)
		// summing upp all the interests
		.reduce((acc, mov) => acc + mov, 0);
	labelSumInterest.textContent = `${interest}€`;
};

// 12: Computing usernames
const createUsernames = function (accounts = []) {
	accounts.forEach((acc) => {
		acc.username = acc.owner
			.toLowerCase()
			.split(" ")
			.map((name) => name[0])
			.join("");
	});
};
createUsernames(accounts);

// updating UI
const updateUI = function (acc) {
	// display movements
	displayMovements(acc);

	// display balance
	calcDisplayBalance(acc);

	// display summery
	calcDisplaySummary(acc);
};

// 19: implementing Login
let currentAccount;
btnLogin.addEventListener("click", (e) => {
	// stopping form from submitting(no reload)
	e.preventDefault();
	currentAccount = accounts.find((acc) => acc.username === inputLoginUsername.value);
	// console.log(currentAccount);

	// checking pin/password
	if (currentAccount?.pin === Number(inputLoginPin.value)) {
		// display UI and message
		labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}`;
		containerApp.style.opacity = 100;
	}

	// clearing input fields
	inputLoginUsername.value = inputLoginPin.value = "";
	// removing focus from input field
	inputLoginPin.blur();

	// update UI
	if (currentAccount) updateUI(currentAccount);
});

// 20: function for money transfer
btnTransfer.addEventListener("click", (e) => {
	e.preventDefault();
	const amount = Number(inputTransferAmount.value);
	const receiverAcc = accounts.find((acc) => acc.username === inputTransferTo.value);
	console.log(amount, receiverAcc);

	// validating transfer
	if (
		amount > 0 &&
		receiverAcc &&
		currentAccount.balance >= amount &&
		receiverAcc.username !== currentAccount.username
	) {
		console.log("Valid Transfer");
		// doing transfer
		currentAccount.movements.push(-amount);
		receiverAcc.movements.push(amount);
		// updating transfer
		if (currentAccount) updateUI(currentAccount);
	}
	// clearing input fields
	inputTransferAmount.value = inputTransferTo.value = "";
});

// 21: some: checking if any mov fulfill the condition
btnLoan.addEventListener("click", (e) => {
	e.preventDefault();
	const amount = Number(inputLoanAmount.value);

	// if requested loan is at least 10% of any of the movement
	if (amount > 0 && currentAccount.movements.some((mov) => mov >= amount * 0.1)) {
		// add loan movement
		currentAccount.movements.push(amount);

		// update UI
		updateUI(currentAccount);
	}
	inputLoanAmount.value = "";
});

// 21: findIndex deleting own account
btnClose.addEventListener("click", (e) => {
	e.preventDefault();

	if (
		inputCloseUsername.value === currentAccount.username &&
		Number(inputClosePin.value) === currentAccount.pin
	) {
		// getting index of current user in the accounts array
		const index = accounts.findIndex((acc) => acc.username === currentAccount.username);
		console.log(index);

		// delete account
		accounts.splice(index, 1);

		// hide ui
		containerApp.style.opacity = 0;
	}
	inputCloseUsername.value = inputClosePin.value = "";
});

// 24: sorting movements
let sort = false;
btnSort.addEventListener("click", (e) => {
	e.preventDefault();
	displayMovements(currentAccount, !sort);
	sort = !sort;
});

// 25: Array.from()
// this code only for testing purpose of Array.from() method
labelBalance.addEventListener("click", (e) => {
	// convert elements node data to js array
	const movementsUI = Array.from(document.querySelectorAll(".movements__value"));
	console.log(movementsUI);
	// get value from el and modify it with map method
	console.log(movementsUI.map((el) => Number(el.textContent.replace("€", ""))));
});

// 27: Array methods practice(extra, not for app)
// 01:
const bankDeposit = accounts
	.flatMap((acc) => acc.movements)
	.filter((mov) => mov > 0)
	.reduce((acc, mov) => acc + mov, 0);
console.log(bankDeposit);

// 02: get the number of all deposit over 1000
// first
// const numDeposits1000 = accounts
// 	.flatMap((acc) => acc.movements)
// 	.filter((mov) => mov >= 1000).length;
// second approach
const numDeposits1000 = accounts
	.flatMap((acc) => acc.movements)
	.reduce((accumulator, mov) => (mov >= 1000 ? ++accumulator : accumulator), 0);
console.log(numDeposits1000);

// 03: get all the deposit and withdrawals in one go with reduce
const { deposits, withdrawals } = accounts
	.flatMap((acc) => acc.movements)
	.reduce(
		(sums, cur) => {
			// cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
			sums[cur > 0 ? "deposits" : "withdrawals"] += cur;
			return sums;
		},
		{ deposits: 0, withdrawals: 0 }
	);
console.log(deposits, withdrawals);

// 04: string to title case
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
	const exceptions = ["a", "an", "the", "and", "but", "or", "on", "in", "with"];
	const capitalize = (str) => str[0].toUpperCase() + str.slice(1);
	const titleCase = title
		.toLowerCase()
		.split(" ")
		.map((word) => (exceptions.includes(word) ? word : capitalize(word)))
		.join(" ");
	return capitalize(titleCase);
};
console.log(convertTitleCase("this is a nice title"));
console.log(convertTitleCase("this is a LONG title but not too loNg WITH all"));
console.log(convertTitleCase("and this is a nice title"));
