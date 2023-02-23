const uncheckedDiv = document.querySelector(".ingredients-by-category");
const listId = document.querySelector(".list").dataset.id;
const title = document.querySelector("h1");

const editableElements = document.querySelectorAll("[contenteditable=true]");
const saveButton = document.querySelector(".icon.plus>a");

const rowTemplate = document.getElementById("template");
const addbutton = document.querySelector(".fa-plus");
const searchBar = document.querySelector("input[name=search]");

saveButton.addEventListener("click", function (event) {
    event.preventDefault();

    const listRow = document.querySelectorAll(".list-row");
    const redirect = event.currentTarget.href;
    const listInfo = {
        name: title.innerText,
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
        .post(`/api/lists/`, listInfo)
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
    uncheckedDiv.prepend(clone);
});
