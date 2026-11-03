// DOM Elements for Responsive Navigation
const navButton = document.querySelector('#menu');
const navigation = document.querySelector('.nav');

// Event listener to toggle the hamburger menu on small screens
navButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    navButton.classList.toggle('open');
});