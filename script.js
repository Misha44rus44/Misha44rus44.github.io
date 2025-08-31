document.addEventListener('DOMContentLoaded', function() {

    // --- Эффект "пишущей машинки" ---
    const typewriterElement = document.getElementById('typewriter');
    // Новый, более подходящий текст
    const text = "Студент, увлеченный Python и веб-разработкой.";
    let index = 0;

    function type() {
        if (index < text.length) {
            typewriterElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, 60); // Скорость печати
        }
    }
    // Запускаем эффект после небольшой задержки
    setTimeout(type, 500);

    // --- Анимация появления секций при прокрутке ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 
    });

    const sections = document.querySelectorAll('.fade-in');
    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Плавный скролл для кнопки CTA ---
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

});