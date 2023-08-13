const a = {
    x: 2,
    b: 'Hello',
    getX: function() {return this.x}
};

const unboundGetX = a.getX;

console.log(unboundGetX());
