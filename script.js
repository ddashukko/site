// script.js

function renderLessons(gradeFilter) {
  // 1. Беремо дані з data.js
  // (Якщо раптом файл не підключився, беремо порожній масив, щоб не було помилок)
  const lessons = window.lessonsData || [];

  const container = document.getElementById("container");
  container.innerHTML = ""; // Очистити екран

  // 2. Фільтруємо
  // Якщо gradeFilter це "all" - показуємо все. Інакше - порівнюємо цифри.
  const filteredData =
    gradeFilter === "all"
      ? lessons
      : lessons.filter((lesson) => lesson.grade == gradeFilter);

  if (filteredData.length === 0) {
    container.innerHTML = "<p>Уроків для цього класу поки немає.</p>";
    return;
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
