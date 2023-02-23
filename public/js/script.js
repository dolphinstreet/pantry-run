axios.defaults.withCredentials = true;
const listOfList = document.querySelector(".list-of-lists .list-wrapper");

function favoriteOnTop() {
    if (listOfList) {
        const favoriteList = document
            .querySelector(".fa-solid")
            .closest(".list-element");
        if (favoriteList) {
            listOfList.prepend(favoriteList);
        }
    }
}

function switchFavorite(event) {
    event.stopPropagation();
    const star = event.currentTarget;
    axios
        .patch(`/api/lists/favorite/${star.dataset.id}`)
        .then((res) => {
            star.classList.remove("fa-regular");
            star.classList.add("fa-solid");
            if (res.status === 200) {
                const previousFavorite = document.querySelector(
                    `.fa-star[data-id="${res.data["_id"]}"]`
                );

                previousFavorite.classList.remove("fa-solid");
                previousFavorite.classList.add("fa-regular");
            }
            favoriteOnTop();
        })
        .catch((error) => console.error(error.message));
}

favoriteOnTop();

document.querySelectorAll(".fa-star.fa-regular").forEach((element) => {
    element.addEventListener("click", switchFavorite);
});
