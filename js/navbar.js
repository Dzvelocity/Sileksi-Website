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
