const user = {
  name: "Alexander",
  group: "fe2809",
};

console.log(user.group);

user.group = "videolessons";

console.log(user.group);

delete user.group;

console.log(user);

user["group"] = "fe2809";

let key = "name";

console.log(user[key]);
console.log(user.key);

console.log(user);

for (const key in user) {
  console.log("key: ", key);
  console.log("value: ", user[key]);
}

const user2 = {};

for (const key in user) {
  user2[key] = user[key];
}

user2.name = "Vasya";

console.log(user2);
console.log(user);
