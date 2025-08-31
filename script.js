document.addEventListener('DOMContentLoaded', function() {

    // --- Инициализация всех компонентов ---
    initThreeJS();
    initTypewriter();
    initFadeInOnScroll();
    smoothScroll();

    /**
     * ИНИЦИАЛИЗАЦИЯ 3D-ГРАФИКИ (Three.js) - ОБНОВЛЕННАЯ ВЕРСИЯ
     */
    function initThreeJS() {
        const container = document.getElementById('three-js-container');
        if (!container || typeof THREE === 'undefined') {
            console.error("Контейнер для 3D или библиотека Three.js не найдены.");
            return;
        }

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        // --- НОВОЕ: Массив с разными геометриями ---
        const geometries = [
            new THREE.IcosahedronGeometry(2, 0),    // Икосаэдр (20 граней)
            new THREE.TorusKnotGeometry(1.5, 0.3, 100, 16), // Тороидальный узел
            new THREE.DodecahedronGeometry(2, 0), // Додекаэдр (12 граней)
            new THREE.OctahedronGeometry(2, 0)      // Октаэдр (8 граней)
        ];
        let currentGeometryIndex = 0;

        // Создаем материал, который будет использоваться для всех фигур
        const material = new THREE.MeshStandardMaterial({
            color: 0x00a8e8,
            metalness: 0.5,
            roughness: 0.5,
            wireframe: true,
            transparent: true, // Включаем прозрачность для эффекта затухания
            opacity: 1
        });
        
        // Создаем первую фигуру
        let shape = new THREE.Mesh(geometries[currentGeometryIndex], material);
        scene.add(shape);
        
        // Добавляем свет
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5);
        scene.add(light);

        camera.position.z = 5;
        
        // --- НОВОЕ: Логика смены фигур ---
        let lastSwitchTime = 0;
        const switchInterval = 5000; // Меняем фигуру каждые 5 секунд (5000 миллисекунд)
        let isSwitching = false;

        function switchShape(time) {
            isSwitching = true;
            
            // Плавно уменьшаем прозрачность (фигура исчезает)
            gsap.to(shape.material, {
                opacity: 0,
                duration: 0.5, // Длительность затухания
                onComplete: () => {
                    // Когда фигура стала невидимой, меняем ее геометрию
                    currentGeometryIndex = (currentGeometryIndex + 1) % geometries.length;
                    shape.geometry.dispose(); // Освобождаем память от старой геометрии
                    shape.geometry = geometries[currentGeometryIndex];

                    // Плавно возвращаем прозрачность (новая фигура появляется)
                    gsap.to(shape.material, {
                        opacity: 1,
                        duration: 0.5, // Длительность появления
                        onComplete: () => {
                            isSwitching = false;
                            lastSwitchTime = time;
                        }
                    });
                }
            });
        }

        // Подключаем библиотеку GSAP для плавных анимаций (можно и без нее, но так красивее)
        // Если не хотите подключать еще одну библиотеку, можно сделать анимацию прозрачности вручную в цикле animate()
        const gsapScript = document.createElement('script');
        gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js';
        document.head.appendChild(gsapScript);


        // Функция анимации
        const clock = new THREE.Clock();
        function animate() {
            requestAnimationFrame(animate);
            
            const elapsedTime = clock.getElapsedTime() * 1000; // Время в миллисекундах

            // Вращаем фигуру
            shape.rotation.x += 0.001;
            shape.rotation.y += 0.001;

            // Проверяем, пора ли менять фигуру
            if (!isSwitching && (elapsedTime - lastSwitchTime > switchInterval)) {
                // Вместо ручной анимации, можно использовать GSAP
                 if (typeof gsap !== 'undefined') {
                    switchShape(elapsedTime);
                 } else {
                    // Простой вариант без GSAP (фигура будет меняться резко)
                    currentGeometryIndex = (currentGeometryIndex + 1) % geometries.length;
                    shape.geometry.dispose();
                    shape.geometry = geometries[currentGeometryIndex];
                    lastSwitchTime = elapsedTime;
                 }
            }
            
            renderer.render(scene, camera);
        }
        animate();

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