// admin-script.js

// 🔗 АДРЕСА ТВОГО СЕРВЕРА
const API_URL = "http://localhost:5297/api/lessons";

// Функція оновлення відображення шляху (залишається такою ж)
function updatePathDisplay() {
  const subject = document.getElementById("lessonSubject").value;
  const grade = document.getElementById("lessonGrade").value;
  const filename = document.getElementById("lessonFilename").value.trim();

  if (subject && grade) {
    const baseFilename = filename || "filename.html";
    const fullPath = `${subject}/${grade}/${baseFilename}`;
    document.getElementById("generatedPath").textContent = fullPath;
  } else {
    document.getElementById("generatedPath").textContent =
      "[Оберіть предмет та клас]";
  }
}

// Головна функція відправки
async function generateLessonJSON(event) {
  event.preventDefault();
  const form = event.target;

  // 1. Збираємо дані з полів
  const lessonData = {
    title: form.lessonTitle.value.trim(),
    grade: parseInt(form.lessonGrade.value),
    subjectCode: form.lessonSubject.value,
    difficulty: form.difficulty.value,
    // Формуємо шлях
    link: `${form.lessonSubject.value}/${
      form.lessonGrade.value
    }/${form.lessonFilename.value.trim()}`,
  };

  // Валідація
  if (!lessonData.title || !form.lessonFilename.value) {
    alert("Заповніть назву та ім'я файлу!");
    return;
  }

  // 2. ВІДПРАВЛЯЄМО НА СЕРВЕР (POST запит)
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lessonData),
    });

    if (response.ok) {
      alert("✅ Успіх! Урок збережено в базу даних.");
      form.reset(); // Очистити форму
      updatePathDisplay();
      // Очистити старі поля виводу, вони більше не треба
      document.getElementById("jsonOutput").textContent =
        "Дані відправлено на сервер!";
      document.getElementById("copyInstruction").style.display = "none";
    } else {
      alert("❌ Помилка сервера.");
      console.log(await response.text());
    }
  } catch (error) {
    alert("❌ Сервер не відповідає. Перевірте термінал VS Code.");
    console.error(error);
  }
}

// Прив'язка подій
document
  .getElementById("lessonForm")
  .addEventListener("submit", generateLessonJSON);
document
  .getElementById("lessonSubject")
  .addEventListener("change", updatePathDisplay);
document
  .getElementById("lessonGrade")
  .addEventListener("change", updatePathDisplay);
document
  .getElementById("lessonFilename")
  .addEventListener("input", updatePathDisplay);
