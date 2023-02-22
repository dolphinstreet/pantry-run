const listDetails = document.querySelector(".list-details");
const listRow = document.querySelectorAll(".list-row");
const checkedDiv = document.querySelector(".checked-items");
const uncheckedDiv = document.querySelector(".ingredients-by-category");
const listId = document.querySelector(".list-details").dataset.id;
const title = document.querySelector("h1");

const editRowIcon = uncheckedDiv.querySelectorAll(".fa-pen-to-square")
const editableItems = uncheckedDiv.querySelectorAll("p")

console.log(editRowIcon, editableItems)

// Make content editable on click
editRowIcon.forEach((icon) => icon.addEventListener("click", makeEditable));

function makeEditable(event) {
    row = event.target.parentNode
    icon = event.target
    const amountDom = row.querySelector(".item-amount");
    const unitDom = row.querySelector(".item-unit");
    const ingredientDom = row.querySelector(".item-name");

    amountDom.setAttribute("contenteditable", "true");
    unitDom.setAttribute("contenteditable", "true");
    ingredientDom.setAttribute("contenteditable", "true");

    icon.style.color = "#ffa668"

    amountDom.focus()
    unitDom.focus()
    ingredientDom.focus()

}