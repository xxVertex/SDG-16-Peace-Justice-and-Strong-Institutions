// Add scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.dynamic-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const menuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
});