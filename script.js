const monthYear = document.getElementById("monthYear");
const calendarDays = document.getElementById("calendarDays");

const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");

/* ================================= */
/* FECHA ACTUAL */
/* ================================= */

let currentDate = new Date();

/* ================================= */
/* NOMBRES DE LOS MESES */
/* ================================= */

const monthNames = [
  "ENERO",
  "FEBRERO",
  "MARZO",
  "ABRIL",
  "MAYO",
  "JUNIO",
  "JULIO",
  "AGOSTO",
  "SEPTIEMBRE",
  "OCTUBRE",
  "NOVIEMBRE",
  "DICIEMBRE",
];

/* ================================= */
/* CREAR CALENDARIO */
/* ================================= */

function createCalendar() {
  // Limpiar calendario
  calendarDays.innerHTML = "";

  const year = currentDate.getFullYear();

  const month = currentDate.getMonth();

  // Mostrar mes y año
  monthYear.textContent = `${monthNames[month]} ${year}`;

  /* ================================= */
  /* PRIMER DÍA DEL MES */
  /* ================================= */

  const firstDay = new Date(year, month, 1).getDay();

  /* ================================= */
  /* CANTIDAD DE DÍAS */
  /* ================================= */

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  /* ================================= */
  /* ESPACIOS ANTES DEL DÍA 1 */
  /* ================================= */

  for (let i = 0; i < firstDay; i++) {
    const emptyDay = document.createElement("div");

    emptyDay.classList.add("day", "empty");

    calendarDays.appendChild(emptyDay);
  }

  /* ================================= */
  /* CREAR CADA DÍA */
  /* ================================= */

  for (let day = 1; day <= daysInMonth; day++) {
    createDay(year, month, day);
  }
}

/* ================================= */
/* CREAR UN DÍA */
/* ================================= */

function createDay(year, month, day) {
  const dayElement = document.createElement("div");

  dayElement.classList.add("day");

  /* ================================= */
  /* NÚMERO DEL DÍA */
  /* ================================= */

  const number = document.createElement("div");

  number.classList.add("day-number");

  number.textContent = day;

  dayElement.appendChild(number);

  /* ================================= */
  /* CONTENEDOR DE TAREA */
  /* ================================= */

  const taskArea = document.createElement("div");

  taskArea.classList.add("task-area");

  /* ================================= */
  /* INPUT */
  /* ================================= */

  const textarea = document.createElement("textarea");

  textarea.classList.add("task-input");

  textarea.placeholder = "Escribe tu tarea...";

  /* ================================= */
  /* CHECKBOX */
  /* ================================= */

  const taskRow = document.createElement("div");

  taskRow.classList.add("task-row");

  const checkbox = document.createElement("input");

  checkbox.type = "checkbox";

  checkbox.classList.add("task-checkbox");

  /* ================================= */
  /* CLAVE PARA LOCALSTORAGE */
  /* ================================= */

  const storageKey = `calendar-${year}-${month + 1}-${day}`;

  const completedKey = `${storageKey}-completed`;

  /* ================================= */
  /* RECUPERAR TAREA */
  /* ================================= */

  const savedTask = localStorage.getItem(storageKey);

  if (savedTask !== null) {
    textarea.value = savedTask;
  }

  /* ================================= */
  /* RECUPERAR ESTADO DEL CHULO */
  /* ================================= */

  const savedCompleted = localStorage.getItem(completedKey);

  if (savedCompleted === "true") {
    checkbox.checked = true;

    textarea.classList.add("completed");
  }

  /* ================================= */
  /* GUARDAR TEXTO */
  /* ================================= */

  textarea.addEventListener("input", function () {
    localStorage.setItem(storageKey, textarea.value);
  });

  /* ================================= */
  /* MARCAR COMO COMPLETADA */
  /* ================================= */

  checkbox.addEventListener("change", function () {
    localStorage.setItem(completedKey, checkbox.checked);

    if (checkbox.checked) {
      textarea.classList.add("completed");
    } else {
      textarea.classList.remove("completed");
    }
  });

  /* ================================= */
  /* AÑADIR ELEMENTOS */
  /* ================================= */

  taskRow.appendChild(checkbox);

  taskRow.appendChild(document.createTextNode(" Tarea completada"));

  taskArea.appendChild(textarea);

  taskArea.appendChild(taskRow);

  dayElement.appendChild(taskArea);

  /* ================================= */
  /* DETECTAR HOY */
  /* ================================= */

  const today = new Date();

  if (
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear()
  ) {
    dayElement.classList.add("today");
  }

  /* ================================= */
  /* AÑADIR AL CALENDARIO */
  /* ================================= */

  calendarDays.appendChild(dayElement);
}

/* ================================= */
/* MES ANTERIOR */
/* ================================= */

prevMonth.addEventListener("click", function () {
  currentDate.setMonth(currentDate.getMonth() - 1);

  createCalendar();
});

/* ================================= */
/* MES SIGUIENTE */
/* ================================= */

nextMonth.addEventListener("click", function () {
  currentDate.setMonth(currentDate.getMonth() + 1);

  createCalendar();
});

/* ================================= */
/* INICIAR */
/* ================================= */

createCalendar();
