// script.js

// 🔗 АДРЕСА ТВОГО СЕРВЕРА
const API_URL = "http://localhost:5297/api/lessons";

// Функція для отримання даних із сервера
async function fetchAndRenderLessons(gradeFilter = "all") {
  const container = document.getElementById("container");

  try {
    // 1. Робимо запит на сервер
    const response = await fetch(API_URL);

    // 2. Перевіряємо, чи сервер відповів "ОК"
    if (!response.ok) {
      throw new Error(`Помилка сервера: ${response.status}`);
    }

    // 3. Отримуємо "живі" дані
    const lessons = await response.json();

    // 4. Фільтруємо
    container.innerHTML = ""; // Очищаємо екран

    // Оскільки grade приходить як число, а фільтр може бути рядком, приводимо до спільного типу
    const filteredData =
      gradeFilter === "all"
        ? lessons
        : lessons.filter((item) => item.grade == gradeFilter);

    if (filteredData.length === 0) {
      container.innerHTML = "<p>Уроків поки немає.</p>";
      return;
    }

    // 5. Малюємо картки
    filteredData.forEach((lesson) => {
      const card = document.createElement("div");
      card.className = "card";

      // Якщо це зовнішнє посилання (http), відкриваємо в новій вкладці
      const targetAttr = lesson.link.startsWith("http") ? "_blank" : "_self";

      // Використовуємо дані з C# моделі (зверни увагу: поля приходять з маленької букви: title, grade...)
      card.innerHTML = `
                <h3>${lesson.title}</h3>
                <span class="tag">${lesson.grade} клас</span>
                <span class="tag">${lesson.subjectCode || "Загальне"}</span>
                <a href="${
                  lesson.link
                }" class="link" target="${targetAttr}">Відкрити →</a>
            `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Помилка:", error);
    container.innerHTML = `<p style='color: red;'>Не вдалося з'єднатися з сервером. Перевірте, чи запущено dotnet run.</p>`;
  }
}

// Функція-обгортка для кнопок в HTML (щоб старий onclick працював)
function renderLessons(grade) {
  fetchAndRenderLessons(grade);
}

// Запускаємо при старті
document.addEventListener("DOMContentLoaded", () => {
  fetchAndRenderLessons("all");
});
