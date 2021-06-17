const popUpContainer = document.querySelector(".pop-up-container");
const closePopUpButton = document.querySelector(".exit");
closePopUpButton.addEventListener("click", closePopUp);

function closePopUp() {
    popUpContainer.classList.add("hide");
}