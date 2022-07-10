# 01 section intro

# 02 Section road map

# 03 Setting up pretties and vs code.en

# 04 Installing node.js adn setting up live-server

- to install node live server = 'npm install live-server -g'
- to start live server to current directory = 'live-server'
- this will open the index.html in live server.

# 05 Learning how to code

# 06 How to think like a developer, become a problem solver.

- Make sure you understand the problem 100%
- Divide and conquer => break a big problem into smaller sub-problems

![image](006%20How%20to%20Think%20Like%20a%20Developer_%20Become%20a%20Problem%20Solver!.mp4_snapshot_08.34_[2022.07.10_21.12.40].jpg)

- For bigger problems, write pseudo-code before writing the actual code

# 07 Using Google, StackOverflow and MDN

# 08 Debugging(fixing errors)

![image](<008%20Debugging%20(Fixing%20Errors).mp4_snapshot_04.39_[2022.07.10_21.32.56].jpg>)

# 09 debugging with console and breakpoint

- can use console.warn() and console.error() for different color log.
- also can use console.table() for unfolded object

# 10 Coding Challenge 01

```javaScript
/*
Given an array of forecasted maximum temperatures, the thermometer displays a
string with the given temperatures. Example: [17, 21, 23] will print "... 17ºC in 1
days ... 21ºC in 2 days ... 23ºC in 3 days ..."
Your tasks:
1. Create a function 'printForecast' which takes in an array 'arr' and logs a
string like the above to the console. Try it with both test datasets.
2. Use the problem-solving framework: Understand the problem and break it up
into sub-problems!
Test data:
§ Data 1: [17, 21, 23]
§ Data 2: [12, 5, -5, 0, 4]
*/
//
const data1 = [17, 21, 23];
const data2 = [12, 5, -5, 0, 4];

function genForecast(arr) {
	let str = "";
	for (let i = 0; i < arr.length; i++) {
		str += `${arr[i]}ºC in ${i + 1} days ... `;
	}
	console.log(str);
}

genForecast(data1);
genForecast(data2);
```
