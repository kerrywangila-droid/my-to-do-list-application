// Select HTML elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const message = document.getElementById("message");
const clearBtn = document.getElementById("clearBtn");

// Create an array to store tasks
let tasks;
try {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
} catch (error) {
    tasks = [];
}

// Save tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display tasks
function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.setAttribute("aria-label", "Mark task as completed");

        const span = document.createElement("span");
        span.textContent = task.name;
        if (task.completed) {
            span.classList.add("completed");
        }

        checkbox.addEventListener("change", function() {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            displayTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", function() {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });

    taskCount.textContent = tasks.length;
}

// Add a task
function addTask() {
    const taskName = taskInput.value.trim();

    if (taskName === "") {
        message.textContent = "Please enter a task!";
        taskInput.focus();
        return;
    }

    tasks.push({
        name: taskName,
        completed: false
    });

    message.textContent = "";
    taskInput.value = "";
    saveTasks();
    displayTasks();
    taskInput.focus();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

clearBtn.addEventListener("click", function() {
    tasks = [];
    saveTasks();
    displayTasks();
});

displayTasks();
