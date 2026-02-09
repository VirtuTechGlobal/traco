// Select the elements
const burgerMenu = document.querySelector('.fa-bars');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const closeBtn = document.getElementById('closeBtn');

// Function to open the sidebar
burgerMenu.addEventListener('click', () => {
    sidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
});

// Function to close the sidebar using the arrow button
closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
});

// Function to close the sidebar by clicking on the dark overlay
sidebarOverlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
});