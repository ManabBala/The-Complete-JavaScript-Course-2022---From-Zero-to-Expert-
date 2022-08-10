# Tips and Tricks:

- Can run js directly in terminal with "node test.js"
- can log two item at the same time separated with comma.
- `x = x + 10 same as x += 10`
- `x = x + 1 same as x ++`
- To start a new line(multiline) use "\n\" or ``

```javascript
console.log(
	"My name is Manab \n\
  I am 22 years old"
);
// can just use `` for multiline
console.log(`My name is Manab
  I am 22 years old`);
```

- Shortcut for emoji = win + .
- use '==' comparator to check the vales only and use '===' to check the values as well as type(no auto type conversion by js(coercion))
- user prompt in browser take input as string
- ternary operator can be used instead of if else statement
- use ctrl + B to select same word every occurrence
- can use console.warn() and console.error() for different color log.
- also can use console.table() for unfolded object
- can declare multiple variables(or lets) in one line. this to resolve scoping problem. D

```javaScript
  let myName, myAge, myJob;
```

- ++ operator return the previous value not the incremented one

```javaScript
// Prefixed ++ operator
let a = 10;
console.log(a++); // return 10
console.log(a); // log incremented value 11
console.log(++a); // return 11(correct way to increment in expression type equation)
```
