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
