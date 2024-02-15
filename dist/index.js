import { intervalToDuration } from "../node_modules/date-fns/intervalToDuration.mjs";
import { getDaysInMonth } from "../node_modules/date-fns/getDaysInMonth.mjs";

function isValidInput() {
  const day = document.getElementById("day").value;
  const month = document.getElementById("month").value;
  const year = document.getElementById("year").value;

  const dayError = document.createElement("p");
  dayError.classList.add("error-msg");
  const monthError = document.createElement("p");
  monthError.classList.add("error-msg");
  const yearError = document.createElement("p");
  yearError.classList.add("error-msg");

  let errorDayEmpty = false;
  let errorMonthEmpty = false;
  let errorYearEmpty = false;
  let errorEmpty = false;
  let errorInvalid = false;
  let errorInvalidWhole = false;

  // Delete previous error messages
  document.querySelectorAll(".error-msg").forEach((error) => {
    error.parentElement.classList.remove("error");
    error.remove();
  });

  // Verify if is empty
  if (day === "") {
    errorEmpty = true;
    errorDayEmpty = true;
    dayError.innerHTML = "This field is required";
    document.getElementById("day").parentElement.appendChild(dayError);
    document.getElementById("day").parentElement.classList.add("error");
  }

  if (month === "") {
    errorEmpty = true;
    errorMonthEmpty = true;
    monthError.innerHTML = "This field is required";
    document.getElementById("month").parentElement.appendChild(monthError);
    document.getElementById("month").parentElement.classList.add("error");
  }

  if (year === "") {
    errorEmpty = true;
    errorYearEmpty = true;
    yearError.innerHTML = "This field is required";
    document.getElementById("year").parentElement.appendChild(yearError);
    document.getElementById("year").parentElement.classList.add("error");
  }

  // Validation of day, month and year
  if (!(day >= 1 && day <= 31) && !errorDayEmpty) {
    dayError.innerHTML = "Must be a valid day";
    errorInvalid = true;
    document.getElementById("day").parentElement.appendChild(dayError);
    document.getElementById("day").parentElement.classList.add("error");
  }

  if (!(month >= 1 && month <= 12) && !errorMonthEmpty) {
    monthError.innerHTML = "Must be a valid month";
    errorInvalid = true;
    document.getElementById("month").parentElement.appendChild(monthError);
    document.getElementById("month").parentElement.classList.add("error");
  }

  if (!(year <= new Date().getFullYear()) && !errorYearEmpty) {
    yearError.innerHTML = "Must be a valid year";
    errorInvalid = true;
    document.getElementById("year").parentElement.appendChild(yearError);
    document.getElementById("year").parentElement.classList.add("error");
  }

  if (errorEmpty || errorInvalid) return false;

  // Validate whole date
  if (day > getDaysInMonth(new Date(year, month - 1))) {
    errorInvalidWhole = true;
    dayError.innerHTML = "Must be a valid date";
    document.getElementById("day").parentElement.appendChild(dayError);
    document.getElementById("day").parentElement.classList.add("error");

    return false;
  }

  return true;
}

function calculateDuration() {
  // const { days, month, year } = validateInputs();
  if (!isValidInput()) {
    document.getElementById("years").innerHTML = "--"
    document.getElementById("months").innerHTML = "-"
    document.getElementById("days").innerHTML = "--"
    return false;
  }

  const day = document.getElementById("day").value;
  const month = document.getElementById("month").value;
  const year = document.getElementById("year").value;

  const interval = intervalToDuration({
    start: new Date(year, month - 1, day),
    end: Date(),
  });

  document.getElementById("years").innerHTML = interval.years;
  document.getElementById("months").innerHTML = interval.months;
  document.getElementById("days").innerHTML = interval.days;
}

const button = document.getElementById("calculate-button");

button.addEventListener("click", calculateDuration);
