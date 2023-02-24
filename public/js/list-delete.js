const trashCans = document.querySelectorAll(".list-element .fa-trash-can");

function deleteList(event) {
    const list = event.currentTarget.closest(".list-element");
    const listId = list.dataset.id;

    axios
        .delete(`/api/lists/${listId}`)
        .then((res) => {
            list.remove();

            if (res.status === 200 && res.data.favorite) {
                const favoriteStar = document.querySelector(
                    `.list-element[data-id="${res.data.favorite}"] .fa-star`
                );
                if (favoriteStar) {
                    favoriteStar.classList.remove("fa-regular");
                    favoriteStar.classList.add("fa-solid");
                }
            }
        })
        .catch((error) => console.error(error.message));
}

trashCans.forEach((bin) => bin.addEventListener("click", deleteList));
