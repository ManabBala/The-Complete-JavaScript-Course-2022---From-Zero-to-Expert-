# 04 How the DOM really works

![image](004%20How%20the%20DOM%20Really%20Works.mp4_snapshot_09.04_[2022.08.28_21.12.40].jpg)

# 05 Selecting, creating and deleting elements

```javaScript
/*
<body>
	<h1>Live Server Test</h1>
	<h1 class="el" id="el--1">Element 1</h1>
	<h1 class="el" id="el--2">Element 2</h1>
	<h1 class="el" id="el--3">Element 3</h1>
	<script src="test.js"></script>
</body>
*/

// Selecting elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);
// return first found element
document.querySelector(".el");
// return NodeList; like array but not same
const allH1El = document.querySelectorAll(".el");
console.log(allH1El);
const el2 = document.getElementById("el--2");
console.log(el2);
// return HTMLCollection; mutate in real-time
const allH1 = document.getElementsByTagName("h1");
console.log(allH1);

// Creating and inserting elements
const newEl = document.createElement("h4"); // this will not add the div to doc
newEl.classList.add("el");
newEl.textContent = "New Element 5";
// adding newEl as first child of 'el--2'
el2.prepend(newEl);
// adding newEl as last child of 'el--2'
el2.append(newEl); // as only one newEl could exist, newEl will be moved
// add same element to multiple position
el2.prepend(newEl.cloneNode(true)); // true: also copy all the child el
// add newEl before 'el--2' as sibling element
el2.before(newEl.cloneNode(true));
// add newEl after 'el--2' as sibling element
el2.after(newEl.cloneNode(true));

// delete element
newEl.remove();
// legacy way of removing
// newEl.parentElement.removeChild(newEl);
```

# 🟥 06 Styles, Attributes and Classes

```javaScript
// 06: styles
// to set inline css properties
message.style.backgroundColor = "#37383d";
message.style.width = "120%";
console.log(message.style.color); // will not get anything
// to get a css properties
console.log(getComputedStyle(message).color);
// changing height of message
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 40 + "px";
// change css properties directly
document.documentElement.style.setProperty("--color-primary", "orangered");

// 06: Attributes
const logo = document.querySelector(".nav__logo");
console.log(logo.alt);
console.log(logo.className);
// set attributes
logo.alt = "Beautiful logo";
logo.setAttribute("designer", "manab");
// Non-standard
console.log(logo.designer); // will not get "manab"
console.log(logo.getAttribute("designer")); // "manab"
// absolute vs relative path or link
console.log(logo.src);
console.log(logo.getAttribute("src"));
// Data attributes(HTML => data-version-number="3.0")
console.log(logo.dataset.versionNumber); // "3.0"

// 06: Classes
logo.classList.add("c", "d");
logo.classList.toggle("c", "d");
console.log(logo.classList.contains("c", "d"));
logo.classList.remove("c", "d");
// Don't use(replace all the existing classes)
// logo.className = "jonas";
```

# 07 Implementing Smooth Scrolling

```javaScript
// 07: Implementing Smooth Scrolling
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function (e) {
	const s1cords = section1.getBoundingClientRect();
	console.log(s1cords);
	console.log("Current scroll (X,Y)", window.scrollX, window.scrollY);

	// Scrolling(old school)
	// window.scrollTo(s1cords.left + window.scrollX, s1cords.top + window.scrollY); // non-smooth
	// window.scrollTo({
	// 	left: s1cords.left + window.scrollX,
	// 	top: s1cords.top + window.scrollY,
	// 	behavior: "smooth",
	// });

	// Modern Solution:
	section1.scrollIntoView({ behavior: "smooth" });
});
```

# Types of Events and Event Handlers

## [(Link) Events On MDN](https://developer.mozilla.org/en-US/docs/Web/Events)

```javaScript
// 08: Types of Events and Event Handlers
const h1 = document.querySelector("h1");
const alertH1 = function (e) {
	alert("addEventListener: Great! You are reading the heading :D");
	h1.removeEventListener("mouseenter", alertH1);
};

h1.addEventListener("mouseenter", alertH1);
// old-school
// h1.onmouseenter = function (e) {
// 	alert("onEventListener: Great! :D");
// };
```

# 09 Event Propagation, Bubbling and Capturing

![image](009%20Event%20Propagation_%20Bubbling%20and%20Capturing.mp4_snapshot_04.03_[2022.11.04_11.18.35].jpg)

# 🟥10 Event Propagation in Practice

```javaScript
// 10: Event Propagation in practice
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)}, ${randomInt(0, 255)})`;

document.querySelector(".nav__link").addEventListener("click", function (e) {
	this.style.backgroundColor = randomColor();
	console.log("link: ", e.target);
	console.log(e.currentTarget === this);
	// Stop Propagation(should not use)
	// e.stopPropagation();
});
document.querySelector(".nav__links").addEventListener("click", function (e) {
	this.style.backgroundColor = randomColor();
	console.log("container: ", e.target);
});
document.querySelector(".nav").addEventListener("click", function (e) {
	this.style.backgroundColor = randomColor();
	console.log("nav: ", e.target);
});
```

# 🟥11 Event Delegation & Implementing Pge Navigation

```javaScript
// 11: Event delegation & Implementing page navigation
// resource hungry
/*
document.querySelectorAll(".nav__link").forEach((el) => {
	el.addEventListener("click", function (e) {
		e.preventDefault();
		const id = this.getAttribute("href");
		console.log(id);
		document.querySelector(id).scrollIntoView({ behavior: "smooth" });
	});
});
*/

// Optimized way
document.querySelector(".nav__links").addEventListener("click", function (e) {
	e.preventDefault();
	// Matching strategy
	if (e.target.classList.contains("nav__link")) {
		const id = e.target.getAttribute("href");
		document.querySelector(id).scrollIntoView({ behavior: "smooth" });
	}
});
```

# 12 DOM Traversing

```javaScript
// 12: DOM Traversing
// Going downward: child
console.log(h1.querySelectorAll(".highlight"));
console.log(h1.childNodes);
console.log(h1.children); // HTML collection
h1.firstElementChild.style.color = "white";
h1.lastElementChild.style.color = "orangered";

// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);
h1.closest(".header").style.background = "var(--gradient-secondary)";
console.log(h1.parentElement.children);

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.nextSibling);
```

# 13 Building a tabbed component

```javaScript
// 13: Building a tabbed component
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", (e) => {
	const clicked = e.target.closest(".operations__tab");
	// console.log(clicked);
	// Guard clause(click on blank space of the parent container)
	if (!clicked) return;
	// remove active tab
	tabs.forEach((t) => t.classList.remove("operations__tab--active"));
	// Activate tab
	clicked.classList.add("operations__tab--active");
	// remove active content area
	tabsContent.forEach((c) => {
		c.classList.remove("operations__content--active");
	});
	// activate content area
	document
		.querySelector(`.operations__content--${clicked.dataset.tab}`)
		.classList.add("operations__content--active");
});
```

# 14 Passing arguments ot event handlers

```javaScript
// 14: Passing arguments to event handlers
// Menu fade animation
const nav = document.querySelector(".nav");

const handleHover = function (e) {
	if (e.target.classList.contains("nav__link")) {
		const link = e.target;
		const siblings = link.closest(".nav").querySelectorAll(".nav__link");
		const logo = link.closest(".nav").querySelector("img");
		siblings.forEach((el) => {
			if (el !== link) el.style.opacity = this;
		});
		logo.style.opacity = this;
	}
};

// passing argument in event handler
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));
```

# 15 Implementing a sticky navigation & The scroll event

- not recommended

```javaScript
// 15: Implementing a sticky navigation and the scroll event
window.addEventListener("scroll", (e) => {
	const initialCoords = section1.getBoundingClientRect();
	// console.log(initialCoords.top);
	if (window.scrollY > initialCoords.top) nav.classList.add("sticky");
	else nav.classList.remove("sticky");
});
```

# 16 A Better way - the intersection observer API

```javaScript
// 16: A better way - The interaction observer API

	//////////////////////--Demonstration Code--///////////////////
const obsCallback = function (entries, observer) {
	// arg will be added by observer
	entries.forEach((entry) => {
		console.log(entry);
	});
};
const obsOptions = {
	root: null, // element to intersect (null for current view-port/root element)
	// threshold: 0.1, // trigger on 10% intersection
	threshold: [0, 0.2], // trigger on all the array value
};
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1); // observe element

//////////////////////--Actual App Code--///////////////////
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
	const [entry] = entries;
	// console.log(entry);
	if (!entry.isIntersecting) {
		nav.classList.add("sticky");
	} else {
		nav.classList.remove("sticky");
	}
};

const headerObserver = new IntersectionObserver(stickyNav, {
	root: null,
	threshold: 0,
	rootMargin: `-${navHeight}px`, // margin to the view-port
});
headerObserver.observe(header);
```

# 17 Revealing elements on scroll

```javaScript
// 17: Revealing elements on scroll
const allSections = document.querySelectorAll(".section");
const revealSection = function (entries, observe) {
	const [entry] = entries;
	console.log(entry);
	if (!entry.isIntersecting) return;
	entry.target.classList.remove("section--hidden");
	// unobserve after observing visibility
	sectionObserver.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
	root: null,
	threshold: 0.15,
});
allSections.forEach(function (section) {
	sectionObserver.observe(section);
	section.classList.add("section--hidden");
});
```

# 18 Lazy loading Images

```javaScript
// 18: Lazy loading images
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
	const [entry] = entries;
	console.log(entry);
	if (!entry.isIntersecting) return;

	// replace src with data-src
	entry.target.src = entry.target.dataset.src;
	entry.target.addEventListener("load", () => {
		entry.target.classList.remove("lazy-img"); // as blur need to go after the img fully load
	});
	imgObserver.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
	root: null,
	threshold: 0,
	rootMargin: "200px", // to increase the view-point to downward to load a bit early
});
imgTargets.forEach((img) => imgObserver.observe(img));
```

# 19,20 Building the slider component

```javaScript
// 19, 20 Building the slider component
// slider
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

let curSlide = 0;
const maxSlide = slides.length;

const goToSlide = function (slide) {
	slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)); // 0%, 100%, 200%
};

const nextSlide = function () {
	if (curSlide === maxSlide - 1) {
		curSlide = 0;
	} else curSlide++;
	goToSlide(curSlide);
};

const prevSlide = function () {
	if (curSlide === 0) {
		curSlide = maxSlide - 1;
	} else {
		curSlide--;
	}
	goToSlide(curSlide);
};

// Next slide
btnRight.addEventListener("click", nextSlide);
// Previous slide
btnLeft.addEventListener("click", prevSlide);

// Control slide with arrow key
document.addEventListener("keydown", function (e) {
	if (e.key === "ArrowRight") nextSlide();
	e.key === "ArrowLeft" && prevSlide(); // using short-circuiting
});

// dots
const dotContainer = document.querySelector(".dots");
const createDots = function () {
	slides.forEach(function (_, i) {
		dotContainer.insertAdjacentHTML(
			"beforeend",
			`<button class="dots__dot" data-slide="${i}"></button>`
		);
	});
};
const activateDot = function (slide) {
	document
		.querySelectorAll(".dots__dot")
		.forEach((dot) => dot.classList.remove("dots__dot--active"));
	document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add("dots__dot--active");
};

// initializer code
const init = function () {
	goToSlide(0);
	createDots();
	activateDot(curSlide);
};
init();

dotContainer.addEventListener("click", function (e) {
	if (e.target.classList.contains("dots__dot")) {
		const { slide } = e.target.dataset;
		goToSlide(slide);
		activateDot(slide);
	}
});
```

# 21 Lifecycle DOM Events

```javaScript
document.addEventListener("DOMContentLoaded", function (e) {
	console.log("HTML parsed and DOM tree built!");
});

window.addEventListener("load", function (e) {
	console.log("Page fully loaded");
});

// not working
window.addEventListener("onbeforeunload", function (e) {
	e.preventDefault();
	console.log(e);
});
```

# 22 Efficient Script Loading, defer and async

![image](022%20Efficient%20Script%20Loading_%20defer%20and%20async.mp4_snapshot_09.03_[2022.11.07_22.04.46].jpg)

```HTML
<!-- for fast loading  -->
<script defer src="script.js"></script>;
```
