// 1. SELECT DOM ELEMENTS
// We select the necessary HTML elements from the page so we can interact with them.
const convertBtn = document.getElementById("convert-btn"); // The button the user clicks
const inputNumber = document.getElementById("number"); // The input field where the user types a number
const output = document.getElementById("output"); // The element where we display the result or error

// 2. INPUT VALIDATION FUNCTION
// This function checks if the user's input is valid before we try to convert it.
const checkInput = (num) => {
  // Check A: Is the input empty, Not-a-Number (NaN), or a decimal?
  // We use parseFloat(num) to handle the string input, and Number.isInteger ensures no decimals allowed.
  if (num === "" || isNaN(num) || !Number.isInteger(parseFloat(num))) {
    output.innerText = "Please enter a valid number.";
    return false; // Return false to stop the process
  }

  // Check B: Is the number less than 1? (Roman numerals don't represent 0 or negatives)
  // *NOTE: I fixed this from your original code (was <= 10) so numbers like 9 work correctly.*
  if (num < 1) {
    output.innerText = "Please enter a number greater than or equal to 1";
    return false;
  }

  // Check C: Is the number too large?
  // Standard Roman numeral logic usually stops at 3999 because 4000 requires special syntax.
  if (num >= 4000) {
    output.innerText = "Please enter a number less than or equal to 3999";
    return false;
  }

  // If we pass all checks, the input is valid!
  return true;
};

// 3. CONVERSION FUNCTION
// This function contains the core logic to turn a standard number into a Roman Numeral string.
const convertToRoman = (num) => {
  // A mapping of Roman numerals to their decimal values.
  // Order matters here! We must list them from largest to smallest for the greedy algorithm to work.
  const romanNumerals = [
    { value: 1000, symbol: "M" },
    { value: 900, symbol: "CM" },
    { value: 500, symbol: "D" },
    { value: 400, symbol: "CD" },
    { value: 100, symbol: "C" },
    { value: 90, symbol: "XC" },
    { value: 50, symbol: "L" },
    { value: 40, symbol: "XL" },
    { value: 10, symbol: "X" },
    { value: 9, symbol: "IX" },
    { value: 5, symbol: "V" },
    { value: 4, symbol: "IV" },
    { value: 1, symbol: "I" },
  ];

  let roman = ""; // This string will hold our final result

  // We loop through the 'romanNumerals' array one by one.
  for (let i = 0; i < romanNumerals.length; i++) {
    // WHILE the current input number is greater than or equal to the Roman numeral value...
    // Example: If num is 2500, and we are looking at 'M' (1000).
    while (num >= romanNumerals[i].value) {
      roman += romanNumerals[i].symbol; // Append the symbol (e.g., add "M" to result)
      num -= romanNumerals[i].value; // Subtract the value (e.g., 2500 - 1000 = 1500)
    }
    // The loop continues until 'num' is reduced to 0.
  }

  return roman; // Return the constructed string (e.g., "MMD")
};

// 4. CLICK EVENT LISTENER
// This listens for when the user clicks the "Convert" button.
convertBtn.addEventListener("click", () => {
  const num = inputNumber.value; // Get the raw value from the input field

  // First, we run the validation function.
  if (checkInput(num)) {
    // If validation returns true, we convert the number and update the text on the screen.
    output.innerText = convertToRoman(num);
  }
  // If validation returns false, checkInput() has already updated the output text with an error message.
});

// 5. KEYDOWN EVENT LISTENER
// This adds a "quality of life" feature: pressing the "Enter" key inside the input box acts like clicking the button.
inputNumber.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    convertBtn.click(); // Programmatically clicks the button defined above
  }
});
