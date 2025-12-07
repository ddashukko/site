// script.js

function renderLessons(filterValue) {
    const lessons = window.lessonsData || [];
    const container = document.getElementById("container");
    container.innerHTML = "";

    // === ЛОГІКА ФІЛЬТРАЦІЇ ===
    const filteredData = lessons.filter(lesson => {
        // 1. "Всі класи"
        if (filterValue === 'all') return true;

        // 2. Фільтр за типом (Урок / Тест)
        if (filterValue === 'lesson' || filterValue === 'test') {
            return lesson.category === filterValue;
        }

        // 3. Фільтр за класом (число)
        return lesson.grade == filterValue;
    });

    // Якщо нічого не знайдено
    if (filteredData.length === 0) {
        container.innerHTML = "<p>Матеріалів за цим запитом не знайдено.</p>";
        return;
    }

    // === МАЛЮВАННЯ КАРТОК ===
    filteredData.forEach(lesson => {
        const card = document.createElement("div");
        card.className = "card";
        
        // Відкривати в новій вкладці, якщо це зовнішнє посилання
        const targetAttr = lesson.link.startsWith("http") ? "_blank" : "_self";

        // Визначаємо підпис предмета
        let subjectLabel = lesson.topic;
        if (lesson.subject_code === "algebra") subjectLabel = "📐 Алгебра";
        if (lesson.subject_code === "geometry") subjectLabel = "🔺 Геометрія";
        if (lesson.subject_code === "math_general") subjectLabel = "🔢 Математика";

        // Визначаємо тип (Урок чи Тест)
        const typeLabel = lesson.category === 'test' ? '📝 Тест' : '📖 Урок';

        // Картинка-заглушка, якщо ти забула додати image в data.js
        const imageSrc = lesson.image ? lesson.image : 'images/default.png'; 

        // HTML картки
        card.innerHTML = `
            <img src="${imageSrc}" class="card-image" alt="${lesson.title}">
            <div class="card-content">
                <h3>${lesson.title}</h3>
                <div class="card-meta">
                    <span class="tag grade-tag">${lesson.grade} клас</span>
                    <span class="tag subject-tag">${subjectLabel}</span>
                    <span class="tag" style="background:#fff3cd; color:#856404">${typeLabel}</span>
                </div>
                <a href="${lesson.link}" class="link-btn" target="${targetAttr}">Відкрити</a>
            </div>
        `;
        container.appendChild(card);
    });
}

// Запуск при старті
document.addEventListener("DOMContentLoaded", () => {
    renderLessons("all");
});
