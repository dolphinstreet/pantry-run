axios.defaults.withCredentials = true;



const settingsButton = document.querySelector(".edit-list .fa-ellipsis-vertical")
const settingsMenu = document.querySelector(".edit-list .settings")
const outside = document.querySelector(".edit-list")

settingsButton.addEventListener("click", openMenu)


//settingsButton.addEventListener("click", closeMenu)



function closeMenu(event) {
    settingsMenu.style.transform = "translateY(-100%)";
    settingsButton.style.color = "#75a0ff"
    event.currentTarget.removeEventListener("click", closeMenu)
    event.currentTarget.addEventListener("click", openMenu)
}

function openMenu(event) {
    settingsMenu.style.transform = "translateY(0)";
    settingsButton.style.color = "white"
    event.currentTarget.removeEventListener("click", openMenu)
    event.currentTarget.addEventListener("click", closeMenu)
}
