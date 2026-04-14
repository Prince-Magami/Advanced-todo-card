const dueDateElement = document.getElementById("dueDate");
const timeRemainingElement = document.getElementById("timeRemaining");

const checkbox = document.querySelector('[data-testid="test-todo-complete-toggle"]');
const statusText = document.querySelector('[data-testid="test-todo-status"]');
const statusControl = document.getElementById("statusControl");

const desc = document.getElementById("desc");
const expandBtn = document.querySelector(".expand-btn");
const collapsible = document.querySelector(".collapsible");

const editForm = document.querySelector(".edit-form");

const editTitle = document.getElementById("editTitle");
const editDesc = document.getElementById("editDesc");
const editPriority = document.getElementById("editPriority");
const editDue = document.getElementById("editDue");

const titleEl = document.querySelector('[data-testid="test-todo-title"]');

let state = {
  status: "Pending",
  due: new Date("2026-04-16T15:59:00")
};

function updateTime() {
  const now = new Date();
  const diff = state.due - now;

  const timeEl = document.getElementById("timeRemaining");
  const overdueEl = document.querySelector(".overdue");

  if (state.status === "Done") {
    timeEl.textContent = "Completed";
    return;
  }

  if (diff < 0) {
    const mins = Math.floor(Math.abs(diff) / 60000);
    const hrs = Math.floor(mins / 60);

    timeEl.textContent =
      hrs > 0
        ? `Overdue by ${hrs} hour(s)`
        : `Overdue by ${mins} minute(s)`;

    overdueEl.textContent = "Overdue";
    return;
  }

  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);

  timeEl.textContent =
    days > 0
      ? `Due in ${days} day(s)`
      : hrs > 0
      ? `Due in ${hrs} hour(s)`
      : `Due in ${mins} minute(s)`;
}

setInterval(updateTime, 30000);
updateTime();

checkbox.onchange = () => {
  state.status = checkbox.checked ? "Done" : "Pending";
  statusText.textContent = "● " + state.status;
};

statusControl.onchange = (e) => {
  state.status = e.target.value;
  statusText.textContent = "● " + state.status;
  checkbox.checked = state.status === "Done";
};

if (desc.textContent.length > 120) {
  expandBtn.classList.remove("hidden");
}

expandBtn.onclick = () => {
  collapsible.classList.toggle("expanded");
  expandBtn.textContent =
    collapsible.classList.contains("expanded")
      ? "Show less"
      : "Show more";
};

document.querySelector('[data-testid="test-todo-edit-button"]').onclick = () => {
  editForm.classList.remove("hidden");

  editTitle.value = titleEl.textContent;
  editDesc.value = desc.textContent;
};

document.querySelector('[data-testid="test-todo-cancel-button"]').onclick = () => {
  editForm.classList.add("hidden");
};

document.querySelector('[data-testid="test-todo-save-button"]').onclick = () => {
  titleEl.textContent = editTitle.value;
  desc.textContent = editDesc.value;

  editForm.classList.add("hidden");
};