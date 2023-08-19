const container = document.querySelector(".container");
const addInput = document.querySelector(".add-container__input");
const addButton = document.querySelector(".add-container__button");
const deleteButton = document.querySelector(".item-list__item__button");
const itemsList = document.querySelector(".item-list");
const item = document.querySelector(".item-list__item");
const clearAllButton = document.querySelector(".pending-container__button");
const pendingContainerText = document.querySelector(".pending-container__text");
const pendingContainerButton = document.querySelector(
  ".pending-container__button"
);
let pendingTasks = document.querySelector(".pending-container__tasks");
let modeIcon = document.querySelector(".header__mode-icon");

addButtonContent();
loadStorage();
uploadStorage();

function createNewElement(textContent, classListArray) {
  const deleteButton = document.createElement("button");
  const iconDelete = document.createElement("i");
  iconDelete.className = "fa-solid fa-trash-can";
  deleteButton.appendChild(iconDelete);
  deleteButton.classList.add("item-list__item__delete");

  const newItem = document.createElement("li");
  newItem.appendChild(document.createTextNode(textContent));
  newItem.appendChild(deleteButton);
  newItem.classList.add(...classListArray);
  return newItem;
}

function addNewElement() {
  if (addInput.value == "") alert("You can't add an empty task!");
  else {
    const newItem = createNewElement(addInput.value, ["item-list__item"]);
    itemsList.appendChild(newItem);
    addInput.value = "";
    uploadStorage();
  }
}

function uploadStorage() {
  const items = document.querySelectorAll(".item-list__item");
  const todos = [];
  let checkedNumber = 0;
  let pendingNumber = 0;
  items.forEach((item) => {
    todos.push({
      textContent: item.childNodes[0].textContent,
      classList: [...item.classList],
    });
    if (item.classList[1]) checkedNumber++;
  });
  pendingNumber = items.length - checkedNumber;
  pendingTasks.innerText = `You have ${pendingNumber} pending task${
    pendingNumber !== 1 ? "s" : ""
  }`;
  pendingContainerText.style.display = pendingNumber ? "inline-block" : "none";
  pendingContainerButton.style.display = items.length ? "inline-block" : "none";

  localStorage.setItem("itemsInStorage", JSON.stringify(todos));
}

function loadStorage() {
  items = JSON.parse(localStorage.getItem("itemsInStorage"));
  if (items) {
    items.forEach((item) => {
      const newItem = createNewElement(item.textContent, item.classList);
      return itemsList.appendChild(newItem);
    });
  }
}

function clearStorage() {
  const items = document.querySelectorAll(".item-list__item");
  items.forEach((item) => {
    item.parentNode.removeChild(item);
  });
}

function addButtonContent() {
  addButton.innerHTML =
    window.innerWidth < 600
      ? '<i class="button__icon fa-solid fa-plus fa-xl"></i>'
      : '<span class="button__span">Add task</span>';
}

function changeMode() {
  modeIcon.classList.toggle("header__mode-icon--clicked");
  container.classList.toggle("dark-mode__container");
  addButton.classList.toggle("dark-mode__button");
  clearAllButton.classList.toggle("dark-mode__button");
}

window.addEventListener("resize", addButtonContent);

document.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("item-list__item__delete") ||
    event.target.parentElement.classList.contains("item-list__item__delete")
  ) {
    event.target.closest(".item-list__item").remove();
  }
  if (event.target.classList.contains("item-list__item")) {
    event.target.classList.toggle("item-list__item--checked");
  }
  if (event.target.classList.contains("pending-container__button")) {
    clearStorage();
  }

  uploadStorage();
});

modeIcon.addEventListener("click", changeMode);
addButton.addEventListener("click", addNewElement);
addInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") addNewElement();
});
