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
