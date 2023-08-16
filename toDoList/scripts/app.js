import AddTaskForm from "./AddTaskForm.js";

const addTaskForm = new AddTaskForm(onTaskCreate);

console.log(addTaskForm);

function onTaskCreate(taskData) {
    console.log(taskData);
}
