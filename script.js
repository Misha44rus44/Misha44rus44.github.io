document.addEventListener('DOMContentLoaded', function() {

    // --- Инициализация всех компонентов ---
    initThreeJS();
    initTypewriter();
    initFadeInOnScroll();
    smoothScroll();

    /**
     * Инициализация 3D-графики (Three.js)
     */
    function initThreeJS() {
        const container = document.getElementById('three-js-container');
        // Проверяем, существует ли контейнер и библиотека Three.js
        if (!container || typeof THREE === 'undefined') {
            console.error("Контейнер для 3D или библиотека Three.js не найдены.");
            return;
        }

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true }); // alpha: true для прозрачного фона

        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        // Создаем более сложную и интересную фигуру - Icosahedron (икосаэдр)
        const geometry = new THREE.IcosahedronGeometry(2, 0); 
        const material = new THREE.MeshStandardMaterial({
            color: 0x00a8e8,      // Основной цвет (синий)
            metalness: 0.5,       // Насколько материал "металлический"
            roughness: 0.5,       // Насколько он "шершавый"
            wireframe: true       // Отображаем только каркас, это выглядит стильно
        });
        const shape = new THREE.Mesh(geometry, material);
        scene.add(shape);
        
        // Добавляем свет, чтобы материал был виден
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5); // Позиция света
        scene.add(light);

        // Отодвигаем камеру, чтобы видеть объект
        camera.position.z = 5;

        // Функция анимации
        function animate() {
            requestAnimationFrame(animate); // Зацикливаем анимацию
            
            // Медленно вращаем фигуру
            shape.rotation.x += 0.001;
            shape.rotation.y += 0.001;
            
            renderer.render(scene, camera);
        }
        animate(); // Запускаем анимацию

        // Адаптация под размер окна
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    /**
     * Эффект "пишущей машинки"
     */
    function initTypewriter() {
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
    
    /**
     * Анимация появления секций при прокрутке
     */
    function initFadeInOnScroll() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        const elements = document.querySelectorAll('.fade-in');
        elements.forEach(el => observer.observe(el));
    }
    
    /**
     * Плавный скролл для якорных ссылок
     */
    function smoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetElement = document.querySelector(this.getAttribute('href'));
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
});