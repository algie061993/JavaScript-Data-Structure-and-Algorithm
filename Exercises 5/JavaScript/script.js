const calorieCounter = document.getElementById("calorie-counter");
const budgetNumberInput = document.getElementById("budget");
const entryDropdown = document.getElementById("entry-dropdown");
const addEntryButton = document.getElementById("add-entry");
const clearButton = document.getElementById("clear");
const output = document.getElementById("output");
let isError = false;
/**
 * Removes plus signs (+), minus signs (-), and all whitespace from an input string.
 * * @param {string} str The string to be cleaned.
 * @returns {string} The cleaned string, containing only non-matched characters.
 */
function cleanInputString(str) {
  console.log(
    `This string "${str}" need to remove the white space and the "+" sign.`
  );
  const regex = /[+-\s]/g;
  console.log(typeof str);
  return str.replace(regex, "");
}

let stringCleanerOutpunt = cleanInputString("hello + s"); // for testing the output of the cleanInputString function
console.log(
  `this is the output of the removed white space "+" sign. output of the cleanInputString function  "${stringCleanerOutpunt}"`
);

function isInvalidInput(str) {
  // const regex = /[0-9]+e+[0-9]/i;
  const regex = /\d+e\d+/i; // shorthand character class to match any digit
  return str.match(regex);
}

/**
 * The match method returns an array with any matches found in the string.

    Here is a complete breakdown of that information:

    * "1e3" is the matched value against the /\d+e\d+/i regex.
    * index: 0 is the index of the matched value in the string.
    * input: '1e3' is the original string that was matched.
    * groups: undefined are the matched groups, which are not used in this case. You will learn more about groups in a later project.
 */
console.log(isInvalidInput("1e3"));

console.log(isInvalidInput("10")); //The match method returns null when no match is found.

/**
 * Adds a new input entry (for name and calories) to the selected meal section.
 * * 1. Identifies the correct parent container based on the current value of
 * 'entryDropdown' (e.g., #breakfast, #lunch, etc.).
 * 2. Calculates the new entry number by counting the existing text inputs
 * in that container and adding 1.
 * 3. Constructs an HTML string for a new pair of labels and text/number inputs,
 * using a template literal to ensure unique IDs and descriptive labels.
 * 4. Inserts the new HTML into the container just before its closing tag.
 *
 * @returns {void}
 */

function addEntry() {
  const targetInputContainer = document.querySelector(
    `#${entryDropdown.value} .input-container`
  );
  const entryNumber =
    targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
  const HTMLString = `
  <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
  <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
  <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
  <input
    type="number"
    min="0"
    id="${entryDropdown.value}-${entryNumber}-calories"
    placeholder="Calories"
  />`;
  targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
}

/**
 * Calculates the user's remaining calories and displays the results.
 * * 1. Prevents the default form submission behavior (e.g., page reload).
 * 2. Collects all calorie input values from different meal and exercise sections.
 * (The getCaloriesFromInputs function cleans and validates each input).
 * 3. Checks the 'isError' flag, which is set by getCaloriesFromInputs if
 * any invalid characters are found. If an error exists, the function stops.
 * 4. Calculates total consumed and remaining calories based on the budget and exercise.
 * 5. Determines if the result is a "Surplus" (over budget) or "Deficit" (under budget)
 * using a ternary operator.
 * 6. Updates the 'output' element's HTML with a formatted summary of the results,
 * including total calories budgeted, consumed, and burned.
 * 7. Removes the "hide" class from the 'output' element to display the results to the user.
 * * @param {Event} e The event object, typically from a form submission.
 * @returns {void}
 */

function calculateCalories(e) {
  e.preventDefault();
  isError = false;

  const breakfastNumberInputs = document.querySelectorAll(
    "#breakfast input[type='number']"
  );
  const lunchNumberInputs = document.querySelectorAll(
    "#lunch input[type='number']"
  );
  const dinnerNumberInputs = document.querySelectorAll(
    "#dinner input[type='number']"
  );
  const snacksNumberInputs = document.querySelectorAll(
    "#snacks input[type='number']"
  );
  const exerciseNumberInputs = document.querySelectorAll(
    "#exercise input[type='number']"
  );

  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

  if (isError) {
    return;
  }

  const consumedCalories =
    breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  const remainingCalories =
    budgetCalories - consumedCalories + exerciseCalories;
  const surplusOrDeficit = remainingCalories < 0 ? "Surplus" : "Deficit";
  output.innerHTML = `
  <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(
    remainingCalories
  )} Calorie ${surplusOrDeficit}</span>
  <hr>
  <p>${budgetCalories} Calories Budgeted</p>
  <p>${consumedCalories} Calories Consumed</p>
  <p>${exerciseCalories} Calories Burned</p>
  `;

  output.classList.remove("hide");
}
/**
 * Processes a list of input elements to calculate a total calorie count.
 * * 1. Initializes a 'calories' accumulator to 0.
 * 2. Iterates over each input element in the provided 'list'.
 * 3. Cleans the input value using 'cleanInputString' (removes +, -, and whitespace).
 * 4. Validates the cleaned value using 'isInvalidInput' (checks for remaining non-digit characters).
 * 5. If invalid input is found, an alert is shown, the global 'isError' flag is set to true,
 * and the function immediately returns null to halt calculation.
 * 6. If the input is valid, the value is converted to a number and added to the 'calories' total.
 * 7. After iterating through all items, the function returns the final total calorie count.
 * * @param {NodeList} list A collection (NodeList) of input elements, typically of type 'number'.
 * @returns {number|null} The total calorie count as a number, or null if an invalid input is encountered.
 */
function getCaloriesFromInputs(list) {
  let calories = 0;

  for (const item of list) {
    const currVal = cleanInputString(item.value);
    const invalidInputMatch = isInvalidInput(currVal);

    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`);
      isError = true;
      return null;
    }
    calories += Number(currVal);
  }
  return calories;
}

/**
 * Clears all user-entered data and resets the calorie calculation display.
 * * 1. Collects all elements with the class 'input-container' into an array
 * using Array.from(document.querySelectorAll).
 * 2. Iterates over the collected containers and clears all dynamically added
 * HTML (the entry name and calorie inputs) by setting innerHTML to an empty string.
 * 3. Resets the value of the main 'budgetNumberInput' to an empty string.
 * 4. Clears the text content of the 'output' element (where calculation results are shown).
 * 5. Hides the 'output' element by adding the "hide" class back to its class list.
 *
 * @returns {void}
 */
function clearForm() {
  const inputContainers = Array.from(
    document.querySelectorAll(".input-container")
  );

  for (const container of inputContainers) {
    container.innerHTML = "";
  }

  budgetNumberInput.value = "";
  output.innerText = "";
  output.classList.add("hide");
}

addEntryButton.addEventListener("click", addEntry);
calorieCounter.addEventListener("submit", calculateCalories);
clearButton.addEventListener("click", clearForm);
