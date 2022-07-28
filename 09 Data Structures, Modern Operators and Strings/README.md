# 03 Destructuring arrays

```javaScript
// should declare all the variable with const
const arr = ["a", "b", "c"];
const [x, y, z] = arr;
console.log(x, y, z);
// can also take only few
const [first, second] = arr;
console.log(first, second);
// to skip a element use '' blank space
const [one, , three] = arr;
console.log(one, three);

const restaurant = {
	name: "Classico Italiano",
	location: "Via Angelo Tavanti 23, Firenze, Italy",
	categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
	starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
	mainMenu: ["Pizza", "Pasta", "Risotto"],

	order: function (starterIndex, mainCourseIndex) {
		return [this.starterMenu[starterIndex], this.mainMenu[mainCourseIndex]];
	},
};

let [main, secondary] = restaurant.categories;
console.log(main, secondary);
// Switching/mutating variable with easy method
[main, secondary] = [secondary, main];
console.log(main, secondary);

// Receive multiple values from a function
const [starter, mainCourse] = restaurant.order(3, 1);
console.log(starter, mainCourse);

// destructuring nested array
const nested = [1, 2, [3, 4], 5];
// destructuring inside of destructuring
const [a, b, [c, d], e] = nested;
console.log(a, b, c, d, e);

// giving default values while destructuring
// important for API call
const [p = 1, q = 1, r = 1] = [8, 3];
// r would be Undefined if not default value
console.log(p, q, r);
```

# 04 Destructuring objects

```javaScript
const restaurant = {
	name: "Classico Italiano",
	location: "Via Angelo Tavanti 23, Firenze, Italy",
	categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
	starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
	mainMenu: ["Pizza", "Pasta", "Risotto"],

	openingHours: {
		thu: {
			open: 12,
			close: 22,
		},
		fri: {
			open: 11,
			close: 23,
		},
		sat: {
			open: 0, // Open 24 hours
			close: 24,
		},
	},

	// destructuring right away in the param with default values
	orderDelivery: function ({ time, address, mainIndex = 1 }) {
		console.log("order received: ", time, address, this.mainMenu[mainIndex]);
	},
};

// calling method with obj
restaurant.orderDelivery({
	time: "22:30",
	address: "Via del Sole, 21",
});

// produce variable same as the key name
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);
// to store in a different variable
const { name: restaurantNam, openingHours: hours } = restaurant;
console.log(restaurantNam, hours);

// providing default values if object don't have any property with same name
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 7 };
// have to wrap in first bracket
({ a, b } = obj);
console.log(a, b);

// nested object
const {
	fri: { open, close },
} = openingHours;
console.log(open, close);
// variable with different name
const {
	fri: { open: o, close: c },
} = openingHours;
console.log(o, c);
```

# 05 The spread operator(...)

- ... return individual value separated with comma which useful in function param or array building
- template literal does not accept spread operator's values as they are separated with comma
- spread operator works on all iterables(es2018-partially object)
- Iterables: arrays, strings, maps, sets. NOT objects

```javaScript
const arr = [7, 8, 9];
const badNewArr = [1, 2, 3, arr[0], arr[1], arr[2]];
console.log(badNewArr);
// with array spread method
const newArr = [1, 2, 3, ...arr];
console.log(newArr);
// ... return individual value separated with comma
console.log(...newArr); // same as console.log(1, 2, 3, 4, 5)

const restaurant = {
	name: "Classico Italiano",
	location: "Via Angelo Tavanti 23, Firenze, Italy",
	categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
	starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
	mainMenu: ["Pizza", "Pasta", "Risotto"],

	cooking: function (ing1, ing2, ing3) {
		console.log(`Making dish with ${ing1}, ${ing2} and ${ing3}.`);
	},
};

const newMenu = [...restaurant.mainMenu, "Chicken Kabab"];
console.log(newMenu);

// copy array
const mainMenuCopy = [...restaurant.mainMenu];
// join multiple arrays
const allMenuItems = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(allMenuItems);

//spread operator works on all iterables(es2018-partially object)
const string = "MyNameIsManab";
const letters = [...string, "z."];
console.log(...letters);

// real world example
const ingredients = ["Chicken", "Mushroom", "Potato"];
// old method
restaurant.cooking(ingredients[0], ingredients[3], ingredients[2]);
// modern spread method
restaurant.cooking(...ingredients);

// spread operator with objects
// copy object fully(as like assign) also add elements
const newRestaurant = { id: "0098", ...restaurant, founder: "Manab" };
console.log(newRestaurant);
```

# 06 Rest pattern and parameters

- rest element have to be the last element. so can use only one rest element in destruction
- rest element won't include skipped item([a, ,c, ...others] here others wont have b value)

```javaScript
// SPREAD, as ... on right side of =
const newArr = [1, 2, ...[3, 4, 5]];

// REST, as ... on left side of =
// REST will put remaining elements to new array
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

const restaurant = {
	name: "Classico Italiano",
	loc: "Via Angelo Tavanti 23, Firenze, Italy",
	categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
	starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
	mainMenu: ["Pizza", "Pasta", "Risotto"],
	makeCurry: function (mainIngredient, ...otherIngredients) {
		console.log(`Making ${mainIngredient} curry with ${otherIngredients}.`);
	},
};
restaurant.makeCurry("chicken", "mushroom", "onion", "garlic", "potato");

// combining SPREAD and REST operator
const [item1, item2, ...remainingItems] = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(item1, item2, remainingItems);
// rest element have to be the last element
// [item1, item2, ...remaining, bread] - this will not work

// Using REST with object
const { name, loc, ...otherDetails } = restaurant;
console.log(name, loc, otherDetails);

// REST use in function
// ...numbers will put all the values into array named numbers
// so now we can pass infinite params values
const add = function (...numbers) {
	console.log(numbers);
	let sum = 0;
	for (let i = 0; i < numbers.length; i++) {
		sum += numbers[i];
	}
	console.log("sum: ", sum);
};
add(1, 2, 3, 4, 5);
// how to pass array here
const x = [123, 23, 22];
add(...x);
```

# 07 Short circuiting (&& and || )

- logical operator(|| , &&...) can use any data type, return any data type and do short circuiting

### AND: First truthy value or if none then return last value

```javaScript
console.log(3 || "Manab"); // 3
console.log("" || "Manab"); // Manab
console.log(true || 0); // true
console.log(undefined || null); // null
// Js search for truthy value if found, stops.
console.log(undefined || 0 || "" || "Hello");

// Practical use
const restaurant = {
	name: "Classico Italiano",
	loc: "Via Angelo Tavanti 23, Firenze, Italy",
};

// check if any value exist(neither will work if guests is 0, solution later)
// old method
const guestsNo = restaurant.guests ? restaurant.guests : 10;
restaurant.guests = 8;
// short-circuiting
const guestsNo1 = restaurant.guests || 10;
console.log(guestsNo, guestsNo1);
```

### OR: First falsy value or if not found return last value

```javaScript
console.log(3 && "Manab"); // Manab
console.log(0 && "Manab"); // 0
// Js search for falsy value if found, stops.
console.log("Hello" && 23 && undefined && "Manab"); // undefined

// Practical use
const restaurant = {
	name: "Classico Italiano",
	loc: "Via Angelo Tavanti 23, Firenze, Italy",
	makeCurry: function (mainIngredient) {
		console.log(`Making ${mainIngredient} curry.`);
	},
};
// check if following function exist then call it
// old method
if (restaurant.makeCurry) {
	restaurant.makeCurry("chicken");
}
// short-circuiting
restaurant.makeCurry && restaurant.makeCurry("fish");
```

# 08 The Nullish coalescing operator(??)

- Work exactly same as OR operator(||) but treat 0 or '' as truthy(non nullish)
- Nullish: null and undefined values (`NOT 0 or ''`)
- Return first non nullish value if not then last value.
- So this will not consider 0 or '' as falsy but truthy.

```javaScript
const restaurant = {
	name: "Classico Italiano",
	loc: "Via Angelo Tavanti 23, Firenze, Italy",
	guests: 0,
};

// will get 10 as 0 is falsy value
const guestsNo = restaurant.guests ? restaurant.guests : 10; // 10
console.log(guestsNo);
// proper way with nullish operator
const guestNo1 = restaurant.guests ?? 10;
console.log(guestNo1);
```

# 09 Logical assignment operators

```javaScript
const rest1 = {
	name: "Dream Land",
	numGuests: 20,
};
const rest2 = {
	name: "Annapurna",
	owner: "Rakesh",
};

// *** Or assignment operator ***
// normal way
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
// with OR assignment operator(bug: not work with 0 expectedly)
// check if numGuests present if not set 10
rest1.numGuests ||= 10;
rest2.numGuests ||= 10;
// nullish  assignment operator(null or undefined)
rest1.newProperty ??= "new";

/// *** AND assignment operator ***
// normal way
// rest1.owner = rest1.owner && "<ANONYMOUS>"; // as no owner previously, owner: undefined
// rest2.owner = rest2.owner && "<ANONYMOUS>";
// with AND assignment operator
// check property exist, if so change it with second value
rest1.owner &&= "<ANONYMOUS>"; // as no owner and will not be one.
rest2.owner &&= "<ANONYMOUS>";

console.log(rest1);
console.log(rest2);
```

# 10 Coding challenge 01

```javaScript
/*
We're building a football betting app (soccer for my American friends 😅)!
Suppose we get data from a web service about a certain game ('game' variable on
next page). In this challenge we're gonna work with that data.
Your tasks:
1. Create one player array for each team (variables 'players1' and
'players2')
2. The first player in any player array is the goalkeeper and the others are field
players. For Bayern Munich (team 1) create one variable ('gk') with the
goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10
field players
3. Create an array 'allPlayers' containing all players of both teams (22
players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a
new array ('players1Final') containing all the original team1 players plus
'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called
'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player
names (not an array) and prints each of them to the console, along with the
number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which
team is more likely to win, without using an if/else statement or the ternary
operator.
Test data for 6.: First, use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'.
Then, call the function again with players from game.scored
*/
const game = {
	team1: "Bayern Munich",
	team2: "Borrussia Dortmund",
	players: [
		[
			"Neuer",
			"Pavard",
			"Martinez",
			"Alaba",
			"Davies",
			"Kimmich",
			"Goretzka",
			"Coman",
			"Muller",
			"Gnarby",
			"Lewandowski",
		],
		[
			"Burki",
			"Schulz",
			"Hummels",
			"Akanji",
			"Hakimi",
			"Weigl",
			"Witsel",
			"Hazard",
			"Brandt",
			"Sancho",
			"Gotze",
		],
	],
	score: "4:0",
	scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
	date: "Nov 9th, 2037",
	odds: {
		team1: 1.33,
		x: 3.25,
		team2: 6.5,
	},
};

// *** task 1
// array deconstruct
const [players1, players2] = [...game.players];

// *** task 2
// rest operator
const [gk1, ...fieldPlayers1] = players1;
const [gk2, ...fieldPlayers2] = players2;

// *** task 3: array with all players of all team
const allPlayers = [...players1, ...players2];

// *** task 4: add substitute players
const players1Final = [...players1, "Thiago", "Coutinho", "Perisic"];

// *** task 5: create variable form object also with different name
const { team1, x: draw, team2 } = game.odds;
// with nesting
// const { odds: { team1, x: draw, team2 } } = game;

// *** task 6: function 'printGoals'
const printGoals = function (...players) {
	for (let i = 0; i < players.length; i++) {
		console.log(players[i]);
	}
	console.log("Total Goals: ", players.length);
};
printGoals("Davies", "Muller", "Lewandowski", "Kimmich");
printGoals(...game.scored);

// *** task 7: calculate who wins with odds
team1 > team2 && console.log("Team1 is more likely to win.");
team1 < team2 && console.log("Team2 is more likely to win.");
```

# 11 Looping arrays, the for-of Loop

```javaScript
const friends = ["manab", "shanta", "anup", "apurba"];

// looping with for-of loop
for (const item of friends) {
	console.log(item);
}

// get each element with entries/index
// here item is an array
for (const item of friends.entries()) {
	console.log(`${item[0] + 1}: ${item[1]}`);
}
// simplifying with array destructuring
for (const [i, el] of friends.entries()) {
	console.log(`${i + 1}: ${el}`);
}
```

# 12 Enhanced object literals

- add external prop to object just by writing the name of variable.
- obj method writing simplified
- can have calculated/variable prop name with [ ]

```javaScript
const newProp = {
	data: "shanta",
	manab: 2000,
	shanta: 2001,
	anup: 1998,
};

const frndsData = {
	// *** 1: adding new prop
	// newProp: newProp,  // old way
	// ES6 enhanced
	newProp,
	friends: ["Shanta", "anup", "apurba"],

	// *** 2: new method writing
	logFriendsName(index) {
		console.log(this.friends[index]);
	},

	// *** 3: calculated/variable propName
	["shanta" + "Biswas"]: "is chutiya",
	[newProp.data]: "is chutiya",
};
```

# 13 Optional Chaining(?.)

- to check if any prop, function, value exist before doing anything at all to prevent error.
- check the left value exist if yes then only evaluate following code.
- this will return 'undefined' if triggered.
- work like nullish operator(0 and '' prof)

```javaScript
const frndsData = {
	friends: ["Shanta", "anup", "apurba"],
	nestingData: {
		prop1: "prop1 Data",
		prop2: "prop2 Data",
	},
	logFriendsName(index) {
		return this.friends[index];
	},
};

// checking if frndsData.nestingData and frndsData.nestingData.prop1 exist
// older way
if (frndsData.nestingData && frndsData.nestingData.prop1) console.log(frndsData.nestingData.prop1);
// new optional chaining
console.log(frndsData.nestingData?.prop1);
// can also check if frndsData object exist
console.log(frndsData?.nestingData?.prop1);

// check if object exist with (?.)
// Note: function return undefined if nothing returned within.
console.log(
	frndsData.logFriendsName?.(1) ?? "Method don't exist or method return noting(undefined)."
);

// checking array with ?.
const users = [{ name: "jonas", email: "hello@gmail.com" }];
console.log(users[0]?.name ?? "No user at index 0.");
console.log(users[1]?.name ?? "No user at index 1.");
```

## Real world example

```javaScript
const restaurant = {
	openingHours: {
		thu: {
			open: 12,
			close: 22,
		},
		fri: {
			open: 11,
			close: 23,
		},
		sat: {
			open: 0, // Open 24 hours
			close: 24,
		},
	},
};

const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

for (const day of days) {
	// using nullish as at sat open at 0.
	const open = restaurant.openingHours[day]?.open ?? "closed";
	console.log(`on ${day}, we open at ${open}`);
}
```

# 14 Looping object

- object.keys() method to get all the keys in an array
-

```javaScript
const openingHours = {
	thu: {
		open: 12,
		close: 22,
	},
	fri: {
		open: 11,
		close: 23,
	},
	sat: {
		open: 0, // Open 24 hours
		close: 24,
	},
};

// Properties Name: Object.keys() return all the key names in an array
const properties = Object.keys(openingHours);
console.log(properties);
let openStr = `We are open on ${properties.length} days: `;
for (const day of properties) {
	openStr += `${day}, `;
}
console.log(openStr);

// Properties Value: Object.values() return all the values in an array
const values = Object.values(openingHours);
console.log(values);

// loop over entire object with for-of loop
const entries = Object.entries(openingHours);
// [key, value]
for (const [day, { open, close }] of entries) {
	console.log(`On ${day} day, We open at: ${open} and close at: ${close}`);
}
```

# 15 Coding challenge 2

```javaScript
/*
Let's continue with our football betting app! Keep using the 'game' variable from
before.
Your tasks:
1. Loop over the game.scored array and print each player name to the console,
along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already
studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
Odd of victory Bayern Munich: 1.33
Odd of draw: 3.25
Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them
(except for "draw"). Hint: Note how the odds and the game objects have the
same property names 😉
4. Bonus: Create an object called 'scorers' which contains the names of the
players who scored as properties, and the number of goals as the value. In this
game, it will look like this:
{
  Gnarby: 1,
  Hummels: 1,
  Lewandowski: 2
}
*/
const game = {
	team1: "Bayern Munich",
	team2: "Borrussia Dortmund",
	players: [
		[
			"Neuer",
			"Pavard",
			"Martinez",
			"Alaba",
			"Davies",
			"Kimmich",
			"Goretzka",
			"Coman",
			"Muller",
			"Gnarby",
			"Lewandowski",
		],
		[
			"Burki",
			"Schulz",
			"Hummels",
			"Akanji",
			"Hakimi",
			"Weigl",
			"Witsel",
			"Hazard",
			"Brandt",
			"Sancho",
			"Gotze",
		],
	],
	score: "4:0",
	scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
	date: "Nov 9th, 2037",
	odds: {
		team1: 1.33,
		x: 3.25,
		team2: 6.5,
	},
};

// 1: goal with for-of loop
for (const [index, player] of game.scored.entries()) {
	console.log(`Goal ${index + 1}: ${player}`);
}

// 2: average odd
const odds = Object.entries(game.odds);
let avgOdd = 0;
for (const [key, odd] of odds) {
	avgOdd += odd;
}
avgOdd /= odds.length;
console.log(avgOdd);

// 3: printing odds with formatting
for (const [team, odd] of Object.entries(game.odds)) {
	console.log(`Odd of ${team === "x" ? "draw" : "victory of " + game[team]}: ${odd}`);
}

// 4: creating "scorers" object
const scorers = {};
for (const scorer of game.scored) {
	scorers[scorer] ? scorers[scorer]++ : (scorers[scorer] = 1);
}
console.log(scorers);
```

# 16 Sets

- sets are like arrays but can't have duplicate values
- does not have index and order
- sets are iterable

```javaScript
// create new sets
const orderSet = new Set(["pasta", "pizza", "pizza", "risotto", "pizza"]);
// string to sets
console.log(new Set("Manab"));

// set's methods
// .size to get length of set
console.log(orderSet.size);
// check if a value exist in set
console.log(orderSet.has("pizza"));
// to add element to set
orderSet.add("mutton curry");
// to remove element from set
orderSet.delete("risotto");
// to delete all the elements of set
// orderSet.clear();
console.log(orderSet);

// set don't have index, can't get single value
// can iterate set
for (const order of orderSet) console.log(order);

// to remove duplicate from array
const stuff = ["waiter", "chef", "manager", "waiter", "chef"];
const uniqueStuff = [...new Set(stuff)];
console.log(uniqueStuff);

// to get the number of unique values in an array
console.log(new Set(["waiter", "chef", "manager", "waiter", "chef"]).size);
// unique letter in a string
console.log(new Set("manabbala").size);
```

# 17 Maps fundamental

- maps are like object
- key name could be anything: string, numerical, array, object, etc

```javaScript
// create new map
const rest = new Map();
// first position of inner array is key and second position is value
const newMap = new Map([[1, "value1"], [(2, "value2")]]);
console.log(newMap)
// to add elements to map
// set method two arguments: key and value
rest.set("name", "Classico italiano");
rest.set(1, "Firenze, Italy");
//set method also return the map itself
console.log(rest.set(2, "Lisbon, Portugal"));
// so we can chain set method\
rest
	.set("categories", ["Italian", "Pizzeria", "Vegetarian", "Organic"])
	.set("open", 11)
	.set("close", 23)
	.set(true, "We are open :D")
	.set(false, "We are close :(");

console.log(rest.get("name"));
console.log(rest.get(true));
console.log(rest.get(1));

// use of boolean as key
const time = 21;
console.log(rest.get(time > rest.get("open") && time < rest.get("close")));

// other Map methods
console.log(rest.has("categories"));
rest.delete(2);
console.log(rest.size);
// clear entire map
// rest.clear()

// array as a key in map
const arr = [1, 2];
rest.set(arr, "test");
console.log(rest.get(arr));

console.log(rest);
```

# 18 Maps iteration

```javaScript
const question = new Map([
	["question", "What is the best programming language in the world?"],
	[1, "c"],
	[2, "Java"],
	[3, "JavaScript"],
	["correct", 3],
	[true, "Correct ✅"],
	[false, "Wrong ❌"],
]);
console.log(question);

// convert object to map
const restaurant = {
	name: "Dream Land",
	loc: "Taherpur, Nadia, WB",
};
console.log(Object.entries(restaurant));
const restaurantMap = new Map(Object.entries(restaurant));
console.log(restaurantMap);

// Quiz app
console.log(question.get("question"));
// iterate map
for (const [key, value] of question) {
	if (typeof key === "number") console.log(`Option3 ${key}: ${value}`);
}
// const answer = Number(prompt("Your answer"));
const answer = 3;
console.log(`Your chose option: ${answer})${question.get(answer)}`);
console.log(question.get(question.get("correct") === answer));

// converting map to an array of arrays
console.log(...question);
// console.log(question.entries());
// get all the keys of map to an array
console.log([...question.keys()]);
// get all the values of map to an array
console.log([...question.values()]);
```

# 19 Summery: which data structure to use

![image](019%20Summary_%20Which%20Data%20Structure%20to%20Use_.mp4_snapshot_05.25_[2022.07.27_22.40.04].jpg)
![image](019%20Summary_%20Which%20Data%20Structure%20to%20Use_.mp4_snapshot_09.31_[2022.07.27_22.43.11].jpg)

# 20 Coding challenge 3

```javaScript
/*
Let's continue with our football betting app! This time, we have a map called
'gameEvents' (see below) with a log of the events that happened during the
game. The values are the events themselves, and the keys are the minutes in which
each event happened (a football game has 90 minutes plus some extra time).
Your tasks:
1. Create an array 'events' of the different game events that happened (no
duplicates)
2. After the game has finished, is was found that the yellow card from minute 64
was unfair. So remove this event from the game events log.
3. Compute and log the following string to the console: "An event happened, on
average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over 'gameEvents' and log each element to the console, marking
whether it's in the first half or second half (after 45 min) of the game, like this:
[FIRST HALF] 17: ⚽ GOAL
*/
const gameEvents = new Map([
	[17, "⚽ GOAL"],
	[36, "🔁 Substitution"],
	[47, "⚽ GOAL"],
	[61, "🔁 Substitution"],
	[64, "🔶 Yellow card"],
	[69, "🔴 Red card"],
	[70, "🔁 Substitution"],
	[72, "🔁 Substitution"],
	[76, "⚽ GOAL"],
	[80, "⚽ GOAL"],
	[92, "🔶 Yellow card"],
]);

// 1: array without duplicate
const events = [...new Set(gameEvents.values())];
console.log(events);

// 2: remove a element form map
gameEvents.delete(64);
console.log(gameEvents);

// 3: computing str
const str = `An event happened, on average, every ${90 / gameEvents.size} minutes.`;
console.log(str);

// 4: looping over map
for (const [time, event] of gameEvents) {
	console.log(`${time <= 45 ? "[FIRST HALF]" : "[SECOND HALF]"} ${time}: ${event}`);
}
```

# 21 Working with strings - part 1

```javaScript
const airLine = "Air India AirLine";
const plane = "A320";

// Boxing: js convert the string primitive to a string object behind the scene
// thus we can use these method
console.log(new String(airLine));

// get individual letter
console.log(plane[0]);
console.log("B737"[2]);

// get string length
console.log(airLine.length);

// get index of letter of word
// get the first occurrence(case sensitive)
console.log(airLine.indexOf("I"));
// get the last occurrence(case sensitive)
console.log(airLine.lastIndexOf("i"));
console.log(airLine.indexOf("India"));

// to get a portion of a string with slice method
// two arguments, start position and finished position(index letter not included)
console.log(airLine.slice(4));
console.log(airLine.slice(4, 9));
// slice till first blank space
console.log(airLine.slice(0, airLine.indexOf(" ")));
// slice the last word(last blank space to finish)
console.log(airLine.slice(airLine.lastIndexOf(" ") + 1)); // + 1 to skip the blank space at start

// slice with negative index
console.log(airLine.slice(-4));
console.log(airLine.slice(-7, -4));

// Example
const checkMiddleSeat = function (seat) {
	const lastChar = seat.slice(-1);
	// B and E are middle seat
	if (lastChar === "B" || lastChar === "E") console.log("You got the middle seat 😬");
	else console.log("You got lucky 😃");
};
checkMiddleSeat("12E");
checkMiddleSeat("12D");
```

# 22 Working with strings - part 2

```javaScript
const airLine = "Air India AirLine";

// change lowerCase to UpperCase and vice versa
console.log(airLine.toLowerCase(airLine));
console.log(airLine.toUpperCase(airLine));
// Fix capitalization in name
const userName = "mAnaB";
const userLowerCase = userName.toLowerCase();
const userCorrect = userLowerCase[0].toUpperCase() + userLowerCase.slice(1);
console.log(userCorrect);

// comparing emails
const mainEmail = "hello@jonas.io";
const loginEmail = " Hello@Jonas.Io \n";
// trim() to rid of blank space and enter at the start and end of string
// trimStart(), trimEnd() can also be used.
const normalizedEmail = loginEmail.toLocaleLowerCase().trim();

const checkLogin = function (loginEmail) {
	if (loginEmail === mainEmail) console.log("Welcome....");
	else console.log("Email incorrect");
};
checkLogin(loginEmail);
checkLogin(normalizedEmail);

// to replace a char(replace the first occurrence)
const priceUk = "123,34£";
const priceUs = priceUk.replace("£", "$").replace(",", ".");
console.log(priceUs);
// to replace a word(replace the first occurrence)
const announcement = "All passenger come to door 23, Boarding door 23!";
console.log(announcement.replace("door", "gate")); // replace the first 'door'
console.log(announcement.replaceAll("door", "gate")); // replace all 'door'
console.log(announcement.replace(/door/g, "gate")); // replace all 'door' with regex

// Booleans
const plane = "Airbus A320neo";
console.log(plane.includes("A320"));
console.log(plane.includes("Boeing"));
console.log(plane.startsWith("Air"));

// Practice exercise
const checkBaggage = function (items) {
	// converting to lowercase to easily compare without problem with case sensitivity
	const baggage = items.toLowerCase();
	if (baggage.includes("knife") || baggage.includes("gun")) {
		console.log("You are not allowed on board");
	} else console.log("Welcome aboard!");
};
checkBaggage("I have a laptop, some Food and a pocket Knife and a gun for protection");
checkBaggage("Socks and camera");
```

# 23 Working with string part 3

```javaScript
// split(dividerString) return array
console.log("a+very+nice+string".split("+"));
console.log("Manab Bala".split("+"));

const [fistName, lastName] = "Manab Bala".split(" ");
// join(char to put between) to join array of string
const newName = ["Dr.", fistName.toUpperCase(), lastName].join(" ");
console.log(newName);

// exercise
const capitalizeName = function (nameFull) {
	const names = nameFull.toLowerCase().split(" ");
	let namesArr = [];
	for (const name of names) {
		namesArr.push(name[0].toUpperCase() + name.slice(1));
		// another approach
		// namesArr.push(name.replace(name[0], name[0].toUpperCase()));
	}
	console.log(namesArr.join(" "));
};
capitalizeName("sri bankim chandra bala");

// padding of string
const message = "Go to gate 23!";
// 25 is the full length of the str after adding required '+'
console.log(message.padStart(20, "+").padEnd(30, "+"));
// adding blank space at end by only defining length arg
console.log('Manab'.padEnd(10))

// real world example
const maskCreditCard = function (number) {
	const str = number + "";
	const last = str.slice(-4);
	return last.padStart(str.length, "*");
};
console.log(maskCreditCard(122315461879));

// repeat string
const forecast = "Bad weather... All Departures Delayed...";
console.log(forecast.repeat(3));

const planesInLine = function (n) {
	console.log(`There are ${n} planes in line ${"✈".repeat(n)}`);
};
planesInLine(4);
planesInLine(3);
```

# 24 Coding challenge 4

```javaScript
/*
Write a program that receives a list of variable names written in underscore_case
and convert them to camelCase.
The input will come from a textarea inserted into the DOM (see code below to
insert the elements), and conversion will happen when the button is pressed.
Test data (pasted to textarea, including spaces):
underscore_case
 first_name
Some_Variable
calculate_AGE
  delayed_departure
Should produce this output (5 separate console.log outputs):
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅
Hints:
§ Remember which character defines a new line in the textarea 😉
§ The solution only needs to work for a variable made out of 2 words, like a_b
§ Start without worrying about the ✅. Tackle that only after you have the variable
name conversion working 😉
§ This challenge is difficult on purpose, so start watching the solution in case
you're stuck. Then pause and continue!

Afterwards, test with your own test data!
*/

// 1: underscore_case to camelCase
const underScoreToCamelCase = function (rawTexts) {
	// splitting raw text by new line('\n')
	const rowsArr = rawTexts.split("\n");
	for (const [i, row] of rowsArr.entries()) {
		// converting to lowerCase, trimming for extra space then splitting by '_'
		const wordsArray = row.toLowerCase().trim().split("_");
		const camelArray = [];
		for (const [i, word] of wordsArray.entries()) {
			// capitalizing first letter except the first word
			if (i !== 0) camelArray.push(word.replace(word[0], word[0].toUpperCase()));
			else camelArray.push(word);
		}
		// joining all part of the word
		// adding blank space at end for even spacing at middle
		// adding tick sign word (index + 1) times
		console.log(camelArray.join("").padEnd(20) + "✅".repeat(i + 1));
	}
};

// adding text area for input and button to execute
document.body.append(document.createElement("textarea"));
document.body.append(document.createElement("button"));

const buttonEl = document.querySelector("body > button");
const textareaEl = document.querySelector("body > textarea");
buttonEl.addEventListener("click", () => {
	underScoreToCamelCase(textareaEl.value);
});
```

# 25 String methods practice

```javaScript
const flights =
 "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

const getCode = (str) => str.slice(0, 3).toUpperCase();
for (const flight of flights.split("+")) {
	const [type, from, to, time] = flight.split(";");
	const output = `${type.startsWith("_Delayed") ? "🔴" : ""} ${type
		.replaceAll("_", " ")
		.trim()} from ${getCode(from)} to ${getCode(to)} (${time.replace(":", "h")})`.padStart(44);
	console.log(output);
}
```
