function busTimer(time) {
    let [h, m] = time.split(':').map(Number);
    m = (h * 60 + m + 5) % (24 * 60);
    if (0 < m && m < 6*60)
      return 6 * 60 - m;
    return Math.floor((m + 14) / 15) * 15 - m;
    }

console.log(busTimer("4:40"));
console.log(busTimer("15:25"));

function NameMe(first, last) {
    this.firstName = first;
    this.lastName = last;
    this.name = this.firstName + ' ' + this.lastName;
}

console.log(new NameMe('Mykola', 'Marchenko'));