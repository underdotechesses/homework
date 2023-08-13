// Even or Odd

function evenOrOdd(number) {
  if (number % 2 === 0) {
      return "Even";
  }

  return "Odd";
}

console.log(evenOrOdd(10));

// Return Negative

function makeNegative(num) {
  if (num < 0) {
    return num;
  }
  
  return -num;
}

console.log(makeNegative(10));

// Jenny's secret message

function greet(name){  
  if(name === "Johny") {
    return "Hello, my love!";
  }
  return "Hello, " + name + "!";
}

console.log(greet("Johny"));
console.log(greet("Nick"));

// Opposites Attract

function lovefunc(flower1, flower2){
  if (flower1 % 2 === 0 && flower2 % 2 !== 0) {
    return true;
  } else if (flower1 % 2 !== 0 && flower2 % 2 === 0) {
    return true;
  }

  return false;
}

console.log(lovefunc(1, 4) === true);
console.log(lovefunc(2, 3) === true);
console.log(lovefunc(2, 4) === false);

// Convert  boolen values, to strings 'Yes' of 'No'

/*
function boolToWord( bool ){
  if (bool === true) {
    return "Yes";
  }

  return "No";
}
*/

function boolToWord( bool ){
  return bool ? 'Yes':'No';
}

console.log(boolToWord(true) === "Yes");
console.log(boolToWord(false) === "No");

// Transportation on vacation

function rentalCarCost(d) {
  let totalAmount = d* 40;
  
  if(d>=7) {
    totalAmount -=50;
  }
  else if(d>=3) {
   totalAmount -=20; 
  }
  return totalAmount;
}

console.log(rentalCarCost(5) === 180);
console.log(rentalCarCost(2) === 80);
console.log(rentalCarCost(8) === 270);

// Basic Mathematical Operations

function basicOp(operation, value1, value2)
{
  if (operation === "+") {
    return value1 + value2;
  } else if (operation === "-") {
    return value1 - value2;
  } else if (operation === "*") {
    return value1 * value2;
  } else if (operation === "/") {
    return value1 / value2;
  }

  return false;
}

console.log(basicOp('+', 1, 3) === 4);
console.log(basicOp('-', 1, 3) === -2);
console.log(basicOp('*', 1, 3) === 3);
console.log(basicOp('/', 9, 3) === 3);