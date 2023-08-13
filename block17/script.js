import Timer from './timer.js';

const timerEl = document.querySelector('.timer');
const timer = new Timer(timerEl);

console.log(timer);

console.dir(Timer);
console.dir(EventSource);

timer.addEventListener('run', function(e) {
    console.log('timer start');
});