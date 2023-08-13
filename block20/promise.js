const circleEl = document.querySelector('.circle');

function move(circleEl, dx = 0, dy = 0) {
    return new Promise(function(resolve) {
        if(dx || dy) {
            circleEl.style.transform += `translate(${dx}px, ${dy}px)`;
        }
    
        circleEl.addEventListener(
            'transitionend',
            resolve,
            {
                once: true
            }
        );
    });
}

/*
move(circleEl, 300, 0)
    .then(() => move(circleEl, 0, 300))
    .then(() => move(circleEl, -300, 0))
    .then(() => move(circleEl, 0, -300));
*/

async function animated() {
    await move(circleEl, 300, 0);
    await move(circleEl, 0, 300);
    await move(circleEl, -300, 0);
    await move(circleEl, 0, -300);
}

console.log(animated());