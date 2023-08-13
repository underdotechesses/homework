export default class WinLine {
    static LINE_TYPE = {
        ROW: 'row',
        COLUMN: 'column',
        DIAGONAL: 'diagonal'
    }

    static LINE_TEXT = {
        [WinLine.LINE_TYPE.ROW]: [
            '<line class="win-line" x1="10" x2="290" y1="50" y2="50"/>',
            '<line class="win-line" x1="10" x2="290" y1="150" y2="150"/>',
            '<line class="win-line" x1="10" x2="290" y1="250" y2="250"/>'
        ],
        [WinLine.LINE_TYPE.COLUMN]: [
            '<line class="win-line" x1="50" x2="50" y1="10" y2="290"/>',
            '<line class="win-line" x1="150" x2="150" y1="10" y2="290"/>',
            '<line class="win-line" x1="250" x2="250" y1="10" y2="290"/>'
        ],
        [WinLine.LINE_TYPE.DIAGONAL]: [
            '<line class="win-line win-line--diagonal" x1="10" x2="290" y1="10" y2="290"/>',
            '<line class="win-line win-line--diagonal" x1="10" x2="290" y1="290" y2="10"/>'
        ]
    };


    constructor($node) {
        this.$node = $node;
        this.clearLines();
    }

    clearLines() {
        this.$node.innerText = '';
    }

    addLine(type, index) {
        return new Promise(resolve => {
            this.$node.addEventListener('animationend', resolve, {
                once: true
            });
            this.$node.innerHTML += WinLine.LINE_TEXT[type][index];
        });
    }
}