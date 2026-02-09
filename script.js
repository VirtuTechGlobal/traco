/* =========================================
   1. SIDEBAR NAVIGATION LOGIC
   ========================================= */
const burgerIcon = document.getElementById('burgerIcon');
const closeBtn = document.getElementById('closeBtn');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

// Open Sidebar
burgerIcon.addEventListener('click', () => {
    sidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
});

// Close Sidebar
closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
});

// Close Sidebar when clicking the overlay
sidebarOverlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
});

/* =========================================
   2. CATEGORY MODAL CONTROLS
   ========================================= */
const openModalBtn = document.getElementById('openModalBtn');
const taskModal = document.getElementById('taskModal');
const closeModal = document.getElementById('closeModal');
const saveCategory = document.getElementById('saveCategory');

// Open Modal
openModalBtn.addEventListener('click', () => {
    taskModal.classList.add('active');
});

// Close Modal
closeModal.addEventListener('click', () => {
    taskModal.classList.remove('active');
    resetModal();
});

/* =========================================
   3. ICON & COLOR PICKER SELECTION
   ========================================= */
let selectedIcon = 'fa-list-ul';
let selectedColor = '#318693';

// Icon Selection Logic
const iconOpts = document.querySelectorAll('.icon-picker i');
iconOpts.forEach(icon => {
    icon.addEventListener('click', () => {
        iconOpts.forEach(i => i.classList.remove('active'));
        icon.classList.add('active');
        selectedIcon = icon.getAttribute('data-icon');
    });
});

// Color Selection Logic
const colorOpts = document.querySelectorAll('.color-opt');
colorOpts.forEach(opt => {
    opt.addEventListener('click', () => {
        colorOpts.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        selectedColor = opt.getAttribute('data-color');
    });
});

/* =========================================
   4. SAVE NEW CATEGORY LOGIC (WITH DELETE)
   ========================================= */
saveCategory.addEventListener('click', () => {
    const categoryName = document.getElementById('categoryName').value;
    const taskGrid = document.getElementById('taskGrid');

    if (categoryName.trim() === "") {
        alert("Please enter a category name!");
        return;
    }

    // 1. Create the new task card element
    const newCard = document.createElement('div');
    newCard.className = 'task-card';
    newCard.style.backgroundColor = selectedColor;

   // 2. Add the Trash Icon and the Category Info (Safe Version)
    newCard.innerHTML = `
        <div class="delete-icon">
            <i class="fas fa-trash"></i>
        </div>
        <span class="task-count">0</span>
        <i class="fas ${selectedIcon}"></i>
        <p>${categoryName}</p>
    `;

    // 3. Setup Delete Logic (Both Trash and Long Press)
    const trashBtn = newCard.querySelector('.delete-icon');
    let pressTimer;

    // The shared function to delete safely
    const confirmDelete = () => {
        if(confirm("Do you want to delete this category?")) {
            newCard.remove();
        }
    };

    // Trash Button click
    trashBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevents clicking the card background
        confirmDelete();
    });

    // Long Press Logic
    newCard.addEventListener('mousedown', () => {
        pressTimer = window.setTimeout(() => {
            confirmDelete();
        }, 1000); // 1 second as requested
    });

    newCard.addEventListener('mouseup', () => clearTimeout(pressTimer));
    newCard.addEventListener('mouseleave', () => clearTimeout(pressTimer));

    // 4. Insert new card before the "Add" button
    taskGrid.insertBefore(newCard, openModalBtn);

    // Close and reset
    taskModal.classList.remove('active');
    resetModal();
});

/* =========================================
   5. RESET MODAL FUNCTION
   ========================================= */
function resetModal() {
    document.getElementById('categoryName').value = "";
    
    // Default values
    selectedIcon = 'fa-list-ul';
    selectedColor = '#318693';
    
    // Reset visual active states to default
    const iconOpts = document.querySelectorAll('.icon-picker i');
    const colorOpts = document.querySelectorAll('.color-opt');
    
    iconOpts.forEach(i => i.classList.remove('active'));
    if(iconOpts[0]) iconOpts[0].classList.add('active');
    
    colorOpts.forEach(o => o.classList.remove('active'));
    if(colorOpts[0]) colorOpts[0].classList.add('active');
}