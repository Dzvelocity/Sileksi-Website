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
                icon.classList.add('bookmarked');
            } else {
                icon.classList.remove('bookmarked');
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
