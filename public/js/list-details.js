const listDetails = document.querySelector(".list-details")
const listRow = document.querySelectorAll(".list-row")
const checkedDiv = document.querySelector(".checked-items")


listRow.forEach(row =>
    row.addEventListener("touchstart", checkedItem)
)

function checkedItem(event) {
    row = event.currentTarget;
    checkedDiv.append(row.textContent)
    // row.style.display = "none"
}