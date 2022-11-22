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