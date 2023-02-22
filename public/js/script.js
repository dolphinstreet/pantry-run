const listDetails = document.querySelectorAll(".list-details")
const listRow = document.querySelector(".list-row")
const checkedDiv = document.querySelector(".checked-items")

listRow.addEventListener("click", () => {
    checkedDiv.append(listRow.textContent)
    listRow.style.display = "none"
})
