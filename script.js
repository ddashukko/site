// script.js

// Функція, яка малює картки на екрані
function renderLessons(selectedGrade) {
  // Змінна lessonsData доступна, тому що ми підключили data.js раніше
  const database = window.lessonsData || [];

  const container = document.getElementById("container");
  container.innerHTML = ""; // Очищаємо екран перед малюванням

  // Фільтрація
  const filteredData =
    selectedGrade === "all"
      ? database
      : database.filter((item) => item.grade === selectedGrade);

  // Цикл: для кожного уроку створюємо HTML
  filteredData.forEach((lesson) => {
    const card = document.createElement("div");
    card.className = "card";

    // Визначаємо, чи відкривати посилання в новій вкладці (якщо це зовнішнє посилання)
    const targetAttr = lesson.link.startsWith("http") ? "_blank" : "_self";

    card.innerHTML = `
            <h3>${lesson.title}</h3>
            <span class="tag">${lesson.grade} клас</span>
            <span class="tag">${lesson.topic || lesson.subject_code}</span>
            <a href="${
              lesson.link
            }" class="link" target="${targetAttr}">Відкрити →</a>
        `;

    container.appendChild(card);
  });
}

// Запускаємо один раз при старті, щоб показати всі уроки
window.onload = () => {
  renderLessons("all");
};
