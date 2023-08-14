export default class AddTaskForm {
    constructor() {
        this.rootEl = document.querySelector(".main-div");
        this.completeAllEl = this.rootEl.elements.complete;
        this.taskTextEl = this.rootEl.elements.task;
    }
}
