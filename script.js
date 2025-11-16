const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const errorMsg = document.getElementById("errorMsg");
const taskList = document.getElementById("taskList");

let tasks = [];

function addTask(text) {
    const taskObj = {
        text: text,
        completed: false
    }
    tasks.push(taskObj);
    render();
    saveTask();
}

function render() {
    taskList.innerHTML = "";
    tasks.forEach(function (task, index) {
        const li = document.createElement("li");
        li.textContent = task.text;
        li.dataset.index = index;
        if (task.completed === true) { li.classList.add("completed"); };
        li.addEventListener("click", toggleTask);
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        li.appendChild(deleteBtn);
        deleteBtn.addEventListener("click", function (event) {
            event.stopPropagation();
            const li = event.target.closest("li");
            const index = li.dataset.index;
            deleteTask(index);
        })
        taskList.appendChild(li);
    })
}

function toggleTask(event) {
    const li = event.target;
    const index = li.dataset.index;
    tasks[index].completed = !tasks[index].completed;
    render();
    saveTask();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    taskInput.value = "";
    taskInput.focus();
    render();
    saveTask();
}

function saveTask() {
    const saveData = JSON.stringify(tasks)
    localStorage.setItem("task", saveData);
}

function loadTask() {
    const loadData = localStorage.getItem("task");
    if (loadData) {
        const data = JSON.parse(loadData);
        data.forEach(function (item) {
            tasks.length = 0;
            tasks.push(item);
        })
    }
    render();
}

taskForm.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const userInput = taskInput.value.trim();
    if (userInput === "") {
        errorMsg.textContent = "Please enter a task";
        taskInput.focus();
        return;
    }
    errorMsg.textContent = "";
    taskInput.value = "";
    taskInput.focus();
    addTask(userInput);
    render();
}
loadTask();