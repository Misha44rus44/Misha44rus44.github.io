document.addEventListener('DOMContentLoaded', function() {

    function typewriterEffect() {
        const typewriterElement = document.getElementById('typewriter');
        if (!typewriterElement) return;

        const text = "Студент, увлеченный Python и веб-разработкой.";
        let index = 0;

        function type() {
            if (index < text.length) {
                typewriterElement.textContent += text.charAt(index);
                index++;
                setTimeout(type, 60);
            }
        }
        setTimeout(type, 500);
    }

    function fadeInOnScroll() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1 
        });

        const elements = document.querySelectorAll('.fade-in');
        elements.forEach(el => observer.observe(el));
    }

    function smoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }

    typewriterEffect();
    fadeInOnScroll();
    smoothScroll();
});