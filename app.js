let tasks = [];

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const prioritySelect = document.getElementById("priority-select");
const dueDateInput = document.getElementById("due-date-input"); // #userStory1: dueDateInput is an input field for the due date
const taskList = document.getElementById("task-list");
const activeCountEl = document.getElementById("active-count");
const completedCountEl = document.getElementById("completed-count");

const PRIORITY_LABELS = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

function addTask(text, priority, dueDate) { // #userStory1: addTask adds a new task to the tasks array
  tasks.push({
    id: crypto.randomUUID(),
    text,
    priority,
    dueDate: dueDate || null, // #userStory1: dueDate is a string in the format YYYY-MM-DD
    completed: false,
  });
}

function updateDueDate(id, dueDate) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.dueDate = dueDate || null; // #userStory1: dueDate is a string in the format YYYY-MM-DD
  }
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.completed = !task.completed;
  }
}

function render() {
  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  activeCountEl.textContent = activeCount;
  completedCountEl.textContent = completedCount;

  taskList.replaceChildren();

  if (tasks.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty-state";
    empty.textContent = "No tasks yet. Add one above!";
    taskList.appendChild(empty);
    return;
  }

  for (const task of tasks) {
    const li = document.createElement("li");
    li.className = "task-item" + (task.completed ? " completed" : "");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", `Mark "${task.text}" as ${task.completed ? "incomplete" : "complete"}`);
    checkbox.addEventListener("change", () => {
      toggleTask(task.id);
      render();
    });

    const label = document.createElement("span");
    label.className = "task-label";
    label.textContent = task.text;

    // #userStory1: dueDateField is an input field for the due date
    const dueDateField = document.createElement("input");
    dueDateField.type = "date";
    dueDateField.className = "task-due-date";
    dueDateField.value = task.dueDate || "";
    dueDateField.setAttribute("aria-label", `Due date for "${task.text}"`);
    dueDateField.addEventListener("change", () => {
      updateDueDate(task.id, dueDateField.value);
    });

    const badge = document.createElement("span");
    badge.className = `priority-badge ${task.priority}`;
    badge.textContent = PRIORITY_LABELS[task.priority];

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(dueDateField); // #userStory1: dueDateField is appended to the task item
    li.appendChild(badge);
    taskList.appendChild(li);
  }
}

taskForm.addEventListener("submit", (e) => { // #userStory1: taskForm is the form for adding a new task
  e.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;

  const priority = prioritySelect.value;
  const dueDate = dueDateInput.value; // #userStory1: dueDate is the value of the due date input field
  addTask(text, priority, dueDate); // #userStory1: addTask adds a new task to the tasks array
  taskInput.value = "";
  dueDateInput.value = ""; // #userStory1: dueDateInput is cleared
  taskInput.focus();
  render();
});

render();
