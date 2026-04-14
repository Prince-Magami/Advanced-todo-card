const modal = document.getElementById("modal");

const titleEl = document.querySelector('[data-testid="test-todo-title"]');
const descEl = document.getElementById("desc");

const editTitle = document.getElementById("editTitle");
const editDesc = document.getElementById("editDesc");
const editPriority = document.getElementById("editPriority");
const editDue = document.getElementById("editDue");

const status = document.querySelector('[data-testid="test-todo-status"]');
const checkbox = document.querySelector('[data-testid="test-todo-complete-toggle"]');
const statusControl = document.getElementById("status");

const descBox = document.querySelector(".desc-box");
const toggleBtn = document.querySelector(".link-btn");

let state = {
  title: titleEl.textContent,
  desc: descEl.textContent,
  status: "Pending",
  due: new Date("2026-04-16T15:59:00")
};

function updateTime() {
  const now = new Date();
  const diff = state.due - now;

  const timeEl = document.getElementById("time");
  const overdueEl = document.querySelector(".overdue");

  if (state.status === "Done") {
    timeEl.textContent = "Completed";
    return;
  }

  if (diff < 0) {
    overdueEl.textContent = "Overdue";
    timeEl.textContent = "Overdue";
    return;
  }

  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);

  timeEl.textContent =
    days > 0 ? `Due in ${days} days` :
    hrs > 0 ? `Due in ${hrs} hours` :
    `Due in ${mins} minutes`;
}

setInterval(updateTime, 30000);
updateTime();

checkbox.onchange = () => {
  state.status = checkbox.checked ? "Done" : "Pending";
  status.textContent = state.status;
};

statusControl.onchange = (e) => {
  state.status = e.target.value;
  status.textContent = state.status;
  checkbox.checked = state.status === "Done";
};

document.querySelector('[data-testid="test-todo-edit-button"]').onclick = () => {
  modal.classList.remove("hidden");

  editTitle.value = state.title;
  editDesc.value = state.desc;
};

document.querySelector('[data-testid="test-todo-cancel-button"]').onclick = () => {
  modal.classList.add("hidden");
};

document.querySelector('[data-testid="test-todo-save-button"]').onclick = () => {
  state.title = editTitle.value;
  state.desc = editDesc.value;

  titleEl.textContent = state.title;
  descEl.textContent = state.desc;

  modal.classList.add("hidden");
};

if (descEl.textContent.length > 120) {
  toggleBtn.classList.remove("hidden");
} else {
  toggleBtn.style.display = "none";
}

toggleBtn.onclick = () => {
  descBox.classList.toggle("expanded");
};