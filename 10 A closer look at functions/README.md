# 03 Default parameter

- can't skip middle params
- use 'undefined' to skip param
- can use expression in default values with previously declared params

```javaScript
const bookings = [];
// can use expression in default values
// can use previously declared param for expression
const createBooking = function (flightNum, numPassenger = 1, price = numPassenger * 9999) {
	const booking = {
		flightNum,
		numPassenger,
		price,
	};
	console.log(booking);
	bookings.push(booking);
};
createBooking("LH123");
createBooking("LH123", 2);
createBooking("LH123", 3, 33333);

// can't skip param in between
createBooking("LH123", 9999);
// 'undefined' will trigger the default value
createBooking("LH123", undefined, 1212);
```

# 04 How passing arguments works || Value vs Reference

```javaScript
const flight = "HGR232";
const jonas = {
	name: "Jomnas Schmedtmann",
	passport: 123123123132,
};

const checkIn = function (flightNum, passenger) {
	flightNum = "HGR112";
	// this will also change the parent jonas.name property
	passenger.name = "Mr. " + passenger.name;
};

checkIn(flight, jonas);
console.log(flight); // flight wont change as string primitive type value
console.log(jonas); // jonas will be changed by the checkIn() function as object reference type value
```

# 05 Fist-Class and Higher-Order function

![image](005%20First-Class%20and%20Higher-Order%20Functions.mp4_snapshot_05.17_[2022.07.31_21.47.23].jpg)

# 06 Functions accepting callback function

- callback function is really very important for the abstract coding where some functions are hidden from us so that we can take an bigger picture

```javaScript
const oneWord = function (str) {
	return str.replace(/ /g, "").toLowerCase();
};

const upperFirstWord = function (str) {
	const [first, ...others] = str.split(" ");
	return [first.toUpperCase(), ...others].join(" ");
};

// Higher-Level function
// Here function is passed as an argument
const transformer = function (str, fn) {
	console.log(`Original Text: ${str}`);
	console.log(`Transformed Text: ${fn(str)}`);
	// functions have method
	console.log(`Transformed by: ${fn.name}`);
};

// callback function
transformer("Javascript is the best!", upperFirstWord);
transformer("Javascript is the best!", oneWord);
```

# 07 Function returning function

- function making new functions
- Core of functional programming

```javaScript
// function generator
const greet = function (greeting) {
	return function (name) {
		console.log(`${greeting} ${name}`);
	};
};

// storing a newly made function
const greeterHey = greet("Hey");
greeterHey("Jonas");

// using child fn directly
greet("Hello")("Manab");

// same thing in arrow function
const greetArrow = (greeting) => (name) => {
	console.log(`${greeting} ${name}`);
};
greetArrow("Hi")("Shanta");
```

# 08 The call and apply methods

```javaScript
const lufthansa = {
	airline: "Lufthansa",
	iataCode: "LH",
	bookings: [],
	book(flightNum, name) {
		console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
		this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
	},
};
lufthansa.book(232, "Manab bala");
console.log(lufthansa);

// properties name should be same as 'this' keyword won't work for all obj
const airIndia = {
	airline: "Air India",
	iataCode: "AI",
	bookings: [],
};

// this will work same as a normal function
const book = lufthansa.book;

// Don't work as 'this' is not defined
// book(121, "Shanta Biswas");

// Call method
// need to use a fn method call() to explicitly define 'this'
// first arg is the parent obj for the 'this' keyword
book.call(airIndia, 121, "Shanta Biswas");
console.log(airIndia);
book.call(lufthansa, 321, "Apurba Biswas");
console.log(lufthansa);

// Apply method
const flightData = [421, "Sagarika Roy"];
book.apply(airIndia, flightData); // not used in modern js
// instead can use call method with spread operator
book.call(lufthansa, ...flightData);

// BIND method
// bind will associate the lufthansa to the 'this' keyword
const bookLH = book.bind(lufthansa);
const bookAir = book.bind(airIndia);
// no need to pass object again
bookAir(23, "Anup Biswas");
// can also bind other argument to the function
const bookAir44 = book.bind(airIndia, 44);
bookAir44("Joy Biswas");
console.log(airIndia);

// PRACTICAL Example
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
	// if bind not used will direct to button element as button is calling everything
	console.log(this);
	this.planes++;
	console.log(this.planes);
};
let button = document.createElement("button");
button.innerText = "Buy New Plane";
document.getElementsByTagName("body")[0].append(button);
// Bind method in eventListener
// lufthansa.buyPlane will refer 'this' to button as button is parent.
button.addEventListener("click", lufthansa.buyPlane.bind(lufthansa));

// Partial Application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.5, 300));
// more specific child function
// first arg is 'this' but here no 'this' so using null
const addGST = addTax.bind(null, 0.18);
// same as addGST = (value) => value + value * 0.18
console.log(addGST(100));

// Challenge: rewrite last functionality with fn returning fn
const addInitial = function (initial) {
	return function (name) {
		return `${initial}. ${name}`;
	};
};
const addSriInitial = addInitial("Sri");
console.log(addSriInitial("Bankim Chandra Bala"));
```

# 09 The bind method

- SEE PREVIOUS CODE BLOCK

# 10 Coding Challenge 01

```javaScript
/*
Let's build a simple poll app!
A poll has a question, an array of options from which people can choose, and an
array with the number of replies for each option. This data is stored in the starter
'poll' object below.
Your tasks:
1. Create a method called 'registerNewAnswer' on the 'poll' object. The
method does 2 things:
1.1. Display a prompt window for the user to input the number of the
selected option. The prompt should look like this:
What is your favourite programming language?
0: JavaScript
1: Python
2: Rust
3: C++
(Write option number)
1.2. Based on the input number, update the 'answers' array property. For
example, if the option is 3, increase the value at position 3 of the array by
1. Make sure to check if the input is a number and if the number makes
sense (e.g. answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The
method takes a string as an input (called 'type'), which can be either 'string'
or 'array'. If type is 'array', simply display the results array as it is, using
console.log(). This should be the default option. If type is 'string', display a
string like "Poll results are 13, 2, 4, 1".
4. Run the 'displayResults' method at the end of each
'registerNewAnswer' method call.
5. Bonus: Use the 'displayResults' method to display the 2 arrays in the test
data. Use both the 'array' and the 'string' option. Do not put the arrays in the poll
object! So what should the this keyword look like in this situation?

Test data for bonus:
§ Data 1: [5, 2, 3]
§ Data 2: [1, 5, 3, 9, 6, 1]
Hints: Use many of the tools you learned about in this and the last section 😉
*/
const poll = {
	question: "What is your favourite programming language?",
	options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
	// This generates [0, 0, 0, 0]. More in the next section!
	answers: new Array(4).fill(0),
	// 1: creating method in poll obj
	registerNewAnswer() {
		// getting answer
		const answer = Number(
			prompt(`${this.question} \n${this.options.join(",\n")}(Write option number)`)
		);
		// checking if it's a valid number
		// my code
		// if (answer >= 1 && answer <= 4) {
		// 	inputValid = true;
		// 	this.answers[answer - 1]++;
		// }
		// Solution code with short circuiting
		typeof answer === "number" && answer < this.answers.length && this.answers[answer]++;

		// displaying results after every input
		this.displayResults();
		this.displayResults("string");
	},
	displayResults(type = "array") {
		if (type === "array") {
			console.log(this.answers);
		} else if (type === "string") {
			console.log(`Poll results are: ${this.answers.join(", ")}`);
		}
	},
};
// creating button to register answer poll
let button = document.createElement("button");
button.innerText = "Answer poll";
document.getElementsByTagName("body")[0].append(button);
// button click
button.addEventListener("click", poll.registerNewAnswer.bind(poll));

// BONUS: call method with different this keyword
// [5, 2, 3]
// [1, 5, 3, 6, 1]
poll.displayResults.call({ answers: [5, 2, 3] }, "string");
poll.displayResults.call({ answers: [1, 5, 3, 6, 1] });
```

# Immediately invoked function expression(IIFE)

- used for hiding variable/userData for privacy concern
- we can put the variable inside a function scope and any outer script can't access it.
- but modern style is to use const/let in a function block

```javaScript
// syntax of IIFE
(function () {
	console.log("This will never run again");
})();
// with arrow function
(() => {
	console.log("I am storing private data");
	const myCrush = "Anchal";
	console.log(myCrush);
})();

// can't also access const and let inside code block
{
	const isPrivate = 69;
	var notPrivate = 100;
}
// console.log(isPrivate);
console.log(notPrivate);
```

# 12 Closure

- Closure: A function has access to the variable environment(VE) the execution context in which it was created
- Closure: VE attached to the function, exactly as it was at the time and place the function was created
- simply closure make a function remember everything from it's birth function scope/place
- closer have priority over scopes

```javaScript
const secureBooking = function () {
	// passenger present inside this func scope
	let passengerCount = 0;
	return function () {
		// this future function can access the passenger with 'closer'
		passengerCount++;
		console.log(`${passengerCount} passengers.`);
	};
};
const booker = secureBooking();
booker();
booker();
booker();
// to see closer var in console
console.dir(booker)
```

![image](012%20Closures.mp4_snapshot_13.36_[2022.08.03_10.35.36].jpg)

![image](012%20Closures.mp4_snapshot_16.51_[2022.08.03_10.36.56].jpg)

# More closure example

- we can also assign a new closer to the function
- closer have priority over scopes

```javaScript
// EXAMPLE 1
let f;
const g = function () {
	const a = 23;
	f = function () {
		console.log(a * 2);
	};
};
g();
f();

const h = function () {
	const b = 69;
	// re-assign of f function when h called
	f = function () {
		console.log(b * 2);
	};
};
// re-assigning f function
h();
f();

// EXAMPLE 2
const boardPassengers = function (n, wait) {
	const perGroup = n / 3;

	setTimeout(function () {
		console.log(`We are now boarding al ${n} passengers`);
		console.log(`There are 3 groups, each with ${perGroup} passengers`);
	}, wait * 1000);
	console.log(`Will start boarding in ${wait} seconds`);
};

// closer have priority over scopes
const perGroup = 1000;
// this perGroup variable won't be used in fn of setTimeout

boardPassengers(180, 3);
```

# Coding challenge 02

```javaScript
/*
This is more of a thinking challenge than a coding challenge 🤓
Your tasks:
1. Take the IIFE below and at the end of the function, attach an event listener that
changes the color of the selected h1 element ('header') to blue, each time
the body element is clicked. Do not select the h1 element again!
2. And now explain to yourself (or someone around you) why this worked! Take all
the time you need. Think about when exactly the callback function is executed,
and what that means for the variables involved in this example.
*/

(function () {
	const header = document.querySelector("h1");
	header.style.color = "red";
	header.addEventListener("click", () => {
		// we can only use the 'header' variable of 'closer'
		// click the h1 => eventlistener
		header.style.color = header.style.color === "red" ? "blue" : "red";
	});
})();
```
