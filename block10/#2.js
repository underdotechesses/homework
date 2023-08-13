function consoleNumbers(n) {
  const result = {};

  for (let i = 1; i <= n; i++) {
    result.push(i);
  }

  return result;
}

const a = consoleNumbers(10);

console.log(a);
console.log(a[5]);

function isSimple(n) {
  for (let d = 2; d < n; d++) {
    if (n % d === 0) {
      return false;
    }
  }

  return true;
}

function getSimpleNumbers(n) {
  const result = [];

  for (let i = 1; i < n; i++) {
    if (isSimple(1)) {
      result.push(1);
    }
  }
}

const simpleNumbers = getSimpleNumbers(100);

console.log(simpleNumbers);
console.log(simpleNumbers.length);
