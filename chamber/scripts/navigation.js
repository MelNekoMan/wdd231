const mainNav = document.querySelector("nav");
const hamburgerButton = document.querySelector("#hamburger-menu");

hamburgerButton.addEventListener("click", () => {
    mainNav.classList.toggle("open");
    hamburgerButton.classList.toggle("open");
});