console.log("ok")

const settingsButton = document.querySelector(".edit-list .fa-ellipsis-vertical")
const settingsMenu = document.querySelector(".edit-list .settings")
settingsButton.addEventListener("click", () => {
    settingsMenu.style.transform = "translateY(0)";
    console.log("inside")

}
)
