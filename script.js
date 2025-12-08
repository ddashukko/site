// script.js

function renderLessons() {
  // 1. Отримуємо значення з випадаючих списків (HTML select)
  // Переконайся, що в HTML у селектів є id="grade-filter" та id="category-filter"
  const gradeSelect = document.getElementById("grade-filter");
  const categorySelect = document.getElementById("category-filter");

  // Захист: якщо елементів немає в HTML, ставимо 'all' за замовчуванням
  const gradeFilter = gradeSelect ? gradeSelect.value : "all";
  const categoryFilter = categorySelect ? categorySelect.value : "all";

  // Захист: якщо data.js поламаний або не завантажився
  const lessons = window.lessonsData || [];

  const container = document.getElementById("container");
  container.innerHTML = "";

  // === ФІЛЬТРАЦІЯ (ЛОГІКА "І") ===
  const filteredData = lessons.filter((lesson) => {
    // Перевірка класу:
    // Якщо вибрано 'all', то true. Інакше перевіряємо, чи співпадає клас.
    // Використовуємо нестроге порівняння (==), щоб "5" (рядок) дорівнювало 5 (числу)
    const isGradeMatch = gradeFilter === "all" || lesson.grade == gradeFilter;

    // Перевірка категорії (lesson або test):
    const isCategoryMatch =
      categoryFilter === "all" || lesson.category === categoryFilter;

    // Повертаємо картку тільки якщо ОБИДВІ умови виконуються
    return isGradeMatch && isCategoryMatch;
  });

  // Якщо нічого не знайдено
  if (filteredData.length === 0) {
    container.innerHTML =
      "<p style='grid-column: 1/-1; text-align: center; color: #555;'>Матеріалів за вибраними критеріями не знайдено.</p>";
    return;
  }

  // === МАЛЮВАННЯ КАРТОК ===
  filteredData.forEach((lesson) => {
    const card = document.createElement("div");
    card.className = "card"; // Основний клас картки

    // Кольорова смужка збоку
    if (lesson.subject_code === "algebra") card.classList.add("border-blue");
    else if (lesson.subject_code === "geometry")
      card.classList.add("border-green");
    else if (lesson.subject_code === "english")
      card.classList.add("border-red");
    else card.classList.add("border-gray");

    // Відкриття посилання (зовнішнє чи внутрішнє)
    const targetAttr = lesson.link.startsWith("http") ? "_blank" : "_self";

    // Назва предмету
    let subjectLabel = lesson.topic;
    if (lesson.subject_code === "math_general") subjectLabel = "Математика";

    // Мітки типу (Урок чи Тест)
    const typeLabel = lesson.category === "test" ? "📝 Тест" : "📖 Урок";
    const typeClass = lesson.category === "test" ? "tag-test" : "tag-lesson";

    // Вставка HTML всередину картки
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

// Запуск функції одразу після завантаження сторінки, щоб показати всі уроки
document.addEventListener("DOMContentLoaded", () => {
  renderLessons();
});
