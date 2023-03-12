const addButton = document.querySelector(".add-container__button");
const addInput = document.querySelector(".add-container__input");
const deleteButton = document.querySelector(".item-list__item__button");
const itemsList = document.querySelector(".item-list");

window.onload = loadStorage;

function createNewElement(textContent, classListArray) {
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "x";
  deleteButton.classList.add("item-list__item__button");
  const newItem = document.createElement("li");
  newItem.appendChild(document.createTextNode(textContent));
  newItem.appendChild(deleteButton);
  newItem.classList.add(...classListArray);
  return newItem;
}

function addNewElement() {
  if (addInput.value == "") alert("Write something!");
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
  items.forEach((item) =>
    todos.push({
      textContent: item.childNodes[0].textContent,
      classList: [...item.classList],
    })
  );
  localStorage.setItem("itemsInStorage", JSON.stringify(todos));
}

function loadStorage() {
  items = JSON.parse(localStorage.getItem("itemsInStorage"));
  items.forEach((item) => {
    const newItem = createNewElement(item.textContent, item.classList);
    return itemsList.appendChild(newItem);
  });
}

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("item-list__item__button")) {
    event.target.parentElement.remove();
  }
  if (event.target.classList.contains("item-list__item")) {
    event.target.classList.toggle("item-list__item--checked");
  }
  uploadStorage();
});

addButton.addEventListener("click", addNewElement);
addInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") addNewElement();
});
