document.addEventListener("DOMContentLoaded", () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    window.toggleBookmark = (productId, productName, productImage, productCapacity, productCategory) => {
        const bookmarkIndex = bookmarks.findIndex(bookmark => bookmark.id === productId);
        const iconElement = document.querySelector(`.book-pic[data-product-id="${productId}"]`);
        
        if (bookmarkIndex === -1) {
            bookmarks.push({ 
                id: productId, 
                name: productName, 
                image: productImage, 
                capacity: productCapacity, 
                category: productCategory 
            });
            iconElement.classList.add('bookmarked');
        } else {
            bookmarks.splice(bookmarkIndex, 1);
            iconElement.classList.remove('bookmarked');
        }
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        updateBookmarkIcons(); // Update bookmark icons
    };

    function updateBookmarkIcons() {
        const bookmarkIcons = document.querySelectorAll('.book-pic');
        bookmarkIcons.forEach(icon => {
            const productId = icon.getAttribute('data-product-id');
            const isBookmarked = bookmarks.some(bookmark => bookmark.id === productId);
            if (isBookmarked) {
                icon.src = 'img/bookmark fill2.png';
            } else {
                icon.src = 'img/bookmark.png'; 
            }
        });
    }

    updateBookmarkIcons();

    window.addEventListener('storage', () => {
        const updatedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
        bookmarks.length = 0; // Clear the current array
        bookmarks.push(...updatedBookmarks); // Update with new bookmarks
        updateBookmarkIcons(); // Update bookmark icons on storage change
    });
});


let currentCategory = 'all';
let currentBrand = 'all';

function filterProducts(category) {
    currentCategory = category;
    applyFilters();
}

function filterBrands(brand) {
    currentBrand = brand;
    applyFilters();
}

function applyFilters() {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(function(card) {
        const matchesCategory = (currentCategory === 'all') || (card.getAttribute('data-category') === currentCategory);
        const matchesBrand = (currentBrand === 'all') || (card.getAttribute('data-brand') === currentBrand);

        if (matchesCategory && matchesBrand) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function togglePanel(panelId, buttonClass) {
    const panel = document.getElementById(panelId);
    panel.style.display = panel.style.display === 'none' ? 'none' : 'block';
}

function sortProducts(order) {
    var cardsContainer = document.querySelector('.product-grid');
    var cards = cardsContainer.querySelectorAll('.product-card');

    // Convert NodeList to Array for sorting
    var cardsArray = Array.prototype.slice.call(cards);

    cardsArray.sort(function(a, b) {
        var wattA = parseInt(a.querySelector('p').textContent.split(' ')[1]);
        var wattB = parseInt(b.querySelector('p').textContent.split(' ')[1]);
        if (order === 'asc') {
            return wattA - wattB;
        } else if (order === 'dsc') {
            return wattB - wattA;
        }
    });

    // Clear existing products
    cardsContainer.innerHTML = '';

    // Re-append sorted products
    cardsArray.forEach(function(card) {
        cardsContainer.appendChild(card);
    });
}

function resetFilters() {
    currentCategory = 'all';
    currentBrand = 'all';
    applyFilters();
    // Reset sort by to default (ascending)
    sortProducts('asc');
}

document.addEventListener("DOMContentLoaded", function () {
    const categoryButton = document.querySelector('.sidebar button:nth-child(1)');
    const brandButton = document.querySelector('.sidebar button:nth-child(2)');
    const sortbyButton = document.querySelector('.sidebar button:nth-child(3)');
    const categoryPanel = document.getElementById('categoryPanel');
    const brandPanel = document.getElementById('brandPanel');
    const sortbyPanel = document.getElementById('sortbyPanel');

    categoryButton.addEventListener('click', function () {
        togglePanel(categoryPanel, categoryButton);
        hideOtherPanels(brandPanel, sortbyPanel);
    });

    brandButton.addEventListener('click', function () {
        togglePanel(brandPanel, brandButton);
        hideOtherPanels(categoryPanel, sortbyPanel);
    });

    sortbyButton.addEventListener('click', function () {
        togglePanel(sortbyPanel, sortbyButton);
        hideOtherPanels(categoryPanel, brandPanel);
    });

    function togglePanel(panel, button) {
        if (panel.classList.contains('show')) {
            panel.classList.remove('show');
            button.classList.remove('active');
        } else {
            panel.classList.add('show');
            button.classList.add('active');
        }
    }

    function hideOtherPanels(...panels) {
        panels.forEach(panel => {
            panel.classList.remove('show');
        });
        document.querySelectorAll('.sidebar button').forEach(button => {
            button.classList.remove('active');
        });
    }

    // Close the panel if clicked outside
    window.addEventListener('click', function(event) {
        if (!categoryPanel.contains(event.target) && !categoryButton.contains(event.target) &&
            !brandPanel.contains(event.target) && !brandButton.contains(event.target) &&
            !sortbyPanel.contains(event.target) && !sortbyButton.contains(event.target)) {
            categoryPanel.classList.remove('show');
            brandPanel.classList.remove('show');
            sortbyPanel.classList.remove('show');
            document.querySelectorAll('.sidebar button').forEach(button => {
                button.classList.remove('active');
            });
        }
    });

    // Adding close icon functionality
    const closeIcons = document.querySelectorAll('.close-icon');
    closeIcons.forEach(icon => {
        icon.addEventListener('click', function(event) {
            const panel = event.target.closest('.panel');
            const button = document.querySelector(`.sidebar button[data-panel="${panel.id}"]`);
            togglePanel(panel, button);
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.getElementById('checkbox');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const overlay = document.querySelector('.overlay');

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            dropdownMenu.classList.add('show');
            overlay.style.display = 'block';
        } else {
            dropdownMenu.classList.remove('show');
            overlay.style.display = 'none';
        }
    });

    overlay.addEventListener('click', () => {
        checkbox.checked = false;
        dropdownMenu.classList.remove('show');
        overlay.style.display = 'none';
    });

    let startX;
    dropdownMenu.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    dropdownMenu.addEventListener('touchmove', (e) => {
        let touch = e.touches[0];
        let change = startX - touch.clientX;
        if (change > 50) { // swipe left threshold
            checkbox.checked = false;
            dropdownMenu.classList.remove('show');
            overlay.style.display = 'none';
        }
    });
});