# 03 Convert and checking numbers

```javaScript
// all number's stored as floating numbers internally
console.log(23 === 23.0); // true

// all numbers are in 64 bit format(base 2)
// there are some problem in fraction numbers
console.log(0.1 + 0.2); // 0.30000000000000004
// so can't do very very precise scientific calc in js
console.log(0.1 + 0.2 === 0.3); // false

// conversion
console.log(Number("23")); // 23
// js see '+' at first, js do type coercion(convert to num)
// Should use this as cleaner
console.log(+"23"); // 23

// Parsing: extract num from start
console.log(Number.parseInt("30px", 10)); // 30
console.log(Number.parseInt("e30", 10)); // NaN
// 2 denotes it's a base 2 num
console.log(Number.parseInt("1010", 2)); // return 5 in base 10
// parsing float
console.log(Number.parseFloat("2.5rem")); // 2.5
console.log(Number.parseInt("2.5rem")); // 2; only the Int part
// white space don't matter
console.log(Number.parseFloat("  2.5rem  ")); // 2.5

// Check if any value is NaN
console.log(Number.isNaN(23)); // false; as 23 is a number
console.log(Number.isNaN("12")); // false; as "23" is a value
console.log(Number.isNaN(+"15")); // false; as 15 is a num
console.log(Number.isNaN(+"31x")); // true; as +"31x" is NaN
console.log(Number.isNaN(55 / 0)); // false; as infinity is not NaN

// Check if value is number:(use this two instead of isNaN())
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite(20 / 0)); // false
console.log(Number.isFinite(+"15")); // true; as 15 is a num
console.log(Number.isFinite(+"31x")); // false; as +"31x" is NaN
// check if integer
console.log(Number.isInteger(20)); // true
console.log(Number.isInteger(1.2)); // false
```

# 04 Math and rounding

```javaScript
// squire root
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
// cube root
console.log(8 ** (1 / 3));

// max-min calculation
console.log(Math.max(1, 54, 22, 4, 3, 71, 12, 9));
console.log(Math.min("2", 54, 22, 4, 3, 71, 12, 9)); // type coercion works
console.log(Math.min("2px", 54, 22, 4, 3, 71, 12, 9)); // parsing don't

// area of circle
console.log(Math.PI); // value of pi
console.log(Math.PI * Number.parseFloat("10px") ** 2);

// generate random num
// Math.random() give us num between 0 to 1
// random() exclude 6, (1-5); so add 1 to make it (1-6)
console.log(Math.trunc(Math.random() * 6) + 1);
// random in max-min range
const randomInt = (min, max) => Math.floor(Math.random() * (max - min)) + 1 + min;
// 0...1 -> 0...(max - min) -> min...max
console.log(randomInt(4, 10));

// Rounding Off:(all can do type coercion)
console.log(Math.round(23.3)); // 23; to nearest integer
console.log(Math.round("23.7")); // 24; to nearest integer

console.log(Math.ceil(23.3)); // 24; round up
console.log(Math.ceil(23.9)); // 24; round up

console.log(Math.floor(23.3)); // 23; round down
console.log(Math.floor(23.9)); // 23; round down
// trunc work same as floor but not properly with (-)ve num.
console.log(Math.trunc(23.3)); // 23; round down
console.log(Math.trunc(-23.3)); // -23; kind of round up to -23
// but floor work properly with negative num
console.log(Math.floor(-23.3)); // -24; round down

// Rounding decimals:(toFixed() returns string)
// 0 denotes the number of digit after decimal
console.log((23.7).toFixed(0)); // 23
console.log((23.7).toFixed(3)); // 23.700; extra zeros to fill the 3 digit
console.log((23.745).toFixed(2)); // 23.75; also do rounding off
console.log(+(23.745).toFixed(2)); // 23.75; + to convert to number
```

# 05 The Remainder operator

- Remainder => VAGSESH

```javaScript
console.log(5 % 2); // 1
console.log(8 % 3); // 2

// if the remainder is zero, means fully divisible
console.log(6 % 3); // 0

// if fully divisible by 2 means even num; thus remainder is 0
console.log(4 % 2); // 0; so 4 even num
const isEven = (n) => n % 2 === 0;
console.log(isEven(4));
console.log(isEven(13));
```

# 06 Numeric separator

```javaScript
// visual separator for coder convenience
// js treat this just as normal number
// 281,460,000,000
const diameter = 281_460_000_000;
console.log(diameter);

// some restriction
// not allowed before or after number or decimal point

console.log(Number("233_340")); // NaN; won't work
```

# 07 working with bigInt

- numbers in js are 64 bits
- this normal numbers can't not show or store big numbers.
- so bigint was introduced to handle big numbers

```javaScript
// limit of 64bit num
console.log(2 ** 53 - 1); // the last safest/accurate num by js
console.log(Number.MAX_SAFE_INTEGER); // same as last num
// this following num show near accurate vale but not exact
console.log(2 ** 53 + 1); // exact
console.log(2 ** 53 + 2); // one more than actual
console.log(2 ** 53 + 3); // two more than actual
console.log(2 ** 53 + 4); // one more than actual

// BIG INT
// to convert any num to bigint
console.log(46455184136165165466156544315646431564n);
// to convert normal small num to bigint
console.log(BigInt(4645518));

// OPERATIONS:
// can't mix normal num and bigint for math operation with some exception
const huge = 4556443215841642854n;
const num = 32;
// console.log(huge * num); // won't work
console.log(huge * BigInt(num)); // need to convert num to bigint
// can't get squire root of bigint
// console.log(Math.sqrt(16n));
// Divisions
console.log(11n / 3n); // 3n; return the nearest integer value
console.log(13n / 3n); // 4n

// EXCEPTION:
console.log(20n > 15); // true
console.log(20n == 20); // js do type coercion as '=='
console.log(20n === 20); // type won't match as '==='
console.log(huge + " is really big!!!"); // 4556443215841642854 is really big!!!
```

# 08 Creating Dates

- js count month value from 0.(jan=0,fab=1)

```javaScript
// create a date
const now = new Date();
console.log(now);

// js can intelligently parse str to date
console.log(new Date("Aug 17 2022 00:49:13"));
console.log(new Date("December 24, 2015"));
// this could be unreliable sometimes so use standard format(made by js itself)
console.log(new Date("2019-11-18T21:31:17.178Z"));

// year, month, day, hour, min, sec
console.log(new Date(2000, 3, 19, 15, 4, 30)); // 3 represent april as js count month form 0
// js auto correct date if wrong input
console.log(new Date(2000, 0, 33, 15, 4, 30)); // day=33; so js give 2nd day of next month

// Date with TIMESTAMP(in millisecond)
console.log(new Date(0)); // Jan 01 1970; start of time calculation
// 3 days after this
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // Jan 04 1970;
// date from timestamp
console.log(new Date(1660678581609)); // to get the timestamp
console.log(now.getTime()); // current timestamp

// Date FUNCTION:
const future = new Date(2065, 10, 12, 23);
console.log(future);
console.log(future.getFullYear()); // 2065
console.log(future.getMonth()); // 10; nov; as month form 0
console.log(future.getDate()); // 12; date of the day;
console.log(future.getDay()); // 4; day of the week
console.log(future.getHours());
console.log(future.getTime()); // get timestamp
console.log(+future); // get timestamp

// get nicely formatted str form date(standard)
console.log(future.toISOString()); // "2065-11-12T17:30:00.000Z"

// get current timestamp
console.log(Date.now()); // 1660678725279

// SET function for all method also
future.setFullYear(2069); // change the year to 2069 from 'future' date object
console.log(future);
```

# 09 Adding dates to Bankist app

- refer to bankist app v2

```javaScript
const future = new Date(2065, 10, 12, 23);
console.log(+future); // get the timestamp

const calcDaysPassed = (date1, date2) => Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = calcDaysPassed(new Date(2035, 10, 12), new Date(2035, 10, 21));
console.log(days1);
```

# 10 Internationalizing dates

```javaScript
const now = new Date();
const dateUSA = new Intl.DateTimeFormat("en-US").format(now);
console.log(dateUSA); // 8/17/2022; mon/day/year
const dateUK = new Intl.DateTimeFormat("en-GB").format(now);
console.log(dateUK); // 17/08/2022; day/mon/year

// option properties
const options = {
	hour: "numeric",
	minute: "numeric",
	day: "numeric",
	month: "long",
	year: "numeric",
	weekday: "long",
};
const dateIN = new Intl.DateTimeFormat("en-IN", options).format(now);
console.log(dateIN); // Wednesday, 17 August, 2022 at 4:44 pm

// can get the first param form the browser
const local = navigator.language;
console.log(local); // en-GB
const dateLocal = new Intl.DateTimeFormat(local).format(now);
console.log(dateLocal);
```

# 12 Internationalizing Numbers (Intl)

- number formatting for visual please.
- 112350 => 1,12,350
- add currency sign
- add physical unit name

```JavaScript
// comma or dot separation in number count
const num = 112350;
console.log("Us: ", new Intl.NumberFormat("en-US").format(num));
console.log("India: ", new Intl.NumberFormat("en-IN").format(num));
console.log(navigator.language, ": ", new Intl.NumberFormat(navigator.language).format(num));

// show unit
const options = {
	style: "unit",
	unit: "mile-per-hour",
};
console.log("Us: ", new Intl.NumberFormat("en-US", options).format(num));
console.log("Germany: ", new Intl.NumberFormat("de-DE", options).format(num));

// show currency
const options2 = {
	style: "currency",
	currency: "INR",
};
console.log("Indian Rupees: ", new Intl.NumberFormat("en-IN", options2).format(num));
```

# 13 Timers || setTimeout and setInterval

```javaScript
// setTimeout: async call-back function
setTimeout(() => console.log("Here is your pizza."), 3000); // time in milliseconds;
console.log("Waiting for pizza...."); // this will show before the last console log.

// add arguments to setTimeout's call-back func
setTimeout(
	(ing1, ing2) => console.log(`Here is your Lassi with ${ing1} and ${ing2}.`),
	3000,
	"rock-salt",
	"cashew"
); // all arg after the second arg of setTimeout is of the call-back func's
console.log("Waiting for Lassi....");

// clearTimeout(): cancel setTimeout call-back function
const ingredients = ["apple", "pineapple"];
const pizzaTimer = setTimeout(
	(ing1, ing2) => console.log(`Here is your second pizza with ${ing1} and ${ing2}.`),
	3000,
	...ingredients
); // time in milliseconds;
console.log("Waiting for second pizza...."); // this will show before the last console log.
// don't like apple in pizza; cancel
if (ingredients.includes("apple")) clearTimeout(pizzaTimer);

// setInterval: call-back func execute after every specified time
setInterval(() => {
	// realtime clock
	const now = new Date();
	const clock = `${now.getHours()}:${now.getSeconds()}`;
	console.log(clock);
}, 1000);
```

# 14 Implementing a countdown timer to the bankist app

- refer to bakist app
