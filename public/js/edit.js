const listRow = document.querySelectorAll(".list-row");
const checkedDiv = document.querySelector(".checked-items");
const uncheckedDiv = document.querySelector(".ingredients-by-category");
const listId = document.querySelector(".list").dataset.id;
const title = document.querySelector("h1");


const editableElements = document.querySelectorAll("[contenteditable=true]")
const saveButton = document.querySelector(".icon.plus>a")

saveButton.addEventListener("click", async function (event) {
    event.preventDefault();
    const redirect = event.currentTarget.href;
    console.log(editableElements)
    try {
        const listInfo = {
            "_id": listId, //id de la liste,
            name: title.innerText,
            //favorite: favorite.classList.contains("fa-solid"),
            rows: []
        }

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
        })
        axios.patch(`/api/lists/save`)
            .then(res => {
                console.log(res);
                // check status for 200
                window.location.href = redirect;
            })
            .catch(error => {
                //handle error
                console.error(error);
            });
    } catch (error) {
        console.log(error)
    }

})

// const editRowIcon = uncheckedDiv.querySelectorAll(".fa-pen-to-square")
// const editableItems = uncheckedDiv.querySelectorAll("p")


// // Make content editable on click
// editRowIcon.forEach((icon) => icon.addEventListener("click", makeEditable));

// function makeEditable(event) {
//     row = event.target.parentNode
//     icon = event.target
//     const amountDom = row.querySelector(".item-amount");
//     const unitDom = row.querySelector(".item-unit");
//     const ingredientDom = row.querySelector(".item-name");

//     amountDom.setAttribute("contenteditable", "true");
//     unitDom.setAttribute("contenteditable", "true");
//     ingredientDom.setAttribute("contenteditable", "true");

//     icon.style.color = "#ffa668"

//     amountDom.focus()
//     unitDom.focus()
//     ingredientDom.focus()

// }
