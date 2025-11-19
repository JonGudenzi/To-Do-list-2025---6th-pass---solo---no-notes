const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const errorMsg = document.getElementById("errorMsg");
const taskList = document.getElementById("taskList");

let tasks = [];

function addTask(text) {
  const taskObj = {
    text: text,
    completed: false
  };
  tasks.push(taskObj);
  render();
  saveTask();
}

function buildLi(task, index) {
  const li = document.createElement("li");
  li.textContent = task.text;
  li.dataset.index = index;

  if (task.completed) {
    li.classList.add("completed");
  }

  // Toggle when clicking the li
  li.addEventListener("click", toggleTask);

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.classList.add("delete-btn");
  li.appendChild(deleteBtn);

  // Delete behavior lives here now
  deleteBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    const li = event.target.closest("li");
    const index = li.dataset.index;
    deleteTask(index);
  });

  return li;
}

function render() {
  taskList.innerHTML = "";
  tasks.forEach(function (task, index) {
    const li = buildLi(task, index);
    taskList.appendChild(li);
  });
}

function toggleTask(event) {
  const li = event.target.closest("li");
  const index = li.dataset.index;
  tasks[index].completed = !tasks[index].completed;
  render();
  saveTask();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  render();
  saveTask();
}

function saveTask() {
  const saveData = JSON.stringify(tasks);
  localStorage.setItem("task", saveData);
}

function loadTask() {
  const loadData = localStorage.getItem("task");
  if (loadData) {
    const data = JSON.parse(loadData);
    tasks.length = 0;
    data.forEach(function (item) {
      tasks.push(item);
    });
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
}

loadTask();
