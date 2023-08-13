//Return the Missing Element
const superImportantArray = [9, 2, 4, 5, 7, 0, 8, 6, 1];

console.log(superImportantArray);

function getMissingElement(superImportantArray) {
  for (let i = 0; i < 10; i++) {
    if (!superImportantArray.includes(i)) {
      return i;
    }
  }
}

console.log(getMissingElement(superImportantArray));

//Add property to every object in array

var questions = [
  {
    question: "What's the currency of the USA?",
    choices: ["US dollar", "Ruble", "Horses", "Gold"],
    corAnswer: 0,
  },
  {
    question: "Where was the American Declaration of Independence signed?",
    choices: ["Philadelphia", "At the bottom", "Frankie's Pub", "China"],
    corAnswer: 0,
  },
];

console.log(questions);

questions.forEach(function (i) {
  i.userAnswer = null;
});

console.log(questions);

//Find Your Villain Name

/*
function getVillainName(birthday) {
  firstNames = [
    "The Evil",
    "The Vile",
    "The Cruel",
    "The Trashy",
    "The Despicable",
    "The Embarrassing",
    "The Disreputable",
    "The Atrocious",
    "The Twirling",
    "The Orange",
    "The Terrifying",
    "The Awkward",
  ];
  lastNames = ["Mustache", "Pickle", "Hood Ornament", "Raisin", "Recycling Bin", "Potato", "Tomato", "House Cat", "Teaspoon", "Laundry Basket"];
  return firstNames[birthday.getMonth()] + " " + lastNames[birthday.getDate() % 10];
}

console.log(getVillainName(birthday));
*/

//Take a Ten Minute Walk

/* const walk = ["n", "s", "w", "e", "n", "s", "w", "e", "n", "s"];

function isValidWalk(walk) {
  let north = 0;
  let south = 0;
  let west = 0;
  let east = 0;

  if (walk.length !== 10) {
    return false;
  }

  for (let i = 0; i < walk.length; i++) {
    if (walk[i] === "n") {
      north++;
    } else if (walk[i] === "s") {
      south++;
    } else if (walk[i] === "w") {
      west++;
    } else if (walk[i] === "e") {
      east++;
    }
  }

  return north === south && west === east;
}

console.log(isValidWalk(["n", "s", "w", "e", "n", "s", "w", "e", "n", "s"]) === true);
console.log(isValidWalk(["n", "s", "w", "e", "n", "s", "w", "e", "n", "w"]) === false);
console.log(isValidWalk(["n", "s", "w", "e", "n", "s", "w", "e", "n"]) === false);

*/

function isValidWalk(walk) {
  if (walk.length != 10) {
    return false;
  }

  const result = walk.reduce(
    function (result, symbol) {
      result[symbol]++;

      console.log("reduce", { ...result }, symbol);

      return result;
    },
    {
      n: 0,
      s: 0,
      w: 0,
      e: 0,
    }
  );

  return result.n === result.s && result.w === result.e;
}

console.log(isValidWalk(["n", "s", "w", "e", "n", "s", "w", "e", "n", "s"]) === true);
console.log(isValidWalk(["n", "s", "w", "e", "n", "s", "w", "e", "n", "w"]) === false);
console.log(isValidWalk(["n", "s", "w", "e", "n", "s", "w", "e", "n"]) === false);
