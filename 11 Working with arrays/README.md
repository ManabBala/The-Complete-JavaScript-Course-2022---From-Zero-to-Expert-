# 03 Simple array methods

```javaScript
// SLICE(don't mutate main arr)
let arr = ["a", "b", "c", "d", "e"];
console.log(arr.slice(2));
// skip the second arg element
console.log(arr.slice(2, 4));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
// making sallow copy of arr
console.log(arr.slice());
console.log([...arr]);

// SPLICE(mutate main arr) , return deleted el
// 3 element also deleted
arr.splice(2, 3);
console.log(arr);
// delete last element
arr.splice(-1);
console.log(arr);

// REVERSE(mutate org array)
const arr2 = ["j", "i", "h", "g", "f"];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT(don't mutate)
arr = ["a", "b", "c", "d", "e"];
const letters = arr.concat(arr2);
console.log(letters);
// with array destructuring
console.log([...arr, ...arr2]);

// JOIN
console.log(letters.join(" - "));

// All the method from string is valid
// shift, push, includes, pop,......
```

# 04 The new at method

```javaScript
const arr = [1, 2, 3, 4, 5];
// old method
console.log(arr[1]);
// at method
console.log(arr.at(1));

// getting the last element
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
// with at method
console.log(arr.at(-1));

// at method also works with str
console.log("Manab".at(-1));
```

# 05 Looping arrays || forEach

- forEach is a call back function
- break and continue don't work forEach but in for of loop.
- Full iteration will take place in forEach

```javaScript
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// with for of loop
for (const [i, movement] of movements.entries()) {
	if (movement > 0) {
		console.log(`Movement ${i + 1}: You deposited ${movement}`);
	} else {
		console.log(`Movement ${i + 1}: ${Math.abs(movement)}`);
	}
}

console.log("------FOREACH------");
// with forEach(a callback function)
// movements.forEach(function (movement, index, array) // name doesn't matter but order
movements.forEach(function (mov, i, arr) {
	if (mov > 0) {
		console.log(`Movement ${i + 1}: You deposited ${mov}`);
	} else {
		console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
	}
});
```

# 06 forEach with maps and sets

```javaScript
// Maps
const currencies = new Map([
	["USD", "United States dollar"],
	["EUR", "Euro"],
	["GBP", "Pound sterling"],
]);
currencies.forEach(function (value, key, map) {
	console.log(`${key}: ${value}`);
});

// Set
const currenciesUnique = new Set(["USD", "GBP", "INR", "BDT", "USD", "EUR", "EUR"]);
// there is no key/index in sets so empty variable assigned
currenciesUnique.forEach((value, _, map) => {
	console.log(`${value}`);
});
```

# 07 Project Bankist App

![image](Bankist-flowchart.png)

# 08 Creating DOM element

- refer main Bankist App

# 09 Coding challenge 01

```javaScript
/*
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners
about their dog's age, and stored the data into an array (one array for each). For
now, they are just interested in knowing whether a dog is an adult or a puppy.
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years
old.
Your tasks:
Create a function 'checkDogs', which accepts 2 arrays of dog's ages
('dogsJulia' and 'dogsKate'), and does the following things:
1. Julia found out that the owners of the first and the last two dogs actually have
cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
ages from that copied array (because it's a bad practice to mutate function
parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1
is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy
🐶")
4. Run the function for both test datasets
Test data:
§ Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
§ Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
*/

const checkDogs = function (dogsJulia = [], dogsKate = []) {
	// removing cats from julia's list
	const dogsJuliaCorrect = dogsJulia.slice();
	dogsJuliaCorrect.splice(0, 1);
	dogsJuliaCorrect.splice(-2);
	// console.log(dogsJuliaCorrect);
	const allDogs = [...dogsJuliaCorrect, ...dogsKate];

	allDogs.forEach((age, i) => {
		console.log(
			`Dog Number ${i + 1} is an ${age >= 3 ? "adult" : "puppy"}, and is ${age} years old.`
		);
	});
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4])
```

# 10 Data transformation || map, filter, reduce

![image](010%20Data%20Transformations_%20map,%20filter,%20reduce.mp4_snapshot_04.21_[2022.08.06_22.41.49].jpg)

# 11 The map Method

- used to create new array from array iteration
- map method store returned value to new array after every callback.

```javaScript
const euroToUsd = 1.1;
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// functional programming
const movementsUSD = movements.map((mov) => mov * euroToUsd);
// const movementsUSD = movements.map(function (mov) {
// 	return mov * euroToUsd;
// });
console.log(movements);
console.log(movementsUSD);

// conventional method
const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * euroToUsd);
console.log(movementsUSDfor);
```

# 12 Computing usernames

- bankist app

# 13 The filter method

- it is used to generate new array by filtering values from existing array
- if boolean(true or false) is returned it will put the current value to the new array accordingly(true or false)

```javaScript
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposit = movements.filter(function (mov) {
	// if mov is not negative it will return true thus adding the positive value to the array
	return mov > 0;
});
console.log(movements);
console.log(deposit);
```

# 14 The reduce method

- reduce is used to sum up a array
- internal callback fn have a accumulator agr to hold the sum up value
- second arg of reduce method is the initial value of the accumulator.
-

```javaScript
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// function(accumulator, current, index, array)
const balance = movements.reduce(function (acc, cur, i, arr) {
	return acc + cur;
}, 0); // here 0 is the initial value of the accumulator
console.log(balance);

// Example 2: get the max value with the reduce method
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const maxNum = movements.reduce((acc, cur) => {
	if (acc > cur) return acc;
	else return cur;
}, movements[0]);
console.log(maxNum);
```

# 15 Coding challenge 02

```javaScript
/*
Let's go back to Julia and Kate's study about dogs. This time, they want to convert
dog ages to human ages and calculate the average age of the dogs in their study.
Your tasks:
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
ages ('ages'), and does the following things in order:
1. Calculate the dog age in human years using the following formula: if the dog is
<= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
humanAge = 16 + dogAge * 4
2. Exclude all dogs that are less than 18 human years old (which is the same as
keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know
from other challenges how we calculate averages 😉)
4. Run the function for both test datasets
Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]
*/

const calcAverageHumanAge = function (ages = []) {
	// 01: dog age to human age
	const humanAges = ages.map((dogAge, i) => {
		if (dogAge <= 2) return dogAge * 2;
		else return 16 + dogAge * 4;
	});
	console.log(humanAges);
	// 02: filtering if human age is greater than 18
	const adultDogs = humanAges.filter((humanAge) => humanAge >= 18);
	console.log(adultDogs);
	// 03: calculating average adult dog
	// const avgAdultDogAge = adultDogs.reduce((acc, adultDog) => acc + adultDog, 0) / adultDogs.length;
	const avgAdultDogAge = adultDogs.reduce(
		(acc, adultDog, _, arr) => acc + adultDog / arr.length,
		0
	);
	console.log(avgAdultDogAge);
};
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
```

# 16 The magic of chaining map, filter and reduce methods

- can chain multiple method if the returning value is an array in each method
- for debugging just log the arr argument of each method

```javaScript
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const euroToUsd = 1.1;

// Chaining multiple methods
const totalDepositsUSD = movements
	.filter((mov) => mov > 0)
	.map((mov, i, arr) => {
		// for debugging just log the arr argument of each method
		console.log(arr);
		return mov * euroToUsd;
	})
	.reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD);
```

# 17 Coding challenge 03

```javaScript
/*
Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time
as an arrow function, and using chaining!
Test data:
§ Data 1: [5, 2, 4, 1, 15, 8, 3]
§ Data 2: [16, 6, 10, 5, 6, 1, 4]

# coding challenge 02
Let's go back to Julia and Kate's study about dogs. This time, they want to convert
dog ages to human ages and calculate the average age of the dogs in their study.
Your tasks:
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
ages ('ages'), and does the following things in order:
1. Calculate the dog age in human years using the following formula: if the dog is
<= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
humanAge = 16 + dogAge * 4
2. Exclude all dogs that are less than 18 human years old (which is the same as
keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know
from other challenges how we calculate averages 😉)
*/

const calcAverageHumanAge = (ages) =>
	ages
		.map((dogAge) => (dogAge <= 2 ? dogAge * 2 : 16 + dogAge * 4))
		// filtering adult dog
		.filter((dogHumanAge) => dogHumanAge > 18)
		// calculating agv age
		.reduce((acc, adultDogHumanAge, _, arr) => acc + adultDogHumanAge / arr.length, 0);

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
```

# 18 The find method

- find method works like filter method but instead of finding all element it return the first element that satisfy the condition.

```javaScript
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const firstWithdrawal = movements.find((mov) => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

// Example: 2
const accounts = [
	{
		owner: "Jonas Schmedtmann",
		movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
		interestRate: 1.2, // %
		pin: 1111,
	},
	{
		owner: "Jessica Davis",
		movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
		interestRate: 1.5,
		pin: 2222,
	},
	{
		owner: "Steven Thomas Williams",
		movements: [200, -200, 340, -300, -20, 50, 400, -460],
		interestRate: 0.7,
		pin: 3333,
	},
];
const jessAccount = accounts.find((acc) => acc.owner === "Jessica Davis");
console.log(jessAccount);
```

# 19 Implementing Login

- refer the Bankist app

# 20 Implementing Transfers

- refer the Bankist app

# 21 The findIndex method

- refer the Bankist app(deletion of account)
- findIndex return index of element based on a condition

```javaScript
const movements = [5000, 3400, -150, -790, -3210, -1000, 8500, -30];
const index = movements.findIndex((mov) => mov === -790);
console.log(index);
```

# 22 some and every

- works like includes but based on condition

## some:

- return true(boolean) if 'some' of the element fulfill the condition

```javaScript
const movements = [5000, 3400, -150, -790, -3210, -1000, 8500, -30];
// based on equality
console.log(movements.includes(-790));

// based on condition
console.log(movements.some((mov) => mov === -791));
// check if there is any movement over 500
console.log(movements.some((mov) => mov > 500));
```

## every:

- return true(boolean) if 'every' element fulfill the condition

```javaScript
const movements = [5000, 3400, -150, -790, -3210, -1000, 8500, -30];
// checking if every movement if deposit(positive)
console.log(movements.every((mov) => mov > 0));
```

# 23 flat and flatMap

## flat:

- flatten a nested array thus putting elements into one single array
- flat(arg), here arg determine the nesting level the method should flat.
- default arg is 1, means it should go one level deep that the main array.

## flatMap:

- this combine the map and flat method.
- flat level is one(can't change)
- fist map collect values in different arrays and then flat flatten all arrays.

```javaScript
const arr = [[1, 2, 3, 4], 5, 6, [7, 8, 9]];
// flatting upto level one(default)
console.log(arr.flat());
console.log(arr.flat(1));

const arrDeep = [1, 2, [3, 4, 5, [6, 7], 8], 9];
console.log(arrDeep.flat());
// flatting to level 2
console.log(arrDeep.flat(2));

// Example: bankist app
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
const accounts = [account1, account2, account3];

// flat
const overallBalance = accounts
	.map((acc) => acc.movements)
	.flat()
	.reduce((acc, mov) => acc + mov);
console.log(overallBalance);

// flatMap: combining flat and map method()
// here flat method is only one level deep(can't change)
const overallBalance2 = accounts.flatMap((acc) => acc.movements).reduce((acc, mov) => acc + mov);
console.log(overallBalance2);
```

# sorting arrays

- mutate the original array
- by default 'sort' convert everything to string and then sorts.

```javaScript
// Strings:
const owners = ["Jonas", "Zach", "Adam", "Martha"];
console.log(owners.sort());

// Numbers:
const movements = [5000, 3400, -150, -790, -3210, -1000, 8500, -30];
// won't work
console.log(movements.sort()); // will sort the string form of the movement's elements

// correct way:
// a and b are two consecutive number
// if return value is LESS than 0; a will be sorted BEFORE b
// if return value is GREATER than 0; a will be sorted AFTER b
// return < 0; a, b(keep order)
// return > 0; b, a(switch order)

// movements.sort((a, b) => {
// 	if (a > b) return 1;
// 	if (a < b) return -1;
// });
// Ascending
movements.sort((a, b) => a - b);
console.log(movements);
// descending
movements.sort((a, b) => b - a);
console.log(movements);
```

# 25 More ways of creating and filing arrays

- new Array(4), will create empty array
- can use fill() to fill values
- Use Array.from({length: 5}, (\_, i) => i + 1) pattern to generate new array
- Array.from() is used to convert array like data structure(like node,etc) into js array.

```javaScript
const arr = [1, 2, 3, 4, 5, 6, 7, 8];
console.log(new Array(1, 2, 3, 4, 5));

// Empty arrays + fill method
// if one value is passed js acts weirdly
const x = new Array(7); // js will create an array with 5 empty value
console.log(x);
// can't use map method
// console.log(x.map(() => 5));
// fill method to fill values
// x.fill(1); // fill all the space with 1
x.fill(1, 3, 5); // fill 1 from 3 till 5
console.log(x);
// more fill method use
arr.fill(69, 2, 5); // change el to 69 from index 2 till 5
console.log(arr);

// Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y);
// here callback fn work just like the map method
const z = Array.from({ length: 8 }, (_, index) => index + 1);
console.log(z);
```

## Example: use of Array.from()

- code valid in bankist app

```javaScript
// this code only for testing purpose of Array.from() method
labelBalance.addEventListener("click", (e) => {
	// convert elements node data to js array
	const movementsUI = Array.from(document.querySelectorAll(".movements__value"));
	console.log(movementsUI);
	// get value from el and modify it with map method
	console.log(movementsUI.map((el) => Number(el.textContent.replace("€", ""))));
});
```

# 26: Summary || which array method to use

![image](026%20Summary_%20Which%20Array%20Method%20to%20Use_.mp4_snapshot_06.01_[2022.08.09_23.18.11].jpg)

# 27: Array methods practice

- last section of bankist app

```javaScript
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
```

# Coding challenge 04

```javaScript
/*
Julia and Kate are still studying dogs, and this time they are studying if dogs are
eating too much or too little.
Eating too much means the dog's current food portion is larger than the
recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10%
above and 10% below the recommended portion (see hint).
Your tasks:
1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate
the recommended food portion and add it to the object as a new property. Do
not create a new array, simply loop over the array. Formula:
recommendedFood = weight ** 0.75 * 28. (The result is in grams of
food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too
little. Hint: Some dogs have multiple owners, so you first need to find Sarah in
the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much
('ownersEatTooMuch') and an array with all owners of dogs who eat too little
('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and
Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat
too little!"
5. Log to the console whether there is any dog eating exactly the amount of food
that is recommended (just true or false)
6. Log to the console whether there is any dog eating an okay amount of food
(just true or false)
7. Create an array containing the dogs that are eating an okay amount of food (try
to reuse the condition used in 6.)
8. Create a shallow copy of the 'dogs' array and sort it by recommended food
portion in an ascending order (keep in mind that the portions are inside the
array's objects 😉)

Hints:
§ Use many different tools to solve these challenges, you can use the summary
lecture to choose between them 😉
§ Being within a range 10% above and below the recommended portion means:
current > (recommended * 0.90) && current < (recommended *
1.10). Basically, the current portion should be between 90% and 110% of the
recommended portion.
*/
const dogs = [
	{ weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
	{ weight: 8, curFood: 200, owners: ["Matilda"] },
	{ weight: 13, curFood: 275, owners: ["Sarah", "John"] },
	{ weight: 32, curFood: 340, owners: ["Michael"] },
];

// 01: calc recommended food
dogs.forEach((dog) => {
	dog.recFood = Math.trunc(dog.weight ** 0.75 * 28);
});
console.log(dogs);

// 02: Sarah's dog eating
const sarahDog = dogs.find((dog) => dog.owners.includes("Sarah"));
if (sarahDog.curFood > sarahDog.recFood) console.log(`Sarah's dog eating too much!`);

// 03: array of owners with dogs food habit
// const { ownersEatTooMuch, ownersEatTooLittle } = dogs.reduce(
// 	(ownObj, dog) => {
// 		if (dog.curFood > dog.recFood) {
// 			ownObj.ownersEatTooMuch.push(...dog.owners);
// 		} else if (dog.curFood < dog.recFood) {
// 			ownObj.ownersEatTooLittle.push(...dog.owners);
// 		}
// 		return ownObj;
// 	},
// 	{ ownersEatTooMuch: [], ownersEatTooLittle: [] }
// );
const ownersEatTooMuch = dogs
	.filter((dog) => dog.curFood > dog.recFood)
	.flatMap((dog) => dog.owners);
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
	.filter((dog) => dog.curFood < dog.recFood)
	.flatMap((dog) => dog.owners);
console.log(ownersEatTooLittle);

// 04: Logging over/underEating owners
console.log(`${ownersEatTooMuch.join(" and ")}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(" and ")}'s dogs eat too little!`);

// 05: if there any dog eating exactly same as recommended
console.log(dogs.some((dog) => dog.curFood === dog.recFood));

// 06: if there any dog eating okay amount
const isEatingOkay = (dog) => dog.curFood >= dog.recFood * 0.9 && dog.curFood <= dog.recFood * 1.1;
console.log(dogs.some(isEatingOkay));

// 07: array of dogs eating okay amount
console.log(dogs.filter(isEatingOkay));

// 08: sort a shallow copy of dogs rec. food acc. order
const dogsCopy = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsCopy);
```
