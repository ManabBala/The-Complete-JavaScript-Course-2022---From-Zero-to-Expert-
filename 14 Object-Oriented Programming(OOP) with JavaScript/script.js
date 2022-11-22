"use strict";

const Person = function (firstName, birthYear) {
	this.firstName = firstName;
	this.birthYear = birthYear;

	// use prototype instead of this
	// this.calcAge = function () {
	// 	console.log(2050 - this.birthYear);
	// };
};

const jonas = new Person("Jonas", 1991);
console.log(jonas);

// What 'new' operator do......
// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

const manab = new Person("Manab", 2000);
console.log(manab);
console.log(manab instanceof Person); // true

// prototype
console.log(Person.prototype);
Person.prototype.calcAge = function () {
	console.log(2022 - this.birthYear);
};

// the calcAge() have inherited to both jonas and manab
jonas.calcAge();
manab.calcAge();
// to get the prototype associated to manab
// __proto__ is setted to Person.prototype while creating
console.log(jonas.__proto__);
// Person.prototype return the prototype associated with instances created by Person.
console.log(manab.__proto__ === Person.prototype); // true
// check is prototype is associated with and object
console.log(Person.prototype.isPrototypeOf(manab)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false

// also set properties not only method
Person.prototype.species = "Homo Sapiens"; // this property is inherited to all
console.log(jonas.species, manab.species);

console.log(jonas.hasOwnProperty("firstName")); // true as it's it's own
console.log(jonas.hasOwnProperty("species")); // false as it's inherited

// 08 Prototypal inheritance and built-in objects
console.log(manab.__proto__);
// Object.prototype (top of the prototype chain)
console.log(manab.__proto__.__proto__);
console.log(manab.__proto__.__proto__.__proto__);
// get the constructor of a prototype
console.dir(Person.prototype.constructor); // points back to Person

// prototype of a array
const arr = [2, 5, 1, 3, 6, 14, 7]; // same as arr = new Array(2,5,1,..)
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype); // true
// make a unique method to Array cons. of javaScript
Array.prototype.unique = function () {
	return [...new Set(this)];
};
console.log(arr.unique());

// prototype of HTML
const h1 = document.querySelector("h1");
console.dir(h1); // HTMLHeadingElement > HTMLElement > Element > Node > Object

// 10: ES6 class
// class expression
// const PersonCl = class { }

// class declaration
class PersonCl {
	constructor(firstName, birthYear) {
		this.firstName = firstName;
		this.birthYear = birthYear;
	}

	// Methods will be added to .prototype property
	calcAge() {
		console.log(2022 - this.birthYear);
	}
}

const anchal = new PersonCl("Anchal", 2001);
console.log(anchal);
anchal.calcAge();

// 11: Setter and Getters
const account = {
	owner: "Jonas",
	movements: [200, 500, 300, -444],

	get latest() {
		return this.movements.slice(-1).pop();
	},

	// only one argument
	set latest(mov) {
		this.movements.push(mov);
	},
};

console.log(account.latest);
account.latest = 233; // like setting any other property
console.log(account.movements);

// use of set and get to validate property in classes
// if i need i will look at the video...

// 12: Object.create
const PersonProto = {
	printName() {
		console.log(this.name);
	},
	init(name) {
		this.name = name;
	},
};
const shanta = Object.create(PersonProto);
console.log(shanta);
shanta.name = "Shanta";
shanta.printName();
console.log(shanta.__proto__ === PersonProto);

const rahul = Object.create(PersonProto);
rahul.init("Rahul");
rahul.printName();

// 15: Inheritance Between Classes and constructor function
// parent prototype holder
const Person3 = function (firstName, birthYear) {
	this.firstName = firstName;
	this.birthYear = birthYear;
};
Person3.prototype.calcAge = function () {
	console.log(2022 - this.birthYear);
};

// child prototype holder
const Student = function (firstName, birthYear, course) {
	Person.call(this, firstName, birthYear);
	this.course = course;
};
// linking Person prototype to Student prototype
// Student.prototype = Person.prototype // won't work as it's not just simple copying
Student.prototype = Object.create(Person3.prototype);
Student.prototype.introduce = function () {
	console.log(`My name is ${this.firstName} and I study ${this.course}`);
};
const tapu = new Student("Tapur", 1998, "Arts");
tapu.introduce();

console.log(tapu.__proto__);
console.log(tapu.__proto__.__proto__);

console.log(tapu instanceof Student); // true
console.log(tapu instanceof Person3); // true
// (fixing) making Student the constructor of tapu not Person3
Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

// 17: Inheritance Between Classes and ES6 Classes
class PersonCl1 {
	constructor(firstName, birthYear) {
		this.firstName = firstName;
		this.birthYear = birthYear;
	}
	// Methods will be added to .prototype property
	calcAge() {
		console.log(2022 - this.birthYear);
	}
}

class StudentCl extends PersonCl1 {
	constructor(fullName, birthYear, course) {
		// Always needs to happen first!
		super(fullName, birthYear);

		this.course = course;
	}
	introduce = function () {
		console.log(`My name is ${this.firstName} and I study ${this.course}`);
	};
	// calcAge() of it's own
	calcAge() {
		console.log(`I'm ${2022 - this.birthYear} year's old`);
	}
}

const pintu = new StudentCl("Pintu", 1978, "science");
pintu.introduce();
pintu.calcAge();

// 18: Inheritance Between Classes and Object.create
const PersonProto2 = {
	calcAge() {
		console.log(2022 - this.birthYear);
	},

	init(firstName, birthYear) {
		this.firstName = firstName;
		this.birthYear = birthYear;
	},
};

const StudentProto = Object.create(PersonProto2);
StudentProto.init = function (firstName, birthYear) {
	PersonProto2.init.call(this, firstName, birthYear);
};

StudentProto.introduce = function () {
	console.log(`I am ${this.firstName}. I am a web developer.`);
};

const jay = Object.create(StudentProto);
jay.init("Jay", 2001);
console.log(jay);

// 19: Another Class Example(see lec-20)
// 20: Encapsulation || Protected Properties and Method(see the readme file section)
// 21: Encapsulation || Private Properties and Method

// 1. Public fields
// 2. Private fields
// 3. Public Methods
// 4. Private Methods
// (there is also the static version(not so imp))

class Account {
	// 1. Public fields (instances)
	locale = navigator.language;

	// 2. Private fields (instances)
	#movements = [];
	#pin;

	constructor(owner, currency, pin) {
		this.owner = owner;
		this.currency = currency;
		this.#pin = pin;
		// Protected properties(just for convention; not internally protected)
		// this._movements = [];
		// this.locale = navigator.language;

		console.log(`Thanks for opening an account, ${owner}`);
	}

	// 3. Public methods
	getMovements() {
		return this.#movements;
	}
	deposit(val) {
		this.#movements.push(val);
		return this; // to use the chaining method
	}
	withdraw(val) {
		// can also share method
		this.deposit(-val);
		return this; // to use the chaining method
	}
	requestLoan(val) {
		if (this.#approveLoan(val)) {
			this.deposit(val);
			console.log(`Loan Approved of ${val}`);
		}
		return this; // to use the chaining method
	}

	// 4. Private method (instance)
	#approveLoan(val) {
		return true;
	}
}

const acc1 = new Account("Jonas", "EUR", 1111);
console.log(acc1);

// acc1.movements.push(250);
// acc1.movements.push(-120);
// Do this instead
acc1.deposit(250);
acc1.withdraw(120);

acc1.requestLoan(300);

// Instead we should use
console.log(acc1.getMovements());

// These are Private so Show can't access but get ERROR:
// console.log(acc1.#movements);
// console.log(acc1.#pin);
// console.log(acc1.#approveLoan(100));

// 22: Chaining Methods
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(2500).withdraw(3000);
console.log(acc1.getMovements());
