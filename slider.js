document.addEventListener('DOMContentLoaded', function() {
            const slides = document.querySelectorAll('.banner-slide');
            let currentSlide = 0;
            const slideInterval = 5000; // 5 секунд
            
            // Функция для показа следующего слайда
            function nextSlide() {
                // Скрываем текущий слайд
                slides[currentSlide].classList.remove('active');
                
                // Переходим к следующему слайду (с зацикливанием)
                currentSlide = (currentSlide + 1) % slides.length;
                
                // Показываем новый слайд
                slides[currentSlide].classList.add('active');
            }
            
            // Запускаем автоматическое переключение
            let slideTimer = setInterval(nextSlide, slideInterval);
            
            // Останавливаем автоматическое переключение при наведении
            const slideshow = document.querySelector('.banner-slideshow');
            slideshow.addEventListener('mouseenter', () => clearInterval(slideTimer));
            
            // Возобновляем автоматическое переключение при уходе курсора
            slideshow.addEventListener('mouseleave', () => {
                slideTimer = setInterval(nextSlide, slideInterval);
            });
        });