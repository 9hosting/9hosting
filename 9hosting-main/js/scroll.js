// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));

            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
