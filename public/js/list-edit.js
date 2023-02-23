//import TinyGesture from "https://unpkg.com/tinygesture@1.1.4/TinyGesture.js";

import initSlider from "./swipe.js";


const uncheckedDiv = document.querySelector(".ingredients-by-category");
const list = document.querySelector(".list");
const title = document.querySelector("h1");

const editableElements = document.querySelectorAll("[contenteditable=true]");
const saveButton = document.querySelector(".icon.plus>a");

const rowTemplate = document.getElementById("template");
const addbutton = document.querySelector(".fa-plus");
const searchBar = document.querySelector("input[name=search]");

const deleteButton = document.querySelectorAll(".reveal-right")

saveButton.addEventListener("click", function (event) {
    event.preventDefault();

    const listRow = document.querySelectorAll(".list-row");
    const redirect = event.currentTarget.href;
    const listInfo = {
        "_id": list.dataset.id, //id de la liste,
        name: title.innerText,
        template: list.dataset.template === "true",
        //favorite: favorite.classList.contains("fa-solid"),
        rows: [],
    };

    listRow.forEach((item) => {
        const amountDom = item.querySelector(".item-amount");
        const unitDom = item.querySelector(".item-unit");
        const ingredientDom = item.querySelector(".item-name");

        listInfo.rows.push({
            "_id": item.dataset.id,
            amount: Number(amountDom.innerText),
            unit: {
                "_id": unitDom.dataset.id,
                "name": unitDom.innerText,
            },
            ingredient: {
                "_id": ingredientDom.dataset.id,
                "name": ingredientDom.innerText,
            },
        });
    });
    axios
        .patch(`/api/lists/save`, listInfo)
        .then((res) => {
            window.location.href = redirect;
        })
        .catch((error) => {
            console.error(error);
        });
});

addbutton.addEventListener("click", (event) => {
    const clone = rowTemplate.content.cloneNode(true);
    clone.querySelector(".item-name").textContent = searchBar.value;
    initSlider(clone.querySelector(".swipe-item"));
    uncheckedDiv.prepend(clone);
    searchBar.value = "";
});


deleteButton.addEventListener("click", (event) => {

})