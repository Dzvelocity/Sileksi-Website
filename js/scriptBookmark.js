document.addEventListener("DOMContentLoaded", () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    const bookmarkList = document.getElementById("bookmark-list");

    if (bookmarks.length === 0) {
        bookmarkList.innerHTML = "<p>No bookmarks yet.</p>";
    } else {
        bookmarkList.innerHTML = ""; // Clear the list before populating it

        bookmarks.forEach(bookmark => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
            productCard.setAttribute('data-category', bookmark.category); // Set data-category
            productCard.innerHTML = `
                <div class="border-book">
                    <img src="img/bookmark fill2.png" class="book-pic" onclick="removeBookmark('${bookmark.id}')">
                </div>
                <div class="border-pict">
                    <img src="img/${bookmark.image}" alt="${bookmark.name}">
                </div>
                <h3>${bookmark.name}</h3>
                <p>Capacity: ${bookmark.capacity}</p>
                <p>Category: ${bookmark.category}</p> <!-- Display category -->
            `;
            bookmarkList.appendChild(productCard);
        });
    }
});

function removeBookmark(productId) {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    bookmarks = bookmarks.filter(bookmark => bookmark.id !== productId);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    updateBookmarkList();
    // Trigger storage event manually
    window.dispatchEvent(new Event('storage'));
}

function updateBookmarkList() {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    const bookmarkList = document.getElementById("bookmark-list");

    if (bookmarks.length === 0) {
        bookmarkList.innerHTML = "<p>No bookmarks yet.</p>";
    } else {
        bookmarkList.innerHTML = ""; // Clear the list before populating it

        bookmarks.forEach(bookmark => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
            productCard.setAttribute('data-category', bookmark.category); // Set data-category
            productCard.innerHTML = `
                <div class="border-book">
                    <img src="img/bookmark fill2.png" class="book-pic" onclick="removeBookmark('${bookmark.id}')">
                </div>
                <div class="border-pict">
                    <img src="img/${bookmark.image}" alt="${bookmark.name}">
                </div>
                <h3>${bookmark.name}</h3>
                <p>Capacity: ${bookmark.capacity}</p>
                <p>Category: ${bookmark.category}</p> <!-- Display category -->
            `;
            bookmarkList.appendChild(productCard);
        });
    }
}

document.getElementById("hapus-semua-bookmark").addEventListener("click", function() {
    // Menghapus data bookmark dari localStorage
    localStorage.removeItem("bookmarks");
    // Mengupdate tampilan, misalnya dengan menghapus semua produk yang telah ditampilkan
    document.getElementById("bookmark-list").innerHTML = "<p>No bookmarks yet.</p>";
    // Trigger storage event manually
    window.dispatchEvent(new Event('storage'));
});

window.addEventListener('storage', updateBookmarkList);


        function filterProducts(category) {
    var productCards = document.querySelectorAll('.product-card');
    var buttons = document.querySelectorAll('.sidebar button');

    // Tampilkan atau sembunyikan produk berdasarkan kategori
    productCards.forEach(function(card) {
        if (category === 'all') {
            card.style.display = 'block';
        } else if (card.getAttribute('data-category') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    // Tambahkan atau hapus kelas 'active' pada tombol yang diklik
    buttons.forEach(function(button) {
        if (button.getAttribute('data-category') === category) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

function toggleBookmark(imgElement) {
    const filledBookmarkSrc = 'img/bookmark fill2.png';  // Path to the filled bookmark image
    const emptyBookmarkSrc = 'img/bookmark.png';         // Path to the original bookmark image

    if (imgElement.src.includes(emptyBookmarkSrc)) {
        imgElement.src = filledBookmarkSrc;
        imgElement.classList.add('filled');
    } else {
        imgElement.src = emptyBookmarkSrc;
        imgElement.classList.remove('filled');
    }
}