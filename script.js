// script.js (ОНОВЛЕНА ВЕРСІЯ)

// Функція для визначення CSS класу бордера картки на основі класу та типу
function getBorderClass(lesson) {
  // 1. Колір для Тестів та Домашніх Завдань (мають пріоритет)
  if (lesson.category === "test") {
    return "type-test"; // Циан, як ми визначили для всіх тестів
  }
  if (lesson.category === "homework") {
    return "type-homework"; // Зелений/Морський, як ми визначили для всіх ДЗ
  }

  // 2. Колір для Уроків (залежить від Класу)
  if (lesson.category === "lesson") {
    switch (lesson.grade) {
      case 2:
        return "lesson-g2"; // Рожевий
      case 8:
        return "lesson-g8"; // Фіолетовий
      case 9:
        return "lesson-g9"; // Помаранчевий
      // Для інших класів використовується базовий колір із CSS (.card)
      default:
        return "";
    }
  }
  return "";
}

function renderLessons() {
  const gradeSelect = document.getElementById("grade-filter");
  const categorySelect = document.getElementById("category-filter");
  const authorSelect = document.getElementById("author-filter");

  const gradeFilter = gradeSelect ? gradeSelect.value : "all";
  const categoryFilter = categorySelect ? categorySelect.value : "all";
  const authorFilter = authorSelect ? authorSelect.value : "all";

  // Використовуємо глобальну змінну, як у вашому data.js
  const lessons = window.lessonsData || [];
  const container = document.getElementById("container");
  container.innerHTML = "";

  const filteredData = lessons.filter((lesson) => {
    // Умова gradeFilter === "all" || lesson.grade == gradeFilter дозволяє порівнювати number та string
    const isGradeMatch = gradeFilter === "all" || lesson.grade == gradeFilter;
    const isCategoryMatch =
      categoryFilter === "all" || lesson.category === categoryFilter;
    const isAuthorMatch =
      authorFilter === "all" || lesson.author === authorFilter;

    return isGradeMatch && isCategoryMatch && isAuthorMatch;
  });

  if (filteredData.length === 0) {
    container.innerHTML =
      "<p style='grid-column: 1/-1; text-align: center; color: #555;'>Матеріалів за вибраними критеріями не знайдено.</p>";
    return;
  }

  filteredData.forEach((lesson) => {
    const card = document.createElement("div");
    card.className = "card";

    // *** ЗМІНИЛИ ЦЕЙ РОЗДІЛ ***
    const borderClass = getBorderClass(lesson);
    if (borderClass) {
      card.classList.add(borderClass);
    } else {
      // Якщо немає спеціального класу (якщо це урок не 2, 8, 9 класу), додаємо нейтральний бордер,
      // хоча базовий клас 'card' його вже має.
      card.classList.add("border-default");
    }
    // ************************

    const targetAttr = lesson.link.startsWith("http") ? "_blank" : "_self";

    let subjectLabel = lesson.topic;
    if (lesson.subject_code === "math_general") subjectLabel = "Математика";

    let typeLabel = "📖 Урок";
    let typeClass = "tag-lesson";

    if (lesson.category === "test") {
      typeLabel = "📝 Тест";
      typeClass = "tag-test";
    } else if (lesson.category === "homework") {
      typeLabel = "🏠 Д/З";
      typeClass = "tag-homework";
    }

    const authorName = lesson.author ? `👤 ${lesson.author}` : "";

    card.innerHTML = `
            <div class="card-header">
                <span class="tag grade-tag">${lesson.grade} клас</span>
                <span class="tag ${typeClass}">${typeLabel}</span>
            </div>
            
            <h3>${lesson.title}</h3>
            
            <div class="card-footer">
                <div style="display: flex; flex-direction: column; gap: 5px;">
                    <span class="topic-text">${subjectLabel}</span>
                    <span class="topic-text" style="font-size: 0.9em; color: #666;">${authorName}</span>
                </div>
                <a href="${lesson.link}" class="open-btn" target="${targetAttr}">Перейти →</a>
            </div>
        `;
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderLessons();
});
