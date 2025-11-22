// Select elements
const menu = document.querySelector('#menu-btn');
const navbar = document.querySelector('.navbar');

// Toggle menu and navbar on click
menu.addEventListener('click', () => {
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
});

// Reset menu and navbar on scroll
window.addEventListener('scroll', () => {
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');
});