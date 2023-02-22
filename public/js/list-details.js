const listDetails = document.querySelector(".list-details");
const listRow = document.querySelectorAll(".list-row");
const checkedDiv = document.querySelector(".checked-items");
const uncheckedDiv = document.querySelector(".ingredients-by-category");

function checkItem(event) {
    row = event.currentTarget;
    checkedDiv.append(row);
    row.removeEventListener("touchstart", checkItem);
    row.addEventListener("touchstart", uncheckItem);
}

function uncheckItem(event) {
    row = event.currentTarget;
    uncheckedDiv.append(row);
    row.removeEventListener("touchstart", uncheckItem);
    row.addEventListener("touchstart", checkItem);
}

listRow.forEach((row) => row.addEventListener("touchstart", checkItem));
