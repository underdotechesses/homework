export class Cell {
    static CROSS = 'x';
    static ZERO  = '0';
    static EMPTY = '';

    static createCross() {
        const root = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

        root.setAttribute('class', 'x cross__board-item-el');
        root.setAttribute('viewBox', '0 0 80 80');

        root.innerHTML = `
            <line class="x__line1" x1="20" y1="10" x2="60" y2="70"/>
            <line class="x__line2" x1="60" y1="10" x2="20" y2="70"/>
        `;

        return root;
    }

    static createZero() {
        const root = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

        root.setAttribute('class', 'o cross__board-item-el');
        root.setAttribute('viewBox', '0 0 80 80');

        root.innerHTML = `<ellipse cx="40" cy="40" rx="20" ry="30"/>`;

        return root;
    }

    constructor($node, index, value = Cell.EMPTY, onClick) {
        this.index = index;
        this.value = value;
        this.$node = $node;
        this.currentDate = new Date();
        this.currentTime = this.currentDate.getTime();
        this.clickTime = this.currentDate.getTime();
        this.$timer_x = document.querySelector('.timer__value_x');
        this.$timer_o = document.querySelector('.timer__value_o');

        this.clearCell();
        this.render();

        this.$node.addEventListener('click', () => onClick(this));
    }

    setValue(newValue) {
        return new Promise(resolve => {
            if (newValue !== this.value) {
                this.clearCell();
            }

            this.value = newValue;

            const onAnimationEnd = event => {
                // если нолик, то resolve
                // если крестик, то на вторую анимацию я вызову resolve
                if (event.animationName === 'a-o'
                    || event.animationName === 'a-x' && event.target.classList.contains('x__line2')
                ) {
                    this.$node.removeEventListener('animationend', onAnimationEnd);
                    resolve();
                }
            };

            this.$node.addEventListener('animationend', onAnimationEnd);

            this.render();
        });
    }

    clearCell() {
        this.$node.innerText = '';
    }

    render() {
        if (this.value === Cell.CROSS) {
            this.$node.append( Cell.createCross() );
        } else if (this.value === Cell.ZERO) {
            this.$node.append( Cell.createZero() );
        }
    }
}