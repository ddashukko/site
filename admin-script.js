// admin-script.js

// Функція для генерації унікального ID на основі часу
function generateUniqueId() {
  return Date.now();
}

// Функція, що динамічно оновлює відображення шляху у формі
function updatePathDisplay() {
  const subject = document.getElementById("lessonSubject").value;
  const grade = document.getElementById("lessonGrade").value;
  const filename = document.getElementById("lessonFilename").value.trim();

  // Конструюємо шлях у форматі 'subject/grade/filename'
  if (subject && grade && grade >= 1 && grade <= 9) {
    const baseFilename = filename || "your-filename-here.html";
    const fullPath = `${subject}/${grade}/${baseFilename}`;
    document.getElementById("generatedPath").textContent = fullPath;
  } else {
    document.getElementById("generatedPath").textContent =
      "[Оберіть предмет та клас]";
  }
}

// Основна функція, що збирає дані, валідує і генерує JSON
function generateLessonJSON(event) {
  event.preventDefault();

  // 1. Збір даних
  const form = event.target;
  const title = form.lessonTitle.value.trim();
  const grade = parseInt(form.lessonGrade.value);
  const subject = form.lessonSubject.value;
  const filename = form.lessonFilename.value.trim();
  const difficulty = form.difficulty.value;

  const fullLinkPath = `${subject}/${grade}/${filename}`;

  // 2. Валідація
  if (
    title === "" ||
    filename === "" ||
    isNaN(grade) ||
    grade < 1 ||
    grade > 9
  ) {
    alert("Будь ласка, заповніть Назву, Клас (число 1-9) та Ім'я файлу!");
    return;
  }

  if (!filename.toLowerCase().endsWith(".html")) {
    alert("Помилка! Ім'я файлу має закінчуватися на .html.");
    return;
  }

  if (filename.includes("/") || filename.includes("\\")) {
    alert(
      "Помилка! Ім'я файлу не повинно містити символів '/'. Шлях формується автоматично."
    );
    return;
  }

  // 3. Створення нового об'єкта
  const newLesson = {
    id: generateUniqueId(),
    title: title,
    grade: grade,
    subject_code: subject,
    category: "lesson",
    description: `Матеріали для ${subject} ${grade} класу.`, // Можна додати в форму
    difficulty: difficulty,
    link: fullLinkPath,
    date_added: new Date().toISOString().slice(0, 10),
  };

  // 4. Перетворення на читабельний JSON-рядок
  const jsonOutputText = JSON.stringify(newLesson, null, 4);

  // 5. Виведення результату на екран
  document.getElementById("jsonOutput").textContent = jsonOutputText;
  document.getElementById("copyInstruction").style.display = "block";

  // Очищення полів, крім демонстрації шляху
  form.reset();
}

// 6. Прив'язка функцій до елементів
document
  .getElementById("lessonForm")
  .addEventListener("submit", generateLessonJSON);

// Прив'язка для динамічного оновлення шляху
document
  .getElementById("lessonSubject")
  .addEventListener("change", updatePathDisplay);
document
  .getElementById("lessonGrade")
  .addEventListener("change", updatePathDisplay);
document
  .getElementById("lessonFilename")
  .addEventListener("input", updatePathDisplay);

// Викликаємо функцію один раз при завантаженні для початкового відображення
updatePathDisplay();
