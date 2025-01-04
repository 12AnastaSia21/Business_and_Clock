document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.registration-modal');
    const applicationModal = document.querySelector('.application'); // Новое окно подтверждения
    const buttonContactRegistration = document.querySelector('.button-contact_registration'); // Кнопка регистрации
    const closeApplicationButton = document.querySelector('.button__close-application'); // Кнопка закрытия нового окна
    const form = document.getElementById('registrationForm');
    const phoneField = document.getElementById('phone');
    const warningMessage = document.querySelector('.warning'); // Сообщение warning
    const superButton = document.querySelector('.button-super'); // Кнопка "Super"
    
    if (modal) {
        // Открыть окно регистрации
        const openButtons = document.querySelectorAll('.button-contact');
        const closeButton = document.querySelector('.registration-modal__close');
        
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
            buttonContactRegistration.classList.add('active');
        } else {
            warningMessage.style.display = 'block';
            buttonContactRegistration.classList.remove('active');
        }
    }
    
    // Обработчик события для каждого поля ввода
    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            const errorMessage = input.nextElementSibling;
            if (input.hasAttribute('required') && input.value.trim()) {
                errorMessage.style.display = 'none';
                input.classList.remove('error');
            }
            checkRequiredFields();
        });
    });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const fields = form.querySelectorAll('input');
        let isValid = true;
        let allRequiredFieldsFilled = true;
    
        fields.forEach(field => {
            const errorMessage = field.nextElementSibling;
    
            if (field.hasAttribute('required')) {
                if (!field.value.trim()) {
                    errorMessage.style.display = 'block';
                    field.classList.add('error');
                    isValid = false;
                    allRequiredFieldsFilled = false;
                } else {
                    errorMessage.style.display = 'none';
                    field.classList.remove('error');
                }
            }
        });
    
        const phoneValue = phoneField.value.trim();
        const phoneRegex = /^(\+?\d{1,3})?(\d{3})(\d{7})$/; // Пример: +1234567890
        const phoneError = phoneField.nextElementSibling;
    
        // Проверка телефона
        if (phoneField.value && !phoneRegex.test(phoneValue)) {
            phoneError.textContent = 'Enter a valid phone number (e.g., +1234567890)';
            phoneError.style.display = 'block';
            phoneField.classList.add('error');
            isValid = false;
        } else if (phoneRegex.test(phoneValue)) {
            phoneError.style.display = 'none';
            phoneField.classList.remove('error');
        }
    
        // Показываем или скрываем warning в зависимости от заполненности обязательных полей
        if (allRequiredFieldsFilled) {
            warningMessage.style.display = 'none';
            buttonContactRegistration.classList.add('active');
        } else {
            warningMessage.style.display = 'block';
            buttonContactRegistration.classList.remove('active');
        }
    
        if (isValid) {
            // Скрываем окно регистрации и показываем окно подтверждения
            modal.classList.remove('active');
            applicationModal.classList.add('active');
        }
    });
    
    // Закрытие окна с благодарностью
    closeApplicationButton.addEventListener('click', () => {
        applicationModal.classList.remove('active');
    });

     superButton.addEventListener('click', () => {
        applicationModal.classList.remove('active');
    });

    applicationModal.addEventListener('click', (e) => {
        if (e.target === applicationModal) {
            applicationModal.classList.remove('active');
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