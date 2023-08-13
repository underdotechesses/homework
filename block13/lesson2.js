const currentDate = new Date();
const titleEl = document.querySelector("h1");
const currentDayEl = document.querySelector(".current-day");
const newYearDay = document.querySelector(".new-year");
const todaySpanEl = currentDayEl.querySelector("span");

console.dir(document.body);
console.dir(currentDayEl);

todaySpanEl.innerText = currentDate.toString();
