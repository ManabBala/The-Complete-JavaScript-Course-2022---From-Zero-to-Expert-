# 03 What is object-Oriented Programming

![image](003%20What%20is%20Object-Oriented%20Programming_.mp4_snapshot_04.09_[2022.11.09_22.55.12].jpg)

![image](003%20What%20is%20Object-Oriented%20Programming_.mp4_snapshot_08.36_[2022.11.09_22.58.24].jpg)

## How do we design classes?

![image](003%20What%20is%20Object-Oriented%20Programming_.mp4_snapshot_12.41_[2022.11.09_23.00.56].jpg)

![image](003%20What%20is%20Object-Oriented%20Programming_.mp4_snapshot_15.55_[2022.11.09_23.06.04].jpg)

![image](003%20What%20is%20Object-Oriented%20Programming_.mp4_snapshot_18.24_[2022.11.09_23.08.08].jpg)

![image](003%20What%20is%20Object-Oriented%20Programming_.mp4_snapshot_20.13_[2022.11.09_23.09.09].jpg)

# 04 OOP in JavaScript

![image](004%20OOP%20in%20JavaScript.mp4_snapshot_06.48_[2022.11.09_23.13.50].jpg)

![image](004%20OOP%20in%20JavaScript.mp4_snapshot_09.56_[2022.11.09_23.15.37].jpg)

# 05 Constructor Functions and the new Operator

- constructor name start with capital letter
- constructor is like building plan, you can build as many new building as you like you same plan.

```javaScript
const Person = function (firstName, birthYear) {
	this.firstName = firstName;
	this.birthYear = birthYear;
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
```

# 🟥06 Prototypes

```javaScript
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
```

# 🟥07 Prototypal Inheritance and The Prototype Chain

![image](007%20Prototypal%20Inheritance%20and%20The%20Prototype%20Chain.mp4_snapshot_05.55_[2022.11.15_00.18.25].jpg)

![image](007%20Prototypal%20Inheritance%20and%20The%20Prototype%20Chain.mp4_snapshot_10.17_[2022.11.15_00.23.34].jpg)

# 08 Prototypal Inheritance and Build-in objects

```javaScript
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
```

# 09 Coding Challenge 1

```javaScript
/*
Your tasks:
1. Use a constructor function to implement a 'Car'. A car has a 'make' and a
'speed' property. The 'speed' property is the current speed of the car in
km/h
2. Implement an 'accelerate' method that will increase the car's speed by 10,
and log the new speed to the console
3. Implement a 'brake' method that will decrease the car's speed by 5, and log
the new speed to the console
4. Create 2 'Car' objects and experiment with calling 'accelerate' and
'brake' multiple times on each of them
Test data:
§ Data car 1: 'BMW' going at 120 km/h
§ Data car 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

const Car = function (make, speed) {
	this.make = make;
	this.speed = speed;
};

Car.prototype.accelerate = function () {
	this.speed += 10;
	console.log(`${this.make} is going at ${this.speed} km/h`);
};
Car.prototype.brake = function () {
	this.speed -= 5;
	console.log(`${this.make} is going at ${this.speed} km/h`);
};

const BMW = new Car("BMW", 120);
const Mercedes = new Car("Mercedes", 95);

BMW.accelerate();
BMW.brake();
BMW.accelerate();
```

# 10 ES6 Classes

- Just a syntactical sugar coat over constructor function
- this is to make it look cleaner

1. Classes are NOT hoisted(can't use before declaration)
2. Classes are first-class citizen
3. Classes are executed in strict mode

```javaScript
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
```

# 11 Setters and Getters for object(also for classes)

- special method like property for object to set and get value to/from object
- setter and Getter also works with classes.

```javaScript
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
// for example refer to coding challenge 2(video: 14)
```

# 12 Object.create

- create prototype first to link it to an object.

```javaScript
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
```

# 14 Coding challenge 2

```javaScript
/*
Your tasks:
1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide
by 1.6)
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but
converts it to km/h before storing the value, by multiplying the input by 1.6)
4. Create a new car and experiment with the 'accelerate' and 'brake'
methods, and with the getter and setter.
Test data:
§ Data car 1: 'Ford' going at 120 km/h
*/

class CarCl {
	constructor(make, speed) {
		this.make = make;
		this.speed = speed;
	}

	accelerate() {
		this.speed += 10;
		console.log(`${this.make} is going at ${this.speed} km/h`);
	}
	brake() {
		this.speed -= 5;
		console.log(`${this.make} is going at ${this.speed} km/h`);
	}

	get speedUS() {
		return this.speed / 1.6;
	}
	set speedUS(speed) {
		this.speed = speed * 1.6;
	}
}

const ford = new CarCl("Ford", 120);
ford.accelerate();
ford.accelerate();
ford.brake();
console.log(ford.speedUS, "mi/h");
ford.speedUS = 80;
console.log(ford.speed, "km/h");
console.log(ford.speedUS, "mi/h");
console.log(ford);
```

# 15 Inheritance Between Classes and constructor function

![image](015%20Inheritance%20Between%20_Classes__%20Constructor%20Functions.mp4_snapshot_02.24_[2022.11.15_20.19.48].jpg)

![image](015%20Inheritance%20Between%20_Classes__%20Constructor%20Functions.mp4_snapshot_10.14_[2022.11.15_20.24.16].jpg)

![image](015%20Inheritance%20Between%20_Classes__%20Constructor%20Functions.mp4_snapshot_16.04_[2022.11.15_20.27.47].jpg)

```javaScript
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
```

# 16 Coding Challenge 03

```javaScript
/*
Your tasks:
1. Use a constructor function to implement an Electric Car (called 'EV') as a child
"class" of 'Car'. Besides a make and current speed, the 'EV' also has the
current battery charge in % ('charge' property)
2. Implement a 'chargeBattery' method which takes an argument
'chargeTo' and sets the battery charge to 'chargeTo'
3. Implement an 'accelerate' method that will increase the car's speed by 20,
and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140
km/h, with a charge of 22%'
4. Create an electric car object and experiment with calling 'accelerate',
'brake' and 'chargeBattery' (charge to 90%). Notice what happens when
you 'accelerate'! Hint: Review the definition of polymorphism 😉
Test data:
§ Data car 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/
const Car = function (make, speed) {
	this.make = make;
	this.speed = speed;
};
Car.prototype.accelerate = function () {
	this.speed += 10;
	console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
	this.speed -= 5;
	console.log(`${this.make} is going at ${this.speed} km/h`);
};

const EV = function (make, speed, charge) {
	Car.call(this, make, speed);
	this.charge = charge;
};
// link the property
EV.prototype = Object.create(Car.prototype);
EV.prototype.chargeBattery = function (changeTo) {
	this.charge = changeTo;
};
EV.prototype.accelerate = function () {
	this.speed += 20;
	this.charge -= 1;
	console.log(`${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}%`);
};

const tesla = new EV("Tesla", 120, 23);
tesla.chargeBattery(90);
// as there two accelerate method, tesla will use the closest one.
tesla.accelerate();
tesla.accelerate();
tesla.brake();
tesla.accelerate();
```

# 17 Inheritance Between Classes and ES6 Classes

```javaScript
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
```

# 18 Inheritance Between Classes and Object.create

![image](018%20Inheritance%20Between%20_Classes__%20Object.create.mp4_snapshot_03.27_[2022.11.21_22.17.02].jpg)

```javaScript
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
```

# 19 Another Class Example

- adding all to lecture 20

# 20 Encapsulation, Protected Properties and Method

- ( \_ ) is used as a convention for developer to not to touch the variable outside the class itself.
- though it's not internally protected.

```javaScript
class Account {
	constructor(owner, currency, pin) {
		this.owner = owner;
		this.currency = currency;
		this.pin = pin;
		// Protected properties(just for convention; not internally protected)
		this._movements = [];
		this.locale = navigator.language;

		console.log(`Thanks for opening an account, ${owner}`);
	}
	// Public interface
	getMovements() {
		return this._movements;
	}
	deposit(val) {
		this._movements.push(val);
	}
	withdraw(val) {
		// can also share method
		this.deposit(-val);
	}
	_approveLoan(val) {
		return true;
	}
	requestLoan(val) {
		if (this._approveLoan(val)) {
			this.deposit(val);
			console.log(`Loan Approved of ${val}`);
		}
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

// we can still access but should not
console.log(acc1._movements);
// Instead we should use
console.log(acc1.getMovements());
```

# 21 Encapsulation || Private Properties and Method

- Truly protected
- This fields and methods are now part of every instances not the parent Class.

```javaScript
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
	}
	withdraw(val) {
		// can also share method
		this.deposit(-val);
	}
	requestLoan(val) {
		if (this.#approveLoan(val)) {
			this.deposit(val);
			console.log(`Loan Approved of ${val}`);
		}
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
```

# 22 Chaining Methods

- need to add the (return this) to every method in order to chain a next method.

```javaScript
deposit(val) {
	this.#movements.push(val);
	return this; // to use the chaining method
}

acc1.deposit(300).deposit(500).withdraw(35).requestLoan(2500).withdraw(3000);
console.log(acc1.getMovements());
```

# 23 ES6 Classes Summary

![image](023%20ES6%20Classes%20Summary.mp4_snapshot_06.44_[2022.11.21_23.39.02].jpg)

# 24 Coding Challenge 4

```javaScript
/*
Your tasks:
1. Re-create Challenge #3, but this time using ES6 classes: create an 'EVCl'
child class of the 'CarCl' class
2. Make the 'charge' property private
3. Implement the ability to chain the 'accelerate' and 'chargeBattery'
methods of this class, and also update the 'brake' method in the 'CarCl'
class. Then experiment with chaining!
Test data:
§ Data car 1: 'Rivian' going at 120 km/h, with a charge of 23%
*/

class CarCl {
	constructor(make, speed) {
		this.make = make;
		this.speed = speed;
	}

	brake() {
		this.speed -= 5;
		console.log(`${this.make} is going at ${this.speed} km/h`);
		return this;
	}
}

class EVCl extends CarCl {
	// private property
	#charge;
	constructor(make, speed, charge) {
		// providing constructor value to parent
		super(make, speed);

		this.#charge = charge;
	}

	accelerate() {
		this.speed += 20;
		this.#charge--;
		console.log(`${this.make} is going at ${this.speed} km/h, with charge of ${this.#charge}%`);
		// to chain method
		return this;
	}
	chargeBattery(chargeTo) {
		this.#charge = chargeTo;
		console.log(`${this.make} charged at ${this.#charge}%`);
		return this;
	}
}

const rivian = new EVCl("Rivian", 120, 23);
console.log(rivian);
rivian.accelerate().accelerate().brake().chargeBattery(90).accelerate();
```
