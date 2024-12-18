document.addEventListener('DOMContentLoaded', () => {
    // Логика для окна регистрации
    const modal = document.querySelector('.registration-modal');
    const openButtons = document.querySelectorAll('.button-contact');
    const closeButton = document.querySelector('.registration-modal__close');
    const form = document.getElementById('registrationForm');
    const phoneField = document.getElementById('phone');
    const warningMessage = document.querySelector('.warning'); // Сообщение warning

    if (modal) {
        // Открыть окно регистрации
        openButtons.forEach(button => {
            button.addEventListener('click', () => {
                modal.classList.add('active');
            });
        });

        // Закрыть окно регистрации
        closeButton.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // Закрыть окно регистрации при клике вне контента
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Функция для проверки всех обязательных полей
    function checkRequiredFields() {
        const requiredFields = form.querySelectorAll('input[required]');
        let allFieldsFilled = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                allFieldsFilled = false;
            }
        });

        // Показываем или скрываем сообщение .warning в зависимости от заполненности всех обязательных полей
        if (allFieldsFilled) {
            warningMessage.style.display = 'none';
        } else {
            warningMessage.style.display = 'block';
        }
    }

    // Обработчик события для каждого поля ввода
    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            const errorMessage = input.nextElementSibling;
            if (input.hasAttribute('required') && input.value.trim()) {
                // Если поле заполнено, скрыть сообщение об ошибке
                errorMessage.style.display = 'none';
                input.classList.remove('error');
            }

            // Проверяем, должны ли исчезать предупреждения
            checkRequiredFields();
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Отключаем стандартную отправку формы
        const fields = form.querySelectorAll('input');
        let isValid = true;
        let allRequiredFieldsFilled = true; // Переменная для проверки обязательных полей

        fields.forEach(field => {
            const errorMessage = field.nextElementSibling;

            if (field.hasAttribute('required')) {
                if (!field.value.trim()) {
                    errorMessage.style.display = 'block'; // Показываем ошибку
                    field.classList.add('error');
                    isValid = false;
                    allRequiredFieldsFilled = false; // Если хоть одно обязательное поле пустое
                } else {
                    errorMessage.style.display = 'none';
                    field.classList.remove('error');
                }
            }
        });

        // Дополнительная проверка телефона
        const phoneValue = phoneField.value.trim();
        const phoneRegex = /^(\+?\d{1,3})?(\d{3})(\d{7})$/; // Пример: +1234567890
        const phoneError = phoneField.nextElementSibling;

        if (phoneField.value && !phoneRegex.test(phoneValue)) {
            phoneError.textContent = 'Enter a valid phone number (e.g., +1234567890)';
            phoneError.style.display = 'block'; // Показываем ошибку
            phoneField.classList.add('error');
            isValid = false;
        } else if (phoneRegex.test(phoneValue)) {
            phoneError.style.display = 'none';
            phoneField.classList.remove('error');
        }

        // Показываем или скрываем warning в зависимости от заполненности обязательных полей
        if (allRequiredFieldsFilled) {
            warningMessage.style.display = 'none'; // Скрываем warning, если все поля заполнены
        } else {
            warningMessage.style.display = 'block'; // Показываем warning, если обязательные поля пустые
        }

        if (isValid) {
            alert('Form submitted successfully!');
            form.reset();
            warningMessage.style.display = 'none'; // Скрыть warning после отправки формы
        }
    });


    // Логика для cookie-banner
    const cookieBanner = document.querySelector('.cookie');

    if (cookieBanner) {
        // Находим все кнопки внутри cookie-banner
        const buttons = cookieBanner.querySelectorAll('button');

        // Добавляем обработчик события для каждой кнопки
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                // Скрываем cookie-banner
                cookieBanner.style.display = 'none';
            });
        });
    }
});