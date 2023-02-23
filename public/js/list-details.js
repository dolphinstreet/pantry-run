const listDetails = document.querySelector(".list-details");
const listRow = document.querySelectorAll(".list-row");
const checkedDiv = document.querySelector(".checked-items");
const uncheckedDiv = document.querySelector(".ingredients-by-category");
const listId = document.querySelector(".list-details").dataset.id;
const title = document.querySelector("h1");
const favorite = document.querySelector(".fa-star");

function getRowsData() {
    const rows = [];

    document.querySelectorAll(".list-row").forEach((item) => {
        const amountDom = item.querySelector(".row-amount");
        const unitDom = item.querySelector(".row-unit");
        const ingredientDom = item.querySelector(".row-ingredient");

        rows.push({
            "_id": item.dataset.id,
            checked: item.dataset.checked,
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
    return rows;
}

function getListInfo() {
    return {
        "_id": listId,
        name: title.innerText,
        favorite: favorite.classList.contains("fa-solid"),
        rows: getRowsData(),
    };
}

async function checkItem(event) {
    row = event.currentTarget;
    checkedDiv.prepend(row);
    row.dataset.checked = true;
    row.removeEventListener("touchstart", checkItem);
    row.addEventListener("touchstart", uncheckItem);
    console.log(getListInfo());
    axios
        .patch(`/api/lists/save`, getListInfo())
        .then((res) => console.log(res.data))
        .catch((error) => console.error(error));
}

async function uncheckItem(event) {
    row = event.currentTarget;
    uncheckedDiv.append(row);
    row.dataset.checked = false;
    row.removeEventListener("touchstart", uncheckItem);
    row.addEventListener("touchstart", checkItem);
    axios
        .patch(`/api/lists/save`, getListInfo())
        .then((res) => console.log(res.data))
        .catch((error) => console.error(error));
}

listRow.forEach((row) => row.addEventListener("touchstart", checkItem));
