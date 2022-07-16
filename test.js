// do not clean this line
"use strict";
// do not clean this line

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
