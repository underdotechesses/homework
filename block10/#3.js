const grade = {
  Anton: getRandomBall(0, 90),
  Maksym: 90,
  Vladislav: getRandomBall(),
  Oleksii: getRandomBall(40),
  Vadim: getRandomBall(40, 70),
  Andrey: getRandomBall(15, 80),
};

function getRandomBall(min = 0, max = 100) {
  return Math.round(min + Math.random() * (max - min));
}

console.log(grade);

function getLeader(grade) {}

console.log("Leader: ", getLeader(grade));

function getLeader(grade) {
  let leaderName = "";

  for (const userName in grade) {
    if (!leaderName || grade[userName] > grade[leaderName]) {
      leaderName = userName;
    }
  }

  return leaderName;
}

function getAverageBall(grade) {
  let sum = 0;
  let count = 0;

  for (const name in grade) {
    sum += grade[name];
    count++;
  }

  return sum / count;
}

console.log("Average", getAverageBall(grade));

function getLatestUser(grade) {
  const result = [];
  const avBall = getAverageBall(grade);

  for (const name in grade) {
    if (grade[name] < avBall) {
      result.push(name);
    }
  }

  return result;
}

console.log("Latest: ", getLatestUser(grade));

function getLeaders(grade) {
  const result = [];
  let currentGrade = cloneObj(grade);

  for (let i = 0; i < 3; i++) {
    const currentLeaderName = getLeader(currentGrade);

    delete currentGrade[currentGrade];

    result.push(currentLeaderName);
  }

  return result;
}

console.log("Leaders: ", getLeaders(grade));

function cloneObj(grade) {
  const result = {};

  for (const name in grade) {
    result[name] = grade[name];
  }

  return result;
}
