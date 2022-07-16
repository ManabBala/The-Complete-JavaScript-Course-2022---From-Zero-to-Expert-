# 03 An high-Level overview of javaScript

- High-level
- Garbage-collected
- Interpreted or just-in-time compiled
- Multi-paradigm
- Prototype-based object-oriented
- First class function
- Dynamic
- single-thread
- Non-blocking event loop

# 04

- js is not purely interpreted but just in time compiled
-

# 05 Execution context and call stack

# 06 Scope and the scope chain

- Global scope
- Function scope/local scope
- Block scope
  - variables are accessible only inside block(inside curly bracket)(else if, for loop....)
  - However, this only applies to let and const variables.
  - so var is function scoped but never block scoped
  - Functions are also block scoped(only in strict mode)(should use this)

![image](006%20Scope%20and%20The%20Scope%20Chain.mp4_snapshot_07.54_[2022.07.15_15.08.19].jpg)

# 07

- Variable lookup :- When a variable is not in the current scope, the engine looks up in the scope chain until it finds the variable it's looking for.
- can declare variable with same name form outer scope.

# 08 Variable environment\_ hoisting and the TDZ

- Hoisting: makes some types of variables accessible/usable in the code before they are actually declared."variables lifted to the top of their scope".

- this slides really important

![image](008%20Variable%20Environment_%20Hoisting%20and%20The%20TDZ.mp4_snapshot_05.55_[2022.07.15_21.54.18].jpg)

- TDZ : temporal dead zone for let and const, means variable cannot be accessed before declaration line.
- it is used to avoid bugs

![image](008%20Variable%20Environment_%20Hoisting%20and%20The%20TDZ.mp4_snapshot_10.51_[2022.07.15_22.00.36].jpg)

# 09 Hoisting adn TDZ in practice

- don't use var for variable declaration
- try to use const
- try to declare function at the top of the scope

# 10 The this keyword

- this keyword/variable: special variable that is created for every execution context(every function). takes the value of( points to) the "owner" of the function in which the this keyword is used.
- this is not static. depends on how the function is called.

![image](010%20The%20this%20Keyword.mp4_snapshot_06.19_[2022.07.15_23.06.57].jpg)

# 11 The this keyword in practice

```javaScript
// do not clean this line
"use strict";
// do not clean this line

// this will refer to the window object
console.log(this);

const calcAge = function (birthYear) {
	console.log(2022 - birthYear);
	// will give undefined in strict mode
	console.log(this);
};
calcAge(2000);

const calcAgeArrow = (birthYear) => {
	console.log(2022 - birthYear);
  // arrow func don't have own this keyword so this will refer to parent object(window)
	console.log(this);
};
calcAgeArrow(2011);

const manab = {
	year: 2000,
	calcAge: function () {
		// this referring to parent object(manab)
		console.log(this);
		console.log(2022 - this.year);
	},
};
manab.calcAge();

const shanta = {
	year: 2001,
};
// borrowing function form another object
shanta.calcAge = manab.calcAge;
shanta.calcAge();

const f = manab.calcAge;
// wont find this so no year properties
// f here works like regular function so no parent object to refer this
f();
```

# 12 Regular function vs Arrow function

- never use arrow function in method(func inside object)

```javaScript
// do not clean this line
"use strict";
// do not clean this line

const manab = {
	year: 2000,
	calcAge: function () {
		console.log(2022 - this.year);

		const isMillennial = function () {
			console.log(this.year >= 1981 && this.year <= 1996);
		};
		// this will be undefined as called as a regular function call and normal function doesn't have any this.
		// isMillennial();

		// solution 1
		const self = this;
		const isMillennial1 = function () {
			console.log(self.year >= 1981 && self.year <= 1996);
		};
		isMillennial1();

		// solution 2
		// in arrow func 'this' will refer to parent scope and get this
		const isMillennial2 = () => {
			console.log(this.year >= 1981 && this.year <= 1996);
		};
		isMillennial2();
	},
};

manab.calcAge();
```

- Arguments keywords:
  - refer to all the arguments passed in to a function
  - can pass more argument than declared in func
  - arrow function don't have 'arguments' keyword

```javaScript
  const addExpr = function (a, b) {
	// return a array of arguments passed at func call
	console.log(arguments);
	return a + b;
};

addExpr(2, 3, 5, 6, 2, 1, 4);
```

# 13 Primitives vs. Objects(primitives vs reference types)

- Primitives values behave normally when copied to new variable but object type values get refereed to the old object to the new variable.
- Reference type variable(objects) declared as const in mutable.

![image](<013%20Primitives%20vs.%20Objects%20(Primitive%20vs.%20Reference%20Types).mp4_snapshot_13.28_[2022.07.16_02.24.54].jpg>)

```javaScript
// return everything as expected
let age = 30;
let oldAge = age;
age = 31;
console.log(age, oldAge);

// behave weirdly
const me = {
	age: 22,
};

// no new object is created but a new variable(friend) is refereed to the old object
const friend = me;
friend.age = 21;

// both age will be 21
// as they are the same object but refereed by different variable(me and friend)
console.log("me:", me.age);
console.log("friend:", friend.age);
```

# 14 Primitives vs Objects in practice

- Solving the object copping problem

```javaScript
const jessica = {
	firstName: "Jessica",
	lastName: "Williams",
	age: 27,
	family: ["Ron", "John"],
};

// solution 1(works with the first level of the object)
// merging a empty object with old object
const marriedJessica = Object.assign({}, jessica);
marriedJessica.lastName = "David";
console.log("Before marriage:", jessica);
console.log("After marriage:", marriedJessica);

// but nested object's branch are again assigned to old one
marriedJessica.family.push("Manab");
// both will have three values
console.log("Before marriage:", jessica);
console.log("After marriage:", marriedJessica);

// solution 02- Deep clone with external library
// for later section
```
