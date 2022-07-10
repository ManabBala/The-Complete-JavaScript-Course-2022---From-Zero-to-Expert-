# 02 Activating Strict Mode

- To use strict mode add "'use strict'" at the beginning of any code.(comments are allowed)
- also prevent our use of near future preserved word

```javascript
// comments are allowed
"use strict";
let shantaBff = true;
const heIgnoringMe = true;

if (heIgnoringMe) shantasBff = false;
if (shantaBff) console.log("I am happy");
```

# 03 Functions

- fundamental building blocks of js
- return statement exit the code block

```javascript
function funcName(param) {
	console.log(`Function running with parameter : ${param}`);
	var returnVal = param + 100;
	return returnVal;
}

var storeReturnVal = funcName(100);
```

# 04 Function declaration vs Expressions

- in declaration function can be called before declaring it but not in expression
- expression force you to code strictly/managed manner

```javascript
// function declaration
function calcAge(birthYear) {
	return 2022 - birthYear;
}
const myAge = calcAge(2000);
console.log(myAge);

// function Expression/nameless/
const calcAge2 = function (birthYear) {
	return 2022 - birthYear;
};

console.log(calcAge(2002));
```

# 05 Arrow function

- no need to use {}, function
- also no return statement if one liner code(like return single value/calculation)
- can't use 'this' keyword

```javascript
// Arrow function
const calcAge3 = (birthYear) => 2022 - birthYear;
console.log(calcAge3(2001));

// need to use {} and return if more code
const yearsUntilRetirement = (birthYear, firstName) => {
	const age = 2022 - birthYear;
	const retirement = 65 - age;
	return `${firstName} retires in ${retirement}`;
};

console.log(yearsUntilRetirement(2000, "Manab"));
```

# 06 Function calling another function

-

# 07 Reviewing Function

-

# 08 Coding Challenge 01

```javascript
/*
Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new 
gymnastics discipline, which works differently. 
Each team competes 3 times, and then the average of the 3 scores is calculated (so 
one average score per team). 
A team only wins if it has at least double the average score of the other team. 
Otherwise, no team wins! 
Your tasks: 
1. Create an arrow function 'calcAverage' to calculate the average of 3 scores 
2. Use the function to calculate the average for both teams 
3. Create a function 'checkWinner' that takes the average score of each team 
as parameters ('avgDolphins' and 'avgKoalas'), and then logs the winner 
to the console, together with the victory points, according to the rule above. 
Example: "Koalas win (30 vs. 13)" 
4. Use the 'checkWinner' function to determine the winner for both Data 1 and 
Data 2 
5. Ignore draws this time 
Test data: 
§ Data 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49 
§ Data 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27 
Hints: 
§ To calculate average of 3 values, add them all together and divide by 3 
§ To check if number A is at least double number B, check for A >= 2 * B. 
Apply this to the team's average scores 😉
*/

const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;
// Btr: const calcAverage = (a, b, c) => (a+b+c)/3

const dolphinsAvg = calcAverage(85, 54, 41);
const koalasAvg = calcAverage(23, 34, 27);

function checkWinner(dolphinsAvg, koalasAvg) {
	if (dolphinsAvg >= 2 * koalasAvg) {
		console.log("Dolphins wins the game");
	} else if (koalasAvg >= 2 * dolphinsAvg) {
		console.log("Koalas wins the game");
	} else console.log("Nobody wins");
}

checkWinner(dolphinsAvg, koalasAvg);
```

# 09 Introduction to Arrays

- arrays can be mutated or changed even if it's declared as const. but can't change the whole array with another.

```javascript
// making arrays
const friends = ["shanta", "anup", "apurba", "avi", "tapu"];
// using Array method
const newFriends = new Array("hrittik", "biraj", "mono");

// to get any element
var thirdFiend = friends[2];

// to get the length/elements in array
console.log(friends.length);

// expression can also used in the index position
console.log(friends[friends.length - 1]);

// to change or mutate array
friends[2] = "jay";

// also put expression and variable inside array making
const allFriends = [friends, newFriends, 100 - 10];
```

# 10 Basic array operations(methods)

- can get the new length when pushing in array by storing it in var.

```javascript
const friends = ["shanta", "anup", "apurba", "avi", "tapu"];

// to add value in array at end
friends.push("jay");

// can get the new length when pushing new value
const newLength = friends.push("hrittik");

// add value at the beginning
friends.unshift("biraj");

// remove last element
friends.pop();
// returns the popped value
const popped = friends.pop();

// remove the first element
friends.shift();

// get index of elements
console.log(friends.indexOf("apurba"));
// return -1 if not present in array
console.log(friends.indexOf("subir"));
// new ES6 method ,returns true or false
// use strict comparison
console.log(friends.includes("joy"));
```

# 11 coding challenge 02

```javascript
/*
Steven is still building his tip calculator, using the same rules as before: Tip 15% of 
the bill if the bill value is between 50 and 300, and if the value is different, the tip is 
20%.
Your tasks: 
1. Write a function 'calcTip' that takes any bill value as an input and returns 
the corresponding tip, calculated based on the rules above (you can check out 
the code from first tip calculator challenge if you need to). Use the function 
type you like the most. Test the function using a bill value of 100 
2. And now let's use arrays! So create an array 'bills' containing the test data 
below
3. Create an array 'tips' containing the tip value for each bill, calculated from 
the function you created before 
4. Bonus: Create an array 'total' containing the total values, so the bill + tip 
Test data: 125, 555 and 44 
Hint: Remember that an array needs a value in each position, and that value can 
actually be the returned value of a function! So you can just call a function as array 
values (so don't store the tip values in separate variables first, but right in the new 
array) 😉
*/

function calcTip(bill) {
	if (bill >= 50 && bill <= 300) {
		return (bill * 15) / 100;
	} else return (bill * 20) / 100;
}

console.log(calcTip(100));

const bills = [125, 555, 44];

// code by author
const tips = [calcTip(bills[0]), calcTip(bills[0]), calcTip(bills[0])];

console.log(`Tips array:`);
console.log(tips);

const total = [];
total.push(bills[0] + tips[0]);
total.push(bills[2] + tips[2]);
total.push(bills[1] + tips[1]);

console.log(`Total bills array:`);
console.log(total);
```

# 12 Introduction to objects

# 13 Dot vs Bracket Notation in Js object

- dot notation is clean
- if expression(calculation) is needed then use bracket notation

```javaScript
const manabObj = {
	name: "Manab",
	age: 2022 - 2000,
	job: "freelancher",
	friends: ["shanta", "anup", "apurba", "tapu", "avi"],
};

// dot notation
console.log(manabObj.name);

// bracket notation
console.log(manabObj["job"]);
// can use expression in bracket notation
console.log(manabObj["fri" + "ends"]);

// bracket and dot notation to insert value
manabObj.height = '163'
manabObj['weight'] = '65'

console.log(
	`${manabObj.name} has ${manabObj.friends.length} friends, and his best friend is called ${manabObj.friends[0]}`
);
```

# 14 Object methods

- Methods: can store function in obj as key value pair
- arrays are special kind of obj
- thats why we can use arrays method to manipulate arrays.(push, shift, length method)

```javascript
const manabObj = {
	name: "Manab",
	birthYear: "2000",
	friends: ["shanta", "anup", "apurba"],
	hasDriverLicense: true,
	// basic type
	calcAge: function (birthYear) {
		return 2022 - birthYear;
	},

	// sophisticated type
	calcAge1: function () {
		// this refers to parent obj 'manabObj
		return 2022 - this.birthYear;
	},
	// also can store value to this obj
	calcAge2: function () {
		this.age = 2022 - this.birthYear;
		return this.age;
	},
};

console.log(manabObj.calcAge(2002));
console.log(manabObj.calcAge1());

// call the func once to store the value to obj
manabObj.calcAge2();
console.log(manabObj.age);

// challenge
console.log(
	`${manabObj.name} is a ${manabObj.calcAge1()} years old, and has ${
		manabObj.hasDriverLicense ? "a" : "no"
	} driver's license.`
);
```

# 15 Coding challenge 03

```javaScript
/*
Let's go back to Mark and John comparing their BMIs! This time, let's use objects to
implement the calculations! Remember: BMI = mass / height ** 2 = mass
/ (height * height) (mass in kg and height in meter)
Your tasks:
1. For each of them, create an object with properties for their full name, mass, and
height (Mark Miller and John Smith)
2. Create a 'calcBMI' method on each object to calculate the BMI (the same
method on both objects). Store the BMI value to a property, and also return it
from the method
3. Log to the console who has the higher BMI, together with the full name and the
respective BMI. Example: "John's BMI (28.3) is higher than Mark's (23.9)!"

Test data: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m
tall.
*/
const john = {
	name: "john",
	weight: "92",
	height: "1.95",
	calcBMI: function () {
		this.bmi = this.weight / this.height ** 2;
		return this.bmi;
	},
};

const mark = {
	name: "mark",
	weight: "78",
	height: "1.69",
	calcBMI: function () {
		this.bmi = this.weight / (this.height * this.height);
		return this.bmi;
	},
};

console.log(
	`John's BMI (${john.calcBMI()}) is ${
		john.bmi > mark.calcBMI() ? "higher" : "lower"
	} than Mark's (${mark.bmi})`
);
```

# 16 Iteration - the for loops

```javaScript
for (let rep = 1; rep <= 10; rep++) {
	console.log(`Squatting repetition ${rep} 🏋️‍♂️`);
}
```

# 17 Looping arrays, breaking and continuing

```javaScript
const family = ["bankim", "sabita", "milton", "bibek", "manab", "noni"];

for (let i = 0; i < family.length; i++) {
	console.log(`${i + 1}) ${family[i]}`);
}

// creating new array form array
const birthYear = [2000, 1995, 2004, 2001, 1956];
const age = [];

for (let i = 0; i < birthYear.length; i++) {
	age.push(2022 - birthYear[i]);
	// also can use (not preferable)
	// age[i] = 2022 - birthYear[i]
}

console.log(age);
```

- 'continue' skip the current iteration code
- 'break' exit the entire loop

```javaScript
// want to print all the prime
const numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let isPrime = true;

for (let i = 0; i < numbers.length; i++) {
	for (let j = 2; j < numbers[i]; j++)
		if (numbers[i] % j == 0) {
			console.log(`${numbers[i]} is not a prime no.`);
			isPrime = false;
			// break will stop checking if the number is divisible by any further number
			break;
		}
	if (isPrime == true) {
		console.log(`${numbers[i]} is a prime no.`);
	}
}

```

# 18 Looping backwards and loops in loops

```javaScript
//looping backwards

const noArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// start loop at last index then going backward
for (let i = noArray.length - 1; i >= 0; i--) {
	console.log(i, noArray[i]);
}
```

# 19 The while loop

```javaScript
let rep = 1;

// run until condition is true
while (rep <= 10) {
	console.log(`While Loop: squatting repetition ${rep}`);
	rep++;
}

```

# 20 Coding challenge 04

```javaScript
/*
Let's improve Steven's tip calculator even more, this time using loops!
Your tasks:
1. Create an array 'bills' containing all 10 test bill values
2. Create empty arrays for the tips and the totals ('tips' and 'totals')
3. Use the 'calcTip' function we wrote before (no need to repeat) to calculate
tips and total values (bill + tip) for every bill value in the bills array. Use a for
loop to perform the 10 calculations!
Test data: 22, 295, 176, 440, 37, 105, 10, 1100, 86 and 52
Hints: Call ‘calcTip ‘in the loop and use the push method to add values to the
tips and totals arrays 😉
Bonus:
4. Bonus: Write a function 'calcAverage' which takes an array called 'arr' as
an argument. This function calculates the average of all numbers in the given
array. This is a difficult challenge (we haven't done this before)! Here is how to
solve it:
4.1. First, you will need to add up all values in the array. To do the addition,
start by creating a variable 'sum' that starts at 0. Then loop over the
array using a for loop. In each iteration, add the current value to the
'sum' variable. This way, by the end of the loop, you have all values
added together
4.2. To calculate the average, divide the sum you calculated before by the
length of the array (because that's the number of elements)
4.3. Call the function with the 'totals' array
*/
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

const calcTip = (bill) => {
	return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
};

for (i = 0; i < bills.length; i++) {
	tips.push(calcTip(bills[i]));
	totals.push(calcTip(bills[i]) + bills[i]);
}

console.log(bills, tips, totals);

// Bonus
const calcAverage = (arr) => {
	let billSum = 0;
	for (i = 0; i <= arr.length - 1; i++) {
		billSum += arr[i];
	}
	return billSum / arr.length;
};

console.log("The average total bill is: ", calcAverage(totals));
```

# Done - 08/07/2022
