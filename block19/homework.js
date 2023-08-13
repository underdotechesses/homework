class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    get info() {
        return `${this.name}s age is ${this.age}`;
    }
}

class Labrador extends Dog {
    constructor(name, age, gender, master) {
        super(name, age, gender, "Labrador", "Large", master, true);
    }
}