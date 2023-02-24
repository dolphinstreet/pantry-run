axios.defaults.withCredentials = true;

/////////////////////////////////////////////////////////

const settingsButton = document.querySelector(".details .fa-ellipsis-vertical");
const settingsMenu = document.querySelector(".details .settings");

settingsButton.addEventListener("click", openMenu);

// settingsButton.addEventListener("click", openMenu);

//settingsButton.addEventListener("click", closeMenu)

function closeMenu(event) {
    settingsMenu.style.transform = "translateY(-100%)";
    settingsButton.style.color = "#75a0ff";
    event.currentTarget.removeEventListener("click", closeMenu);
    event.currentTarget.addEventListener("click", openMenu);
}

function openMenu(event) {
    settingsMenu.style.transform = "translateY(0)";
    settingsButton.style.color = "white";
    event.currentTarget.removeEventListener("click", openMenu);
    event.currentTarget.addEventListener("click", closeMenu);
}

document.querySelector(".save-list-btn").addEventListener("click", (event) => {
    event.preventDefault();
    const id = document.querySelector(".list-details.details").dataset.id;
    axios
        .post("/api/lists/save/" + id)
        .then((res) => {
            settingsButton.click();
            console.log(res);
        })
        .catch((e) => console.error(e));
});
