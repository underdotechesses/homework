//? Начальник цеха пригласил людей на совещание
//? Каждый, кто входит в кабинет пожимает руки всем присутствующим
//? Сколько человек зашло в кабинет, если известно,
//? что всего произошло 120 рукопожатий.

function getPeople(handshake) {
  let sum = 0;
  let i = 0;

  for (i = 1; sum < handshake; i++) {
    sum += i;
    
    if (sum === handshake) {
      return i;
    }
  }
}


/*
console.log(getPeople(1)); // 1
console.log(getPeople(3)); // 2
console.log(getPeople(6)); // 3
console.log(getPeople(10)); // 4
console.log(getPeople(15)); // 5
*/
console.log(getPeople(120)); // ? 15

//  6           7
// 15 + 6 = 21 + 7 = 28 + 8 = 36 + 9 = 45 + 10 = 55 + 11 = 66 + 12 = 78 + 13 = 91 + 14 = 105 + 15 = 120;


function getSumHandshake(people) {
  let sum = 0;
  let i = 0;

  for (i = 1; i < people + 1; i++) {
    sum += i;

    if (i === people) {
      return sum;
    }
  }
}

console.log(getSumHandshake(1000));