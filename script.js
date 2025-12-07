// script.js

function renderLessons(filterValue) {
    const lessons = window.lessonsData || [];
    const container = document.getElementById("container");
    container.innerHTML = "";

    // === ЛОГІКА ФІЛЬТРАЦІЇ ===
    const filteredData = lessons.filter(lesson => {
        // 1. Якщо натиснули "Всі" -> показуємо все
        if (filterValue === 'all') return true;

        // 2. Якщо натиснули "lesson" або "test" -> перевіряємо категорію
        if (filterValue === 'lesson' || filterValue === 'test') {
            return lesson.category === filterValue;
        }

        // 3. Інакше -> вважаємо, що це номер класу (grade)
        return lesson.grade == filterValue;
    });
    // ===========================

    if (filteredData.length === 0) {
        container.innerHTML = "<p>Матеріалів за цим запитом не знайдено.</p>";
        return;
    }

    // Малювання карток (без змін)
    filteredData.forEach(lesson => {
        const card = document.createElement("div");
        card.className = "card";
        const targetAttr = lesson.link.startsWith("http") ? "_blank" : "_self";

        let subjectLabel = lesson.topic;
        if (lesson.subject_code === "algebra") subjectLabel = "📐 Алгебра";
        if (lesson.subject_code === "geometry") subjectLabel = "🔺 Геометрія";

        // Додаємо мітку типу (Тест чи Урок) на картку
        const typeLabel = lesson.category === 'test' ? '📝 Тест' : '📖 Урок';

        card.innerHTML = `
            <img src="${lesson.image || 'images/default.jpg'}" class="card-image">
            <div class="card-content">
                <h3>${lesson.title}</h3>
                <div class="card-meta">
                    <span class="tag grade-tag">${lesson.grade} клас</span>
                    <span class="tag" style="background:#fff3cd; color:#856404">${typeLabel}</span>
                </div>
                <a href="${lesson.link}" class="link-btn" target="${targetAttr}">Відкрити</a>
            </div>
        `;
        container.appendChild(card);
    });
}

  // 3. Малюємо
  filteredData.forEach((lesson) => {
    const card = document.createElement("div");
    card.className = "card";

    // Якщо посилання починається на http - відкривати в новій вкладці (_blank)
    // Якщо це твій файл - відкривати в цьому ж вікні (_self)
    const targetAttr = lesson.link.startsWith("http") ? "_blank" : "_self";

    // Визначаємо іконку або підпис предмета
    let subjectLabel = lesson.topic;
    if (lesson.subject_code === "algebra") subjectLabel = "📐 Алгебра";
    if (lesson.subject_code === "geometry") subjectLabel = "🔺 Геометрія";
    if (lesson.subject_code === "math_general") subjectLabel = "Математика";

    card.innerHTML = `
            <h3>${lesson.title}</h3>
            <div class="card-meta">
                <span class="tag grade-tag">${lesson.grade} клас</span>
                <span class="tag subject-tag">${subjectLabel}</span>
            </div>
            <a href="${lesson.link}" class="link-btn" target="${targetAttr}">Відкрити урок</a>
        `;

    container.appendChild(card);
  });
}

// Запуск при старті сторінки
document.addEventListener("DOMContentLoaded", () => {
  renderLessons("all");
});
