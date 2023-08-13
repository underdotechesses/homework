function getSumHandshake(people) {
    let i = 0;
    let sum = 0;

    for (i = 1; i < people + 1; i++) {
        sum += i;

        if (i === people) {
            return sum;
        }
    }
}

console.log(getSumHandshake(1)); //1
console.log(getSumHandshake(2)); //3
console.log(getSumHandshake(3)); //6
console.log(getSumHandshake(4)); //10
console.log(getSumHandshake(10)); // ?