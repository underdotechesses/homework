import { Cell } from "./cell.js";
import WinLine from "./winLine.js";

export default class Board {
    static STATUS = {
        RUN: "run",
        WIN: "win",
        DRAW: "draw",
        RENDER: "render",
    };

    static TIMER_X = {
        RUN: "run",
        STOP: "stop",
    };

    static TIMER_O = {
        RUN: "run",
        STOP: "stop",
    };

    static TIME_FOR_GAME = {
        DEFAULT_GAME: 30,
        LITTLE_GAME: 10,
        BIG_GAME: 60,
        TIME_LOST: 0,
    };

    static createEmptyBoardValue() {
        return [
            [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
            [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
            [Cell.EMPTY, Cell.EMPTY, Cell.EMPTY],
        ];
    }

    static findWinLine(lines, winSymbol) {
        return lines.find((line) =>
            line.values.every((symbol) => symbol === winSymbol)
        );
    }

    constructor(
        $node,
        value = Board.createEmptyBoardValue(),
        currentUser = Cell.CROSS,
        $timer_x,
        $timer_o,
        $big_game,
        $default_game,
        $little_game
    ) {
        this.$board = $node;
        this.$timer_x = document.querySelector(".timer__value_x");
        this.$timer_o = document.querySelector(".timer__value_o");
        this.$cells = Array.from(
            this.$board.querySelectorAll(".cross__board-item")
        );
        this.winLine = new WinLine($node.querySelector(".win-lines-wrapper"));
        this.$big_game = document.querySelector(".big-game");
        this.$default_game = document.querySelector(".default-game");
        this.$little_game = document.querySelector(".little-game");
        this.$big_game.addEventListener("click", () => this.chooseBigTimer());
        this.$default_game.addEventListener("click", () =>
            this.chooseDefaultTimer()
        );
        this.$little_game.addEventListener("click", () =>
            this.chooseLittleTimer()
        );

        this.clearTime();

        this.clickHandler = this.clickHandler.bind(this);

        this.cells = this.$cells.map(
            ($cell, index) =>
                new Cell(
                    $cell,
                    index,
                    value[Math.floor(index / 3)][index % 3],
                    this.clickHandler
                )
        );

        this.status = Board.STATUS.RUN;
        this.timer_status = Board.TIMER_RUN;

        this.currentUser = currentUser;
    }

    clearTime() {
        this.$timer_x.innerText = "";
        this.$timer_o.innerText = "";
    }

    chooseBigTimer() {
        this.$timer_x.innerText = Board.TIME_FOR_GAME.BIG_GAME;
        this.$timer_o.innerText = Board.TIME_FOR_GAME.BIG_GAME;
        this.time = Board.TIME_FOR_GAME.BIG_GAME;
    }

    chooseDefaultTimer() {
        this.$timer_x.innerText = Board.TIME_FOR_GAME.DEFAULT_GAME;
        this.$timer_o.innerText = Board.TIME_FOR_GAME.DEFAULT_GAME;
        this.time = Board.TIME_FOR_GAME.DEFAULT_GAME;
    }

    chooseLittleTimer() {
        this.$timer_x.innerText = Board.TIME_FOR_GAME.LITTLE_GAME;
        this.$timer_o.innerText = Board.TIME_FOR_GAME.LITTLE_GAME;
        this.time = Board.TIME_FOR_GAME.LITTLE_GAME;
    }
    // Promise
    //     .then(onResolve, onReject)
    //     .catch(onReject)

    clickHandler(cell) {
        // add async to clickHandler
        // try {
        //     await this.step(cell.index, cell);
        // } catch (error) {
        //     console.error(error);
        //     alert(error.message);
        // }

        this.step(cell.index, cell).catch((error) => {
            console.error(error);
            // alert(error.message);
        });
    }

    getLines() {
        const lines = [];

        for (let i = 0; i < 3; i++) {
            lines.push(
                {
                    type: WinLine.LINE_TYPE.ROW,
                    index: i,
                    values: [
                        this.cells[i * 3].value,
                        this.cells[i * 3 + 1].value,
                        this.cells[i * 3 + 2].value,
                    ],
                },
                {
                    type: WinLine.LINE_TYPE.COLUMN,
                    index: i,
                    values: [
                        this.cells[i].value,
                        this.cells[i + 3].value,
                        this.cells[i + 6].value,
                    ],
                }
            );
        }

        lines.push(
            {
                type: WinLine.LINE_TYPE.DIAGONAL,
                index: 0,
                values: [
                    this.cells[0].value,
                    this.cells[4].value,
                    this.cells[8].value,
                ],
            },
            {
                type: WinLine.LINE_TYPE.DIAGONAL,
                index: 1,
                values: [
                    this.cells[2].value,
                    this.cells[4].value,
                    this.cells[6].value,
                ],
            }
        );

        return lines;
    }

    async step(cellIndex, cell = this.cells[cellIndex]) {
        // проверить возможен ли ход
        if (
            this.status !== Board.STATUS.RUN &&
            (this.timer !== Board.TIMER_X.RUN ||
                this.timer !== Board.TIMER_O.RUN)
        ) {
            throw new Error(`Game status does not allow a move`);
        }
        if (cell.value !== Cell.EMPTY) {
            throw new Error("cell not empty. try to do step in another cell");
            // return Promis.reject( new Error('cell not empty. try to do step in another cell') );
        }

        // рисует крестик или нолик
        this.status = Board.STATUS.RENDER;
        await cell.setValue(this.currentUser);

        // дождусь отрисовки и вызову изменение статуса
        this.status = Board.STATUS.RUN;

        this.timer =
            this.currentUser === Cell.CROSS
                ? Board.TIMER_O.RUN
                : Board.TIMER_X.RUN;

        this.currentUser === Cell.CROSS
            ? this.timerO(this.time)
            : this.timerX(this.time);

        // проверка на победу currentUser
        const lines = this.getLines();
        const winLine = Board.findWinLine(lines, this.currentUser);

        if (winLine) {
            // currentUser победил
            this.status = Board.STATUS.WIN;
            this.timer = Board.TIMER_X.STOP;
            this.timer = Board.TIMER_O.STOP;

            // отрисую победную линию
            await this.winLine.addLine(winLine.type, winLine.index);

            alert(`Winner: ${this.currentUser}`);

            return;
        }

        // передача хода
        this.timer =
            this.currentUser === Cell.CROSS
                ? Board.TIMER_O.STOP
                : Board.TIMER_X.STOP;

        this.currentUser =
            this.currentUser === Cell.CROSS ? Cell.ZERO : Cell.CROSS;
        // return Promise.resolve(undefined)
    }

    timerX(time = this.time) {
        const stop = setInterval(() => {
            if (time >= 0) {
                this.$timer_x.innerText = time--;
            } else {
                alert("Time Lost!!!");
                clearInterval(stop);
            }
        }, 1000);
    }

    timerO(time = this.time) {
        const stop = setInterval(() => {
            if (time >= 0) {
                this.$timer_o.innerText = time--;
            } else {
                alert("Time Lost!!!");
                clearInterval(stop);
            }
        }, 1000);
    }
}
