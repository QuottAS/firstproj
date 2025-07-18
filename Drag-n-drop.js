  document.addEventListener('DOMContentLoaded', initFileDrop);

        function initFileDrop() {
            try {
                const dropContainer = document.getElementById('dropContainer');
                const fileInput = document.getElementById('fileInput');
                
                // Проверяем существование элементов
                if (!dropContainer || !fileInput) {
                    throw new Error('Не удалось найти необходимые элементы DOM');
                }

                // Обработчики событий для drag and drop
                setupDragAndDrop(dropContainer, fileInput);
                
                // Обработчик клика по контейнеру
                dropContainer.addEventListener('click', () => {
                    fileInput.click();
                });

                // Обработчик выбора файла
                fileInput.addEventListener('change', handleFileSelect);

            } catch (error) {
                console.error('Ошибка инициализации drag-and-drop:', error);
            }
        }

        function setupDragAndDrop(container, input) {
            // Предотвращаем стандартное поведение браузера
            const preventDefaults = (e) => {
                e.preventDefault();
                e.stopPropagation();
            };

            // Обработчики для drag events
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                container.addEventListener(eventName, preventDefaults);
            });

            // Обработка события drop
            container.addEventListener('drop', (e) => {
                const files = e.dataTransfer.files;
                if (files.length) {
                    input.files = files;
                    handleFileSelect();
                }
            });
        }

        function handleFileSelect() {
            const fileInput = document.getElementById('fileInput');
            const dropTitle = document.querySelector('.drop-title');
            const dropFormat = document.querySelector('.drop-format');
            
            if (!fileInput.files.length) return;

            const file = fileInput.files[0];
            const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];

            if (!validTypes.includes(file.type)) {
                alert('Пожалуйста, загрузите файл в формате .png, .jpg или .pdf');
                return;
            }

            // Обновляем информацию о файле
            if (dropTitle) dropTitle.textContent = file.name;
            if (dropFormat) dropFormat.textContent = `${(file.size / 1024).toFixed(2)} KB`;
        }