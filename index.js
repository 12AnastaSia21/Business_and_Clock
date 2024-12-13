document.addEventListener('DOMContentLoaded', () => {

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