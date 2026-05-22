let tasks = [];

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const prioritySelect = document.getElementById("priority-select");
const taskList = document.getElementById("task-list");
const activeCountEl = document.getElementById("active-count");
const completedCountEl = document.getElementById("completed-count");

const PRIORITY_LABELS = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

function addTask(text, priority) {
  tasks.push({
    id: crypto.randomUUID(),
    text,
    priority,
    completed: false,
  });
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

    const badge = document.createElement("span");
    badge.className = `priority-badge ${task.priority}`;
    badge.textContent = PRIORITY_LABELS[task.priority];

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(badge);
    taskList.appendChild(li);
  }
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;

  const priority = prioritySelect.value;
  addTask(text, priority);
  taskInput.value = "";
  taskInput.focus();
  render();
});

render();
