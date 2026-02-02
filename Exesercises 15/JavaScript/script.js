/**
 * Functional Programming is a popular approach to software development. In Functional Programming,
 * developers organize code into smaller functions, then combine those functions to build complex programs.
 * In this spreadsheet application project,
 * you'll learn about parsing and evaluating mathematical expressions,
 * implementing spreadsheet functions, handling cell references,
 * and creating interactive web interfaces. You'll learn how to dynamically update the page based on user input.
 * This project will cover concepts like the map(), find(), and includes() methods and the parseInt() function.
 */

const range = (start, end) =>
  Array(end - start + 1)
    .fill(start)
    .map((element, index) => element + index);
const charRange = (start, end) =>
  range(start.charCodeAt(0), end.charCodeAt(0)).map((code) =>
    String.fromCharCode(code),
  );

window.onload = () => {
  const container = document.getElementById("container");
  const createLabel = (name) => {
    const label = document.createElement("div");
    label.className = "label";
    label.textContent = name;
    container.appendChild(label);
  };
  const letters = charRange("A", "J");
  letters.forEach(createLabel);
  range(1, 99).forEach((number) => {
    createLabel(number);
    letters.forEach((letter) => {
      const input = document.createElement("input");
      input.type = "text";
      input.id = letter + number;
      input.ariaLabel = letter + number;
      container.appendChild(input);
    });
  });
};
