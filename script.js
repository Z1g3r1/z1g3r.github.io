// Анимация появления элементов при скролле
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.fade-in, .slide-in').forEach((el) => {
    observer.observe(el);
});

// Мобильное меню
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

if (burger) {
    burger.addEventListener('click', () => {
        // Переключение навигации
        nav.classList.toggle('nav-active');
        
        // Анимация ссылок
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Анимация бургера
        burger.classList.toggle('toggle');
    });
}

// Подсветка активной страницы в навигации
function highlightActivePage() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Вызов при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    highlightActivePage();
});
// Управление навигационной панелью
let lastScrollY = window.scrollY;
const header = document.querySelector('header');
const navHeight = header.offsetHeight;

// Функция для управления видимостью навигационной панели
function manageHeaderVisibility() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY < 50) {
        // Вверху страницы - всегда показываем навигацию
        header.classList.remove('header-hidden');
        header.classList.add('header-visible');
    } else if (currentScrollY > lastScrollY) {
        // Прокрутка вниз - скрываем навигацию
        header.classList.remove('header-visible');
        header.classList.add('header-hidden');
    } else {
        // Прокрутка вверх - показываем навигацию
        header.classList.remove('header-hidden');
        header.classList.add('header-visible');
    }
    
    lastScrollY = currentScrollY;
}

// Обработчик события прокрутки
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            manageHeaderVisibility();
            ticking = false;
        });
        ticking = true;
    }
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Убедимся, что заголовок видим в начале
    header.classList.add('header-visible');
    
    // Добавим отступ для основного контента, равный высоте навигации
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.style.paddingTop = navHeight + 'px';
    }
});