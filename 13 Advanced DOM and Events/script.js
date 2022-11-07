"use strict";

// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
	e.preventDefault();
	modal.classList.remove("hidden");
	overlay.classList.remove("hidden");
};

const closeModal = function () {
	modal.classList.add("hidden");
	overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
	if (e.key === "Escape" && !modal.classList.contains("hidden")) {
		closeModal();
	}
});

// 05: adding new elements
const header = document.querySelector(".header");
const message = document.createElement("div");
message.classList.add("cookie-message");
message.innerHTML = `We use cookies for improved functionality and 
analytics. <button class='btn btn--close-cookie'>Got it!</button>`;
header.append(message);
// delete element
document.querySelector(".btn--close-cookie").addEventListener("click", () => {
	message.remove();
});

// 06: styles
// to set inline css properties
message.style.backgroundColor = "#37383d";
message.style.width = "120%";
// console.log(message.style.color); // will not get anything
// to get a css properties
// console.log(getComputedStyle(message).color);
// changing height of message
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 40 + "px";
// change css properties directly
document.documentElement.style.setProperty("--color-primary", "orangered");

/*
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
*/

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

// 08: Types of Events and Event Handlers
const h1 = document.querySelector("h1");
const alertH1 = function (e) {
	// alert("addEventListener: Great! You are reading the heading :D");
	h1.removeEventListener("mouseenter", alertH1);
};

h1.addEventListener("mouseenter", alertH1);
// old-school
// h1.onmouseenter = function (e) {
// 	alert("onEventListener: Great! :D");
// };

// 🟥10: Event Propagation in practice
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)}, ${randomInt(0, 255)})`;
/*
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
*/

// 🟥11: Event delegation & Implementing page navigation
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

// 12: DOM Traversing
// Going downward: child
/*
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
*/

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

// 15: Implementing a sticky navigation and the scroll event
/*
window.addEventListener("scroll", (e) => {
	const initialCoords = section1.getBoundingClientRect();
	// console.log(initialCoords.top);
	if (window.scrollY > initialCoords.top) nav.classList.add("sticky");
	else nav.classList.remove("sticky");
});
*/

// 16: A better way - The interaction observer API
/*
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
*/

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

// 17: Revealing elements on scroll
const allSections = document.querySelectorAll(".section");
const revealSection = function (entries, observe) {
	const [entry] = entries;
	// console.log(entry);
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

// 18: Lazy loading images
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
	const [entry] = entries;
	// console.log(entry);
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

// 21: Lifecycle DOM Events
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

// 22: Efficient Script Loading, defer and async
{
	/* <script defer src="script.js"></script>; */
}
