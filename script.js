const title = document.getElementById("title");
const description = document.getElementById("description");

const editForm = document.getElementById("editForm");
const viewMode = document.getElementById("viewMode");

const editTitle = document.getElementById("editTitle");
const editDesc = document.getElementById("editDesc");
const editPriority = document.getElementById("editPriority");
const editDue = document.getElementById("editDue");

const status = document.querySelector('[data-testid="test-todo-status"]');
const checkbox = document.querySelector('[data-testid="test-todo-complete-toggle"]');
const statusControl = document.getElementById("statusControl");

const toggleBtn = document.querySelector('[data-testid="test-todo-expand-toggle"]');

let state = {
  title: title.textContent,
  description: description.textContent,
  priority: "High",
  status: "Pending",
  dueDate: new Date("2026-04-16T15:59:00")
};

function updateTime() {
  const now = new Date();
  const diff = state.dueDate - now;

  const timeEl = document.querySelector('[data-testid="test-todo-time-remaining"]');
  const overdueEl = document.querySelector('[data-testid="test-todo-overdue-indicator"]');

  if (state.status === "Done") {
    timeEl.textContent = "Completed";
    overdueEl.textContent = "";
    return;
  }

  if (diff < 0) {
    overdueEl.textContent = "OVERDUE";
    timeEl.textContent = "Overdue";
    return;
  }

  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);

  if (days > 0) timeEl.textContent = `Due in ${days} days`;
  else if (hrs > 0) timeEl.textContent = `Due in ${hrs} hours`;
  else timeEl.textContent = `Due in ${mins} minutes`;
}

setInterval(updateTime, 30000);
updateTime();

checkbox.addEventListener("change", () => {
  state.status = checkbox.checked ? "Done" : "Pending";
  status.textContent = state.status;
});

statusControl.addEventListener("change", (e) => {
  state.status = e.target.value;
  status.textContent = state.status;
  checkbox.checked = state.status === "Done";
});

document.querySelector('[data-testid="test-todo-edit-button"]').onclick = () => {
  editForm.classList.remove("hidden");
  viewMode.style.display = "none";

  editTitle.value = state.title;
  editDesc.value = state.description;
  editPriority.value = state.priority;
};

document.querySelector('[data-testid="test-todo-cancel-button"]').onclick = () => {
  editForm.classList.add("hidden");
  viewMode.style.display = "block";
};

document.querySelector('[data-testid="test-todo-save-button"]').onclick = () => {
  state.title = editTitle.value;
  state.description = editDesc.value;
  state.priority = editPriority.value;

  title.textContent = state.title;
  description.textContent = state.description;

  editForm.classList.add("hidden");
  viewMode.style.display = "block";
};

function checkDescriptionLength() {
  if (description.textContent.length > 120) {
    toggleBtn.classList.add("show");
  } else {
    toggleBtn.classList.remove("show");
  }
}

checkDescriptionLength();

toggleBtn.onclick = () => {
  const box = document.querySelector(".collapsible");
  box.classList.toggle("expanded");

  toggleBtn.textContent =
    box.classList.contains("expanded") ? "Show less" : "Show more";
};
