"use strict";

// BANKIST APP V2

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
	owner: "Jonas Schmedtmann",
	movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
	interestRate: 1.2, // %
	pin: 1111,

	movementsDates: [
		"2019-11-18T21:31:17.178Z",
		"2019-12-23T07:42:02.383Z",
		"2020-01-28T09:15:04.904Z",
		"2020-04-01T10:17:24.185Z",
		"2020-05-08T14:11:59.604Z",
		"2022-08-12T17:01:17.194Z",
		"2022-08-14T23:36:17.929Z",
		"2022-08-16T10:51:36.790Z",
	],
	currency: "EUR",
	locale: "pt-PT", // de-DE
};

const account2 = {
	owner: "Jessica Davis",
	movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
	interestRate: 1.5,
	pin: 2222,

	movementsDates: [
		"2019-11-01T13:15:33.035Z",
		"2019-11-30T09:48:16.867Z",
		"2019-12-25T06:04:23.907Z",
		"2020-01-25T14:18:46.235Z",
		"2020-02-05T16:33:06.386Z",
		"2020-04-10T14:43:26.374Z",
		"2020-06-25T18:49:59.371Z",
		"2020-07-26T12:01:20.894Z",
	],
	currency: "USD",
	locale: "en-US",
};

const accounts = [account1, account2];

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
// 10: Date formatting
const formatMovementDate = function (date, local) {
	const calcDaysPassed = (date1, date2) =>
		Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
	const daysPassed = calcDaysPassed(new Date(), date);
	// console.log(daysPassed);
	if (daysPassed === 0) return "Today";
	if (daysPassed === 1) return "Yesterday";
	if (daysPassed <= 7) return `${daysPassed} days ago`;

	// const day = `${date.getDate()}`.padStart(2, 0);
	// const month = `${date.getMonth() + 1}`.padStart(2, 0);
	// const year = date.getFullYear();
	// return `${day}/${month}/${year}`;
	return new Intl.DateTimeFormat(local).format(date);
};

// 12: Internationalization Number
const formatCur = function (value, locale, currency) {
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency: currency,
	}).format(value);
};

// 08: Creating DOM element
const displayMovements = function (acc, sort = false) {
	containerMovements.innerHTML = "";

	const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

	movs.forEach((mov, i) => {
		const type = mov > 0 ? "deposit" : "withdrawal";
		const displayDate = formatMovementDate(new Date(acc.movementsDates[i]), acc.local);

		const html = `
		<div class="movements__row">
			<div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
			<div class="movements__date">${displayDate}</div>
			<div class="movements__value">${formatCur(mov, acc.locale, acc.currency)}</div>
    </div>
		`;
		containerMovements.insertAdjacentHTML("afterbegin", html);
	});
};

// 14: calculating balance with reduce method
const calcDisplayBalance = function (account) {
	// acc = accumulator
	account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
	labelBalance.textContent = `${formatCur(account.balance, account.locale, account.currency)}`;
};

// 16: chaining multiple methods
const calcDisplaySummary = function (acc) {
	const incomes = acc.movements.filter((mov) => mov > 0).reduce((acc, mov) => acc + mov, 0);
	labelSumIn.textContent = `${formatCur(incomes, acc.locale, acc.currency)}`;
	const out = Math.abs(acc.movements.filter((mov) => mov < 0).reduce((acc, mov) => acc + mov, 0));
	labelSumOut.textContent = `${formatCur(out, acc.locale, acc.currency)}`;
	const interest = acc.movements
		// taking all positive value
		.filter((mov) => mov > 0)
		// calculating interests on deposit
		.map((deposit) => (deposit * acc.interestRate) / 100)
		// filtering interest less than 1
		.filter((deposit) => deposit > 1)
		// summing upp all the interests
		.reduce((acc, mov) => acc + mov, 0);
	labelSumInterest.textContent = `${formatCur(interest, acc.locale, acc.currency)}`;
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

// start logout timer
const startLogOutTimer = function () {
	// set time to 5 minutes
	let time = 300; // 5 min => 300 sec
	// call the timer every second
	const tick = function () {
		// in each call, print the remaining time to UI
		const min = `${Math.trunc(time / 60)}`.padStart(2, 0);
		const sec = `${Math.trunc(time % 60)}`.padStart(2, 0);
		labelTimer.textContent = `${min}:${sec}`;
		// when 0 seconds, stop timer and log out user
		if (time === 0) {
			clearInterval(clockTimer);
			// hide UI and display default message
			labelWelcome.textContent = "Log in to get started";
			containerApp.style.opacity = 0;
		}
		// decrease time
		time--;
	};
	tick();
	const clockTimer = setInterval(tick, 1000);
	return clockTimer;
};

// 19: implementing Login
let currentAccount, clockTimer;
btnLogin.addEventListener("click", (e) => {
	// stopping form from submitting(no reload)
	e.preventDefault();
	currentAccount = accounts.find((acc) => acc.username === inputLoginUsername.value);
	// console.log(currentAccount);

	// checking pin/password
	if (currentAccount?.pin === +inputLoginPin.value) {
		// display UI and message
		labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]}`;
		containerApp.style.opacity = 100;

		// 09: Adding dates
		const now = new Date();
		// const day = `${now.getDate()}`.padStart(2, 0);
		// const month = `${now.getMonth() + 1}`.padStart(2, 0);
		// const year = now.getFullYear();
		// labelDate.textContent = `${day}/${month}/${year}, ${now.getHours()}:${now.getMinutes()}`;
		const options = {
			hour: "numeric",
			minute: "numeric",
			day: "numeric",
			month: "numeric",
			year: "numeric",
		};
		// using date formatter api
		labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);
	}

	// clearing input fields
	inputLoginUsername.value = inputLoginPin.value = "";
	// removing focus from input field
	inputLoginPin.blur();

	// timer
	if (clockTimer) clearInterval(clockTimer);
	clockTimer = startLogOutTimer();

	// update UI
	if (currentAccount) updateUI(currentAccount);
});

// 20: function for money transfer
btnTransfer.addEventListener("click", (e) => {
	e.preventDefault();
	const amount = +inputTransferAmount.value;
	const receiverAcc = accounts.find((acc) => acc.username === inputTransferTo.value);
	// console.log(amount, receiverAcc);

	// validating transfer
	if (
		amount > 0 &&
		receiverAcc &&
		currentAccount.balance >= amount &&
		receiverAcc.username !== currentAccount.username
	) {
		// console.log("Valid Transfer");
		// doing transfer
		currentAccount.movements.push(-amount);
		receiverAcc.movements.push(amount);
		// adding transfer date
		currentAccount.movementsDates.push(new Date().toISOString());
		receiverAcc.movementsDates.push(new Date().toISOString());

		// updating transfer
		if (currentAccount) updateUI(currentAccount);

		// RESET clockTimer
		clearInterval(clockTimer);
		clockTimer = startLogOutTimer();
	}
	// clearing input fields
	inputTransferAmount.value = inputTransferTo.value = "";
});

// 21: some: checking if any mov fulfill the condition
btnLoan.addEventListener("click", (e) => {
	e.preventDefault();
	const amount = Math.floor(inputLoanAmount.value);

	// if requested loan is at least 10% of any of the movement
	if (amount > 0 && currentAccount.movements.some((mov) => mov >= amount * 0.1)) {
		// loan is approved after 2.5 sec
		setTimeout(function () {
			// add loan movement
			currentAccount.movements.push(amount);

			// adding loan date
			currentAccount.movementsDates.push(new Date().toISOString());

			// update UI
			updateUI(currentAccount);
		}, 2500);

		// RESET clockTimer
		clearInterval(clockTimer);
		clockTimer = startLogOutTimer();
	}
	inputLoanAmount.value = "";
});

// 21: findIndex deleting own account
btnClose.addEventListener("click", (e) => {
	e.preventDefault();

	if (
		inputCloseUsername.value === currentAccount.username &&
		+inputClosePin.value === currentAccount.pin
	) {
		// getting index of current user in the accounts array
		const index = accounts.findIndex((acc) => acc.username === currentAccount.username);

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
	console.log(movementsUI.map((el) => +el.textContent.replace("€", "")));
});

// FAKE LOGIN FOR TESTING
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;
