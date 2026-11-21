// Scroll fade-up animation
(function () {
    const items = document.querySelectorAll('[data-animate]');
    if (!items.length) return;

    // no animation if the browser can't observe, or the user prefers less motion
    if (!('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.documentElement.classList.add('js-motion');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // animate once only
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    items.forEach((el) => observer.observe(el));
})();