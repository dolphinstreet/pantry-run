const uncheckedDiv = document.querySelector(".ingredients-by-category");
const listId = document.querySelector(".list").dataset.id;
const title = document.querySelector("h1");

const editableElements = document.querySelectorAll("[contenteditable=true]");
const saveButton = document.querySelector(".icon.plus>a");

const rowTemplate = document.getElementById("template");
const addbutton = document.querySelector(".fa-plus");
const searchBar = document.querySelector("input[name=search]");

saveButton.addEventListener("click", async function (event) {
    const listRow = document.querySelectorAll(".list-row");
    event.preventDefault();
    const redirect = event.currentTarget.href;
    console.log(editableElements);
    try {
        const listInfo = {
            "_id": listId, //id de la liste,
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
            .patch(`/api/lists/save`, listInfo)
            .then((res) => {
                console.log(res);
                // check status for 200
                window.location.href = redirect;
            })
            .catch((error) => {
                //handle error
                console.error(error);
            });
    } catch (error) {
        console.log(error);
    }
});

addbutton.addEventListener("click", (event) => {
    const clone = rowTemplate.content.cloneNode(true);
    clone.querySelector(".item-name").textContent = searchBar.value;
    uncheckedDiv.prepend(clone);
});
