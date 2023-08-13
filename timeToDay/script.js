const current = new Date();
let monthes = 0;
let years = 0;
let days = 0;
let text = "";

const dateInput = prompt("Please enter the date (YYYY-MM-DD)");

const inputDate = new Date(dateInput);
years = inputDate.getFullYear() - current.getFullYear();
monthes = inputDate.getMonth() - current.getMonth();
days = inputDate.getDate() - current.getDate();


if (isNaN(inputDate)) {
    text = "Something's wrong";
}

else if (years < 0 || years === 0 && monthes < 0 || years === 0 && monthes === 0 && days < 0) {
    if (monthes > 0 && days > 0) {
        text = "That's was " + (-years - 1) + " years and " + (11 - monthes) + " monthes ago";
    }
    else if (monthes > 0) {
        text = "That's was " + (-years - 1) + " years and " + (12 - monthes) + " monthes ago";
    }
    else if (monthes < 0 && days > 0) {
        text = "That's was " + (-years) + " years and " + (-monthes - 1) + " monthes ago";
    }
    else {
        text = "That's was " + (-years) + " years and " + (-monthes) + " monthes ago";
    }
}

else if (years > 0 || years === 0 && monthes > 0 || years === 0 && monthes === 0 && days >= 0) {
    if (monthes < 0) {
        text = "For your date left " + (years - 1) + " years and " + (12 + monthes) + " monthes";
    }
    else if (days < 0) {
        text = "For your date left " + (years) + " years and " + (monthes - 1) + " monthes";
    }
    else {
        text = "For your date left " + (years) + " years and " + (monthes) + " monthes";
    }
}

document.getElementById("date").innerHTML = text;