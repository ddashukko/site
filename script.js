// script.js

function renderLessons(filterValue) {
    // Захист: якщо data.js поламаний, беремо пустий масив
    const lessons = window.lessonsData || [];
    const container = document.getElementById("container");
    container.innerHTML = "";

    // === ФІЛЬТРАЦІЯ ===
    const filteredData = lessons.filter(lesson => {
        if (filterValue === 'all') return true;
        if (filterValue === 'lesson' || filterValue === 'test') {
            return lesson.category === filterValue;
        }
        return lesson.grade == filterValue;
    });

    // Якщо пусто
    if (filteredData.length === 0) {
        container.innerHTML = "<p style='grid-column: 1/-1; text-align: center;'>Матеріалів не знайдено.</p>";
        return;
    }

    // === МАЛЮВАННЯ (ТІЛЬКИ ТЕКСТ) ===
    filteredData.forEach(lesson => {
        const card = document.createElement("div");
        card.className = "card"; // Основний клас
        
        // Додаємо клас для кольорової смужки збоку в залежності від предмета
        if (lesson.subject_code === 'algebra') card.classList.add('border-blue');
        else if (lesson.subject_code === 'geometry') card.classList.add('border-green');
        else if (lesson.subject_code === 'english') card.classList.add('border-red');
        else card.classList.add('border-gray');

        const targetAttr = lesson.link.startsWith("http") ? "_blank" : "_self";

        // Красиві назви
        let subjectLabel = lesson.topic; // За замовчуванням - тема
        if (lesson.subject_code === "math_general") subjectLabel = "Математика";

        const typeLabel = lesson.category === 'test' ? '📝 Тест' : '📖 Урок';
        const typeClass = lesson.category === 'test' ? 'tag-test' : 'tag-lesson';

        card.innerHTML = `
            <div class="card-header">
                <span class="tag grade-tag">${lesson.grade} клас</span>
                <span class="tag ${typeClass}">${typeLabel}</span>
            </div>
            
            <h3>${lesson.title}</h3>
            
            <div class="card-footer">
                <span class="topic-text">${subjectLabel}</span>
                <a href="${lesson.link}" class="open-btn" target="${targetAttr}">Перейти →</a>
            </div>
        `;
        container.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderLessons("all");
});
